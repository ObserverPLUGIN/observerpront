import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { loginWithPassword } from '../api/authApi'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'
import { ServerStatusPill } from '../../server/components/ServerStatusPill'
import { useServerHealth } from '../../server/hooks/useServerHealth'
import { AuthLayout } from '../../../shared/layouts/AuthLayout'

export function LoginPage() {
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const health = useServerHealth()
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  if (auth.isAuthenticated) {
    return <Navigate to={location.state?.from ?? '/players'} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const payload = await loginWithPassword(credentials)
      auth.login(payload.accessToken)
      navigate(location.state?.from ?? '/players', { replace: true })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }))
    if (auth.notice) {
      auth.clearNotice()
    }
  }

  return (
    <AuthLayout heroActions={<ServerStatusPill health={health} />}>
      <LoginForm
        credentials={credentials}
        errorMessage={errorMessage || auth.notice}
        isSubmitting={isSubmitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  )
}
