import { BookOpenCheck, Check } from 'lucide-react'
import { useState } from 'react'
import { getUsersByRole } from '../../data/seedData'
import { useAuth } from '../../hooks/useAuth'

function LoginPage() {
  const { login } = useAuth()
  const [role, setRole] = useState('admin')
  const roleUsers = getUsersByRole(role)
  const [selectedUserId, setSelectedUserId] = useState(roleUsers[0].id)

  function handleRoleSwitch(newRole) {
    setRole(newRole)
    setSelectedUserId(getUsersByRole(newRole)[0].id)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const selectedUser = roleUsers.find((user) => user.id === selectedUserId)
    if (selectedUser) {
      login(selectedUser)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <section className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 grid size-11 place-items-center rounded-xl bg-indigo-600 text-white shadow-xs">
            <BookOpenCheck size={22} aria-hidden="true" />
          </div>
          <p className="m-0 text-[11px] font-extrabold tracking-[0.2em] text-indigo-600">ARD</p>
          <h1 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Assignment &amp; Review Dashboard
          </h1>
          <p className="mt-1 text-xs text-slate-500">Sign in to your academic workspace.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">Continue as</label>
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => handleRoleSwitch('admin')}
                className={`rounded-lg py-2 text-xs font-semibold transition ${
                  role === 'admin'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Professor
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('student')}
                className={`rounded-lg py-2 text-xs font-semibold transition ${
                  role === 'student'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student
              </button>
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-semibold text-slate-700">Choose a demo account</p>
            <div className="space-y-1.5">
              {roleUsers.map((user) => {
                const isSelected = user.id === selectedUserId

                return (
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 transition ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-50/70 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    key={user.id}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                        {user.initials}
                      </span>
                      <span className="min-w-0 truncate">
                        <span className="block truncate text-xs font-semibold text-slate-800">{user.name}</span>
                        <span className="block truncate text-[11px] text-slate-400">
                          {user.rollNumber || user.email}
                        </span>
                      </span>
                    </span>
                    <input
                      className="sr-only"
                      type="radio"
                      name="demo-account"
                      value={user.id}
                      checked={isSelected}
                      onChange={() => setSelectedUserId(user.id)}
                    />
                    <span className={`grid size-4 shrink-0 place-items-center rounded-full border ${isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'}`}>
                      {isSelected && <Check size={11} strokeWidth={3} aria-hidden="true" />}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          <button
            className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            type="submit"
          >
            Enter workspace
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Demo accounts do not require a password.
        </p>
      </section>
    </main>
  )
}

export default LoginPage
