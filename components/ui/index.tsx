'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { X, AlertCircle, CheckCircle, Info, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/helpers'

// ── Spinner ───────────────────────────────────────────────────────────────
export function Spinner({ size = 16, className }: { size?: number; className?: string }) {
  return <Loader2 size={size} className={cn('animate-spin', className)} />
}

// ── Progress bar ──────────────────────────────────────────────────────────
export function ProgressBar({ value, max = 100, className }: { value: number; max?: number; className?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className={cn('h-1.5 bg-gray-100 rounded-full overflow-hidden', className)}>
      <div
        className="h-full bg-brand-blue rounded-full transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ── Step indicator ────────────────────────────────────────────────────────
export function StepIndicator({
  steps,
  current,
}: {
  steps: string[]
  current: number
}) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                i < current
                  ? 'bg-brand-navy text-white'
                  : i === current
                  ? 'bg-brand-blue text-white ring-4 ring-brand-blue/20'
                  : 'bg-gray-100 text-gray-400'
              )}
            >
              {i < current ? <CheckCircle size={14} /> : i + 1}
            </div>
            <span
              className={cn(
                'text-xs font-medium hidden sm:block',
                i === current ? 'text-brand-navy' : i < current ? 'text-gray-500' : 'text-gray-400'
              )}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn('w-10 h-px mx-3', i < current ? 'bg-brand-navy' : 'bg-gray-200')} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────
export function Modal({
  open,
  onClose,
  title,
  children,
  width = 'max-w-lg',
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  width?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={ref}
        className={cn('relative bg-white rounded-2xl shadow-card-xl w-full animate-slide-up', width)}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-brand-navy">{title}</h3>
          <button onClick={onClose} className="btn-ghost p-1.5 rounded-lg">
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}

// ── Alert banner ─────────────────────────────────────────────────────────
export function Alert({
  type = 'info',
  children,
  className,
}: {
  type?: 'info' | 'success' | 'warning' | 'error'
  children: ReactNode
  className?: string
}) {
  const styles = {
    info:    { wrap: 'bg-brand-blue/8 border-brand-blue/20 text-brand-navy', icon: <Info size={15} className="text-brand-blue" /> },
    success: { wrap: 'bg-emerald-50 border-emerald-200 text-emerald-800',  icon: <CheckCircle size={15} className="text-emerald-600" /> },
    warning: { wrap: 'bg-amber-50 border-amber-200 text-amber-800',        icon: <AlertCircle size={15} className="text-amber-600" /> },
    error:   { wrap: 'bg-red-50 border-red-200 text-red-800',              icon: <AlertCircle size={15} className="text-red-600" /> },
  }
  const s = styles[type]
  return (
    <div className={cn('flex items-start gap-3 rounded-lg border px-4 py-3 text-sm', s.wrap, className)}>
      <div className="flex-shrink-0 mt-0.5">{s.icon}</div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

// ── Section card wrapper ──────────────────────────────────────────────────
export function SectionCard({
  title,
  description,
  children,
  className,
  action,
}: {
  title?: string
  description?: string
  children: ReactNode
  className?: string
  action?: ReactNode
}) {
  return (
    <div className={cn('card overflow-hidden', className)}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <div>
            {title && <h3 className="text-sm font-semibold text-brand-navy">{title}</h3>}
            {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-surface-2 flex items-center justify-center mb-4 text-gray-300">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-700 mb-1">{title}</h3>
      {description && <p className="text-xs text-gray-400 max-w-xs mb-5">{description}</p>}
      {action}
    </div>
  )
}

// ── Kbd shortcut badge ────────────────────────────────────────────────────
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-gray-100 border border-gray-200 text-gray-500">
      {children}
    </kbd>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  if (!label) return <hr className="border-gray-100 my-4" />
  return (
    <div className="flex items-center gap-3 my-4">
      <hr className="flex-1 border-gray-100" />
      <span className="text-xs text-gray-400">{label}</span>
      <hr className="flex-1 border-gray-100" />
    </div>
  )
}

// ── Page header ───────────────────────────────────────────────────────────
export function PageHeader({
  title,
  description,
  actions,
  back,
}: {
  title: string
  description?: string
  actions?: ReactNode
  back?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        {back && <div className="mb-2">{back}</div>}
        <h1 className="text-xl font-bold text-brand-navy">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
}) {
  return (
    <div className={cn('rounded-xl p-4', accent ? 'bg-brand-navy text-white' : 'bg-surface-1 border border-gray-100')}>
      <p className={cn('text-xs font-medium mb-1', accent ? 'text-white/60' : 'text-gray-500')}>{label}</p>
      <p className={cn('text-2xl font-bold', accent ? 'text-white' : 'text-brand-navy')}>{value}</p>
      {sub && <p className={cn('text-xs mt-1', accent ? 'text-white/50' : 'text-gray-400')}>{sub}</p>}
    </div>
  )
}

// ── Select dropdown ───────────────────────────────────────────────────────
export function Select({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  className,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm',
        'focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20',
        'text-gray-900 transition-colors',
        className
      )}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
