import { requestJson } from '../../../shared/api/httpClient'

export function fetchPlayers(token) {
  return requestJson('/api/players', { token })
}

export function fetchPlayerSurroundings(playerName, token) {
  return requestJson(`/api/players/${encodeURIComponent(playerName)}/surroundings`, { token })
}
