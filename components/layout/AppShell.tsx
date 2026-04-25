'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, Upload, Wand2, Settings,
  ChevronRight, Zap, Star, Archive
} from 'lucide-react'
import { cn } from '@/lib/utils/helpers'

const NAV = [
  { href: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/listings',   icon: FileText,         label: 'Listings' },
  { href: '/import',     icon: Upload,            label: 'Import CSV' },
  { href: '/templates',  icon: Wand2,             label: 'Templates' },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen overflow-hidden bg-surface-2">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-60 flex-shrink-0 flex flex-col bg-white border-r border-gray-100">
        {/* Logo / Brand */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center flex-shrink-0">
              <Zap size={16} className="text-brand-gold" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-navy leading-tight">JLP Design</p>
              <p className="text-[10px] text-gray-400 leading-tight">Listing Engine</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <Icon size={16} className={active ? 'text-brand-gold' : ''} />
                {label}
                {active && <ChevronRight size={12} className="ml-auto opacity-60" />}
              </Link>
            )
          })}
        </nav>

        {/* Agent card at bottom */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="bg-surface-1 rounded-xl p-3">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                JL
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-brand-navy truncate">Joey Leffew</p>
                <p className="text-[10px] text-gray-400 truncate">Keller Williams</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400">Chattanooga, TN</p>
          </div>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
