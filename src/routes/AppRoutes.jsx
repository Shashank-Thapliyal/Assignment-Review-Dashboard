import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import DashboardLayout from '../components/layout/DashboardLayout'
import LoginPage from '../features/auth/LoginPage'
import AdminDashboard from '../features/admin/AdminDashboard'
import StudentDashboard from '../features/student/StudentDashboard'
import ProtectedRoute from './ProtectedRoute'

function HomeRedirect() {
  const { user } = useAuth()
  return <Navigate to={user ? (user.role === 'admin' ? '/admin' : '/student') : '/login'} replace />
}

function LoginRoute() {
  const { user } = useAuth()
  return user ? <HomeRedirect /> : <LoginPage />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRole="student" />}>
            <Route path="/student" element={<StudentDashboard />} />
          </Route>
        </Route>
      </Route>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  )
}

export default AppRoutes
