import Brand from '../common/Brand'
import { useAuth } from '../../hooks/useAuth'

function Topbar({ user, onLogout }) {
  const { logout } = useAuth()

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <Brand />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg px-2 py-1 text-left text-slate-500">
          <span className="grid size-8 place-items-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">
            {user.initials}
          </span>
          <span className="flex flex-col text-xs">
            <strong className="font-semibold text-slate-900">{user.name}</strong>
            <small className="text-[11px] text-slate-400 capitalize">{user.role}</small>
          </span>
        </div>

        <button
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
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
