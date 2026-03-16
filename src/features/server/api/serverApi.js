import { requestJson } from '../../../shared/api/httpClient'

export function fetchServerHealth() {
  return requestJson('/api/health')
}
