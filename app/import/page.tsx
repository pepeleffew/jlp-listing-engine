'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Upload, FileSpreadsheet, ArrowRight, ArrowLeft, CheckCircle,
  AlertCircle, RefreshCw, Download, Eye, ChevronLeft, Zap,
  Table, Settings, Check, X
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import {
  StepIndicator, Alert, SectionCard, EmptyState,
  Spinner, Select, PageHeader, StatCard, Modal, Divider
} from '@/components/ui'
import { parseCSVFile, detectMappings, convertAllRows, mappingScore } from '@/lib/utils/csv'
import { useListingStore } from '@/lib/store/listingStore'
import { LISTING_FIELD_LABELS, MAPPABLE_FIELDS, cn } from '@/lib/utils/helpers'
import { ColumnMapping, CSVRow, Listing } from '@/types'

const STEPS = ['Upload', 'Map Columns', 'Preview & Confirm', 'Import']

// ── Field options for the mapping dropdowns ─────────────────────────────
const FIELD_OPTIONS = [
  { value: '', label: '— Skip this column —' },
  ...MAPPABLE_FIELDS.map((f) => ({ value: f, label: LISTING_FIELD_LABELS[f] || f })),
]

export default function ImportPage() {
  const router = useRouter()
  const { importListings } = useListingStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Wizard state
  const [step, setStep] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // CSV data
  const [fileName, setFileName] = useState('')
  const [csvRows, setCsvRows] = useState<CSVRow[]>([])
  const [csvColumns, setCsvColumns] = useState<string[]>([])
  const [mappings, setMappings] = useState<ColumnMapping[]>([])

  // Import results
  const [importedIds, setImportedIds] = useState<string[]>([])
  const [previewRowIdx, setPreviewRowIdx] = useState(0)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [modalRowIdx, setModalRowIdx] = useState(0)

  // ── File handling ──────────────────────────────────────────────────
  const processFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv' && !file.type.includes('spreadsheet')) {
      setError('Please upload a CSV file. Export your MLS data or spreadsheet as CSV first.')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const { rows, columns } = await parseCSVFile(file)
      if (rows.length === 0) { setError('CSV file appears to be empty.'); setIsLoading(false); return }
      setCsvRows(rows)
      setCsvColumns(columns)
      setFileName(file.name)
      const detected = detectMappings(columns)
      setMappings(detected)
      setSelectedRows(new Set(rows.map((_, i) => i)))
      setStep(1)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to parse CSV')
    }
    setIsLoading(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [processFile])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const loadSample = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/sample-listings.csv')
      const text = await res.text()
      const blob = new Blob([text], { type: 'text/csv' })
      const file = new File([blob], 'sample-listings.csv', { type: 'text/csv' })
      await processFile(file)
    } catch {
      setError('Could not load sample file.')
    }
    setIsLoading(false)
  }

  // ── Mapping controls ────────────────────────────────────────────────
  const updateMapping = (csvColumn: string, listingField: string) => {
    setMappings((prev) =>
      prev.map((m) =>
        m.csvColumn === csvColumn ? { ...m, listingField: listingField as keyof Listing | '' } : m
      )
    )
  }

  const score = mappingScore(mappings)

  // ── Row selection ───────────────────────────────────────────────────
  const toggleRow = (i: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }
  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.size === csvRows.length ? new Set() : new Set(csvRows.map((_, i) => i))
    )
  }

  // ── Preview converted data ──────────────────────────────────────────
  const converted = convertAllRows(csvRows, mappings)
  const selectedConverted = converted.filter((r) => selectedRows.has(r.rowIndex))
  const validCount = selectedConverted.filter((r) => r.errors.length === 0).length
  const errorCount = selectedConverted.filter((r) => r.errors.length > 0).length

  // ── Final import ────────────────────────────────────────────────────
  const handleImport = async () => {
    setIsLoading(true)
    const toImport = selectedConverted
      .filter((r) => r.errors.length === 0)
      .map((r) => r.listing)

    const created = importListings(toImport)
    setImportedIds(created.map((l) => l.id as string))
    setStep(3)
    setIsLoading(false)
  }

  return (
    <AppShell>
      <div className="p-8 max-w-5xl mx-auto">
        <PageHeader
          title="Import from CSV"
          description="Upload your MLS export or spreadsheet to generate marketing assets in minutes."
          back={
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">
              <ChevronLeft size={12} /> Dashboard
            </Link>
          }
          actions={
            step > 0 && step < 3 && (
              <a href="/sample-listings.csv" download className="btn-secondary btn-sm">
                <Download size={13} /> Sample CSV
              </a>
            )
          }
        />

        {/* Step indicator */}
        <div className="mb-8">
          <StepIndicator steps={STEPS} current={step} />
        </div>

        {/* ── STEP 0: Upload ─────────────────────────────────────────── */}
        {step === 0 && (
          <div className="max-w-2xl mx-auto">
            {error && <Alert type="error" className="mb-4">{error}</Alert>}

            {/* Drop zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200',
                isDragging
                  ? 'border-brand-blue bg-brand-blue/5 scale-[1.01]'
                  : 'border-gray-200 hover:border-brand-blue/50 hover:bg-surface-1'
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className="flex flex-col items-center gap-4">
                {isLoading ? (
                  <Spinner size={36} className="text-brand-blue" />
                ) : (
                  <div className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center transition-colors',
                    isDragging ? 'bg-brand-blue' : 'bg-surface-2'
                  )}>
                    <Upload size={28} className={isDragging ? 'text-white' : 'text-gray-400'} />
                  </div>
                )}
                <div>
                  <p className="text-base font-semibold text-gray-800 mb-1">
                    {isDragging ? 'Drop it here!' : 'Drop your CSV file here'}
                  </p>
                  <p className="text-sm text-gray-400">
                    or <span className="text-brand-blue font-medium">click to browse</span>
                  </p>
                </div>
                <p className="text-xs text-gray-400">Supports .csv — export from your MLS, Excel, or Google Sheets</p>
              </div>
            </div>

            <Divider label="or" />

            {/* Sample / tips */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={loadSample}
                disabled={isLoading}
                className="card p-5 text-left hover:shadow-card-md transition-all group cursor-pointer border-2 border-transparent hover:border-brand-blue/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <FileSpreadsheet size={18} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">Load Sample Data</p>
                    <p className="text-xs text-gray-400">4 listings, ready to try</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Try the full import workflow with realistic Chattanooga listings — no file needed.
                </p>
                {isLoading && <Spinner size={14} className="text-brand-blue mt-3" />}
              </button>

              <div className="card p-5 bg-surface-1 border-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-navy/8 flex items-center justify-center">
                    <Zap size={18} className="text-brand-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">MLS Export Tip</p>
                    <p className="text-xs text-gray-400">Get the most out of import</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Export from Paragon or Flexmls as CSV</li>
                  <li>• Include address, price, beds, baths, sqft</li>
                  <li>• Pipe-separate feature lists: feat1|feat2</li>
                  <li>• Agent info auto-fills from your profile</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 1: Map Columns ────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-5">
            {/* Score banner */}
            <div className={cn(
              'flex items-center justify-between rounded-xl px-5 py-4',
              score >= 80 ? 'bg-emerald-50 border border-emerald-200' :
              score >= 50 ? 'bg-amber-50 border border-amber-200' :
              'bg-red-50 border border-red-200'
            )}>
              <div className="flex items-center gap-3">
                {score >= 80
                  ? <CheckCircle size={18} className="text-emerald-600" />
                  : <AlertCircle size={18} className="text-amber-600" />}
                <div>
                  <p className={cn('text-sm font-semibold',
                    score >= 80 ? 'text-emerald-800' : score >= 50 ? 'text-amber-800' : 'text-red-800'
                  )}>
                    {score >= 80 ? 'Mapping looks great!' : score >= 50 ? 'Mapping needs attention' : 'Critical fields missing'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {fileName} · {csvRows.length} rows · {csvColumns.length} columns detected
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn('text-2xl font-bold', score >= 80 ? 'text-emerald-700' : 'text-amber-700')}>{score}%</p>
                <p className="text-xs text-gray-400">field coverage</p>
              </div>
            </div>

            {/* Mapping table */}
            <SectionCard
              title="Column Mappings"
              description="Match your spreadsheet columns to listing fields. Columns you skip will be ignored."
            >
              <div className="space-y-2">
                {/* Header */}
                <div className="grid grid-cols-[1fr_24px_1fr_80px] gap-3 px-3 pb-2 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Your CSV Column</span>
                  <span />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Maps To</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Sample</span>
                </div>

                {mappings.map((mapping) => {
                  const sampleValue = csvRows[0]?.[mapping.csvColumn] || ''
                  const isMapped = !!mapping.listingField
                  return (
                    <div
                      key={mapping.csvColumn}
                      className={cn(
                        'grid grid-cols-[1fr_24px_1fr_80px] gap-3 items-center px-3 py-2 rounded-lg',
                        isMapped ? 'bg-white hover:bg-surface-1' : 'bg-gray-50/50'
                      )}
                    >
                      {/* CSV column name */}
                      <div className="flex items-center gap-2">
                        <div className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', isMapped ? 'bg-emerald-500' : 'bg-gray-300')} />
                        <code className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700 truncate max-w-[160px]">
                          {mapping.csvColumn}
                        </code>
                      </div>

                      {/* Arrow */}
                      <ArrowRight size={14} className={isMapped ? 'text-brand-blue' : 'text-gray-300'} />

                      {/* Listing field selector */}
                      <Select
                        value={mapping.listingField || ''}
                        onChange={(v) => updateMapping(mapping.csvColumn, v)}
                        options={FIELD_OPTIONS}
                        placeholder="— Skip —"
                      />

                      {/* Sample value */}
                      <div
                        className="text-xs text-gray-400 truncate"
                        title={sampleValue}
                      >
                        {sampleValue || <span className="text-gray-300 italic">empty</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </SectionCard>

            <div className="flex justify-between">
              <button onClick={() => setStep(0)} className="btn-secondary">
                <ArrowLeft size={14} /> Back
              </button>
              <button onClick={() => setStep(2)} className="btn-primary" disabled={score < 30}>
                Review {csvRows.length} Listings <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Preview & Confirm ──────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-5">
            {/* Summary stats */}
            <div className="grid grid-cols-4 gap-4">
              <StatCard label="Total Rows" value={csvRows.length} />
              <StatCard label="Selected" value={selectedRows.size} />
              <StatCard label="Ready to Import" value={validCount} accent />
              <StatCard label="Has Errors" value={errorCount} sub={errorCount > 0 ? 'will be skipped' : 'none — great!'} />
            </div>

            {/* Row table */}
            <SectionCard
              title="Listing Preview"
              description="Review each row before importing. Uncheck any you want to skip."
              action={
                <div className="flex items-center gap-3">
                  <button onClick={toggleAll} className="btn-ghost btn-sm">
                    {selectedRows.size === csvRows.length ? 'Deselect all' : 'Select all'}
                  </button>
                </div>
              }
            >
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="w-8 pb-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedRows.size === csvRows.length && csvRows.length > 0}
                          onChange={toggleAll}
                          className="rounded border-gray-300 text-brand-blue"
                        />
                      </th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pr-4">Address</th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pr-4">City / State</th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pr-4">Price</th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pr-4">Beds / Baths</th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pr-4">Sq Ft</th>
                      <th className="pb-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                      <th className="pb-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {converted.map(({ listing, errors, rowIndex }) => (
                      <tr
                        key={rowIndex}
                        className={cn(
                          'transition-colors',
                          !selectedRows.has(rowIndex) ? 'opacity-40' : '',
                          errors.length > 0 ? 'bg-red-50/40' : 'hover:bg-surface-1'
                        )}
                      >
                        <td className="py-3 pr-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(rowIndex)}
                            onChange={() => toggleRow(rowIndex)}
                            className="rounded border-gray-300 text-brand-blue"
                          />
                        </td>
                        <td className="py-3 pr-4">
                          <span className="font-medium text-gray-900">{listing.address || <span className="text-red-400 italic">missing</span>}</span>
                        </td>
                        <td className="py-3 pr-4 text-gray-600">{listing.city}, {listing.state}</td>
                        <td className="py-3 pr-4 font-semibold text-brand-navy">{listing.price || '—'}</td>
                        <td className="py-3 pr-4 text-gray-600">{listing.beds}bd / {listing.baths}ba</td>
                        <td className="py-3 pr-4 text-gray-600">{listing.sqft || '—'}</td>
                        <td className="py-3 pr-4">
                          {errors.length > 0 ? (
                            <span className="badge badge-red" title={errors.join(', ')}>
                              <AlertCircle size={10} /> {errors[0]}
                            </span>
                          ) : (
                            <span className="badge badge-green"><Check size={10} /> Ready</span>
                          )}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => { setModalRowIdx(rowIndex); setShowPreviewModal(true) }}
                            className="btn-ghost btn-sm text-gray-400 hover:text-brand-blue"
                          >
                            <Eye size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <div className="flex justify-between items-center">
              <button onClick={() => setStep(1)} className="btn-secondary">
                <ArrowLeft size={14} /> Edit Mappings
              </button>
              <div className="flex items-center gap-3">
                {errorCount > 0 && (
                  <p className="text-xs text-amber-600">{errorCount} rows with errors will be skipped</p>
                )}
                <button
                  onClick={handleImport}
                  disabled={validCount === 0 || isLoading}
                  className="btn-gold"
                >
                  {isLoading ? <Spinner size={14} /> : <Zap size={14} />}
                  Import {validCount} Listing{validCount !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Done ─────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="max-w-lg mx-auto text-center py-8">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-brand-navy mb-2">
              {importedIds.length} listing{importedIds.length !== 1 ? 's' : ''} imported!
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Your listings are ready. Head to any listing to upload photos and generate your marketing graphics.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/listings" className="btn-primary btn-lg w-full justify-center">
                <Table size={16} /> View All Listings
              </Link>
              {importedIds.length > 0 && (
                <Link href={`/listings/${importedIds[0]}`} className="btn-secondary btn-lg w-full justify-center">
                  Open First Listing <ArrowRight size={14} />
                </Link>
              )}
              <button
                onClick={() => {
                  setStep(0)
                  setCsvRows([]); setCsvColumns([]); setMappings([])
                  setFileName(''); setImportedIds([])
                }}
                className="btn-ghost text-gray-400"
              >
                <RefreshCw size={13} /> Import another CSV
              </button>
            </div>
          </div>
        )}

        {/* ── Preview Modal ─────────────────────────────────────────────── */}
        <Modal
          open={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          title={`Row ${modalRowIdx + 1} Preview`}
          width="max-w-2xl"
        >
          {converted[modalRowIdx] && (
            <ListingPreviewCard listing={converted[modalRowIdx].listing} />
          )}
        </Modal>
      </div>
    </AppShell>
  )
}

// ── Listing preview card inside modal ────────────────────────────────────
function ListingPreviewCard({ listing }: { listing: Partial<Listing> }) {
  const fields = [
    ['Address', listing.address],
    ['City', listing.city],
    ['State', listing.state],
    ['ZIP', listing.zip],
    ['Price', listing.price],
    ['Beds', listing.beds],
    ['Baths', listing.baths],
    ['Sq Ft', listing.sqft],
    ['Lot Size', listing.lotSize],
    ['Year Built', listing.yearBuilt],
    ['Subdivision', listing.subdivision],
    ['MLS #', listing.mlsNumber],
    ['Open House', listing.openHouseDate ? `${listing.openHouseDate} ${listing.openHouseTime}` : '—'],
  ]
  return (
    <div className="space-y-4">
      {listing.headline && (
        <p className="text-base font-semibold text-brand-navy">"{listing.headline}"</p>
      )}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {fields.map(([label, value]) => (
          <div key={label as string} className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-xs text-gray-400 font-medium">{label}</span>
            <span className="text-xs text-gray-800 font-semibold text-right max-w-[180px] truncate">
              {(value as string) || <span className="text-gray-300">—</span>}
            </span>
          </div>
        ))}
      </div>
      {listing.features && listing.features.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Features</p>
          <ul className="space-y-1">
            {listing.features.map((f, i) => (
              <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-gold mt-1.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
      {listing.description && (
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Description</p>
          <p className="text-xs text-gray-600 leading-relaxed">{listing.description}</p>
        </div>
      )}
    </div>
  )
}
