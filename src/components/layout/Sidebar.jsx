import { CalendarDays, ClipboardList, LayoutDashboard, Settings, Users, X } from 'lucide-react'
import Brand from '../common/Brand'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Assignments', icon: ClipboardList },
  { label: 'Students', icon: Users },
  { label: 'Calendar', icon: CalendarDays },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex w-64 shrink-0 -translate-x-full flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : ''
      }`}
    >
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <Brand />
        <button
          className="ml-auto hidden rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 max-lg:grid"
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-6" aria-label="Primary navigation">
        <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Workspace</p>
        {navigation.map(({ label, icon: Icon }, index) => (
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-[11px] text-left text-sm font-medium transition-colors ${
              index === 0
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
            key={label}
            type="button"
          >
            <Icon size={18} strokeWidth={index === 0 ? 2.2 : 1.8} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>
      <button
        className="m-3 flex w-[calc(100%-24px)] items-center gap-3 rounded-lg px-3 py-[11px] text-left text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        type="button"
      >
        <Settings size={18} strokeWidth={1.8} aria-hidden="true" />
        Settings
      </button>
    </aside>
  )
}

export default Sidebar
