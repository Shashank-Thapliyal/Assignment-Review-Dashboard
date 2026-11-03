import { ChevronDown, Menu, Search } from 'lucide-react'
import Brand from '../common/Brand'
import { useAuth } from '../../hooks/useAuth'

function Topbar({ user, onOpenNavigation, onLogout }) {
  const { logout } = useAuth()

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-10 max-lg:h-[68px] max-lg:px-4">
      <div className="flex items-center gap-1">
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
        <label className="ml-1 flex w-64 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-[9px] text-slate-400 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 max-md:hidden">
          <Search size={16} aria-hidden="true" />
          <input
            className="w-full min-w-0 border-0 bg-transparent text-[13px] text-slate-900 outline-none placeholder:text-slate-400"
            type="search"
            placeholder="Search workspace"
            aria-label="Search workspace"
          />
        </label>
      </div>
      <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-left text-slate-500 hover:bg-slate-50" type="button">
        <span className="grid size-9 place-items-center rounded-full bg-indigo-50 text-[13px] font-bold text-indigo-700">{user.initials}</span>
        <span className="flex flex-col gap-0.5 max-sm:hidden">
          <strong className="text-[13px] font-semibold text-slate-900">{user.name}</strong>
          <small className="text-[11px] text-slate-500">{user.department}</small>
        </span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      <button className="ml-2 text-xs font-medium text-slate-500 hover:text-indigo-600" type="button" onClick={() => {
        logout()
        onLogout()
      }}>
        Log out
      </button>
    </header>
  )
}

export default Topbar
