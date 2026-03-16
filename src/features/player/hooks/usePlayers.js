import { useEffect, useState } from 'react'
import { usePollingEffect } from '../../../shared/hooks/usePollingEffect'
import { fetchPlayers } from '../api/playerApi'

export function usePlayers(token, onUnauthorized) {
  const [players, setPlayers] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const enabled = Boolean(token)

  useEffect(() => {
    if (!enabled) {
      setPlayers([])
      setErrorMessage('')
    }
  }, [enabled])

  usePollingEffect(
    async () => {
      try {
        const payload = await fetchPlayers(token)
        setPlayers(payload)
        setErrorMessage('')
      } catch (error) {
        if (error.status === 401) {
          onUnauthorized?.()
          return
        }

        setErrorMessage(error.message)
      }
    },
    2500,
    enabled,
  )

  return {
    players,
    errorMessage,
  }
}
