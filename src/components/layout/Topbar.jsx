import { Menu, RotateCcw } from 'lucide-react'
import Brand from '../common/Brand'
import { useAuth } from '../../hooks/useAuth'
import { useAssignments } from '../../hooks/useAssignments'

function Topbar({ user, onOpenNavigation, onLogout }) {
  const { logout } = useAuth()
  const { resetDemoData } = useAssignments()

  function handleReset() {
    if (window.confirm('Reset all assignments and submissions to initial demo data?')) {
      resetDemoData()
      window.location.reload()
    }
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-10 max-lg:h-[68px] max-lg:px-4">
      <div className="flex items-center gap-2">
        <button
          className="grid rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 lg:hidden"
          type="button"
          onClick={onOpenNavigation}
          aria-label="Open navigation"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
        <div className="grid lg:hidden">
          <Brand />
        </div>
        <span className="hidden text-xs text-slate-400 sm:inline-block">
          NIT Warangal Demo Portal
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleReset}
          title="Reset demo data"
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-500 hover:bg-slate-50 max-sm:hidden"
        >
          <RotateCcw size={13} />
          Reset Demo
        </button>

        <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-slate-500">
          <span className="grid size-9 place-items-center rounded-full bg-indigo-50 text-[13px] font-bold text-indigo-700">
            {user.initials}
          </span>
          <span className="flex flex-col gap-0.5 max-sm:hidden">
            <strong className="text-[13px] font-semibold text-slate-900">{user.name}</strong>
            <small className="text-[11px] text-slate-500">
              {user.rollNumber ? `${user.rollNumber} • ${user.department}` : user.department}
            </small>
          </span>
        </div>

        <button
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-indigo-600"
          type="button"
          onClick={() => {
            logout()
            onLogout()
          }}
        >
          Log out
        </button>
      </div>
    </header>
  )
}

export default Topbar
