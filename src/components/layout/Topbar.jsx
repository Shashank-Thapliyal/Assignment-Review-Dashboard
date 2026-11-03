import { RotateCcw } from 'lucide-react'
import Brand from '../common/Brand'
import { useAuth } from '../../hooks/useAuth'
import { useAssignments } from '../../hooks/useAssignments'

function Topbar({ user, onLogout }) {
  const { logout } = useAuth()
  const { resetDemoData } = useAssignments()

  function handleReset() {
    if (window.confirm('Reset all assignments and submissions to initial demo data?')) {
      resetDemoData()
      window.location.reload()
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-10">
      <div className="flex items-center gap-3">
        <Brand />
        <span className="hidden text-xs text-slate-400 sm:inline-block border-l border-slate-200 pl-3">
          NIT Warangal Portal
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
          <span className="grid size-8 place-items-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">
            {user.initials}
          </span>
          <span className="flex flex-col max-sm:hidden">
            <strong className="text-xs font-semibold text-slate-900">{user.name}</strong>
            <small className="text-[10px] text-slate-400">
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
