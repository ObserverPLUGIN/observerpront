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
