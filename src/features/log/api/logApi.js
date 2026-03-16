import { requestJson } from '../../../shared/api/httpClient'

export function fetchPlayerLogs(playerName, limit, token) {
  const searchParams = new URLSearchParams({
    player: playerName,
    limit: String(limit),
  })

  return requestJson(`/api/logs?${searchParams.toString()}`, { token })
}
