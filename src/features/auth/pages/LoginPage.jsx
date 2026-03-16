import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { loginWithPassword } from '../api/authApi'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'
import { AuthLayout } from '../../../shared/layouts/AuthLayout'

export function LoginPage({ preview = false }) {
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const locationNotice = typeof location.state?.notice === 'string' ? location.state.notice : ''
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  if (!preview && auth.isAuthenticated) {
    return <Navigate to={location.state?.from ?? '/players'} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (preview) {
      setErrorMessage('')
      return
    }

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
    <AuthLayout>
      <LoginForm
        credentials={credentials}
        errorMessage={errorMessage || auth.notice || locationNotice}
        isSubmitting={isSubmitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  )
}
