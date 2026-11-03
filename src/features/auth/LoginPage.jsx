import { BookOpenCheck, Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { getUsersByRole } from '../../data/seedData'
import { useAuth } from '../../hooks/useAuth'

function LoginPage() {
  const { login } = useAuth()
  const [role, setRole] = useState('admin')
  const roleUsers = getUsersByRole(role)
  const [selectedUserId, setSelectedUserId] = useState(roleUsers[0].id)

  function handleRoleChange(event) {
    const nextRole = event.target.value
    setRole(nextRole)
    setSelectedUserId(getUsersByRole(nextRole)[0].id)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const selectedUser = roleUsers.find((user) => user.id === selectedUserId)

    if (selectedUser) {
      login(selectedUser)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-[440px] rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 grid size-12 place-items-center rounded-[14px] bg-indigo-600 text-white">
            <BookOpenCheck size={25} aria-hidden="true" />
          </div>
          <p className="m-0 text-xs font-extrabold tracking-[0.2em] text-indigo-600">ARD</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Assignment &amp; Review Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to your academic workspace.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="role">
              Continue as
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                id="role"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="admin">Professor</option>
                <option value="student">Student</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} aria-hidden="true" />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">Choose a demo account</p>
            <div className="space-y-2">
              {roleUsers.map((user) => {
                const isSelected = user.id === selectedUserId

                return (
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-3 transition ${
                      isSelected
                        ? 'border-indigo-300 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    key={user.id}
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                        {user.initials}
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-slate-800">{user.name}</span>
                        <span className="block text-xs text-slate-500">
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
                    <span className={`grid size-5 place-items-center rounded-full border ${isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'}`}>
                      {isSelected && <Check size={13} strokeWidth={3} aria-hidden="true" />}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          <button className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100" type="submit">
            Enter workspace
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          Demo accounts do not require a password.
        </p>
      </section>
    </main>
  )
}

export default LoginPage
