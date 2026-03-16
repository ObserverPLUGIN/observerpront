import { Navigate, Route, Routes } from 'react-router-dom'
import { EmailVerificationPage } from '../../features/auth/pages/EmailVerificationPage'
import { LoginPage } from '../../features/auth/pages/LoginPage'
import { PasswordResetPage } from '../../features/auth/pages/PasswordResetPage'
import { RegisterPage } from '../../features/auth/pages/RegisterPage'
import { MainLandingPage } from '../../features/main/pages/MainLandingPage'
import { PlayerDashboardPage } from '../../features/player/pages/PlayerDashboardPage'
import { ProtectedRoute } from '../../shared/components/ProtectedRoute'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-preview" element={<LoginPage preview />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-preview" element={<RegisterPage preview />} />
      <Route path="/reset-password" element={<PasswordResetPage />} />
      <Route path="/reset-password-preview" element={<PasswordResetPage preview />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route path="/verify-email-preview" element={<EmailVerificationPage preview />} />
      <Route path="/main-preview" element={<MainLandingPage />} />
      <Route
        path="/players"
        element={
          <ProtectedRoute>
            <PlayerDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
