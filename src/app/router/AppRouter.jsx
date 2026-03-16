import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../../features/auth/pages/LoginPage'
import { PlayerDashboardPage } from '../../features/player/pages/PlayerDashboardPage'
import { ProtectedRoute } from '../../shared/components/ProtectedRoute'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/players"
        element={
          <ProtectedRoute>
            <PlayerDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/players" replace />} />
    </Routes>
  )
}
