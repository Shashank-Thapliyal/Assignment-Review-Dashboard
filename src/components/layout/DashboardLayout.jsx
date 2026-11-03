import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'

function DashboardLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleLogout() {
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user.role} />
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-10 bg-slate-900/35 lg:hidden"
          type="button"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <div className="min-w-0 flex-1">
        <Topbar user={user} onOpenNavigation={() => setSidebarOpen(true)} onLogout={handleLogout} />
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
