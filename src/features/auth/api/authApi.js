import { requestJson } from '../../../shared/api/httpClient'

export function loginWithPassword(credentials) {
  return requestJson('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
}

export function registerAccount(payload) {
  return requestJson('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export function resendVerificationCode(payload) {
  return requestJson('/api/auth/email/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export function verifyEmailCode(payload) {
  return requestJson('/api/auth/email/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export function requestPasswordReset(payload) {
  return requestJson('/api/auth/password-reset/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export function confirmPasswordReset(payload) {
  return requestJson('/api/auth/password-reset/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export function fetchCurrentUser(token) {
  return requestJson('/api/auth/me', {
    token,
  })
}
