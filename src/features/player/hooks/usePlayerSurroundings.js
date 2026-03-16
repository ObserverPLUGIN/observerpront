import { useEffect, useState } from 'react'
import { usePollingEffect } from '../../../shared/hooks/usePollingEffect'
import { fetchPlayerSurroundings } from '../api/playerApi'

export function usePlayerSurroundings(playerName, token, onUnauthorized) {
  const [surroundings, setSurroundings] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const enabled = Boolean(token && playerName)

  useEffect(() => {
    if (!enabled) {
      setSurroundings(null)
      setErrorMessage('')
    }
  }, [enabled])

  usePollingEffect(
    async () => {
      try {
        const payload = await fetchPlayerSurroundings(playerName, token)
        setSurroundings(payload)
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
    surroundings,
    errorMessage,
  }
}
