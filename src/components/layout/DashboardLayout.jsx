import { Outlet, useNavigate } from 'react-router-dom'
import Topbar from './Topbar'
import { useAuth } from '../../hooks/useAuth'

function DashboardLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Topbar user={user} onLogout={() => navigate('/login', { replace: true })} />
      <Outlet />
    </div>
  )
}

export default DashboardLayout
