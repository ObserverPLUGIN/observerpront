import { useEffect, useState } from 'react'
import { usePollingEffect } from '../../../shared/hooks/usePollingEffect'
import { fetchPlayerLogs } from '../api/logApi'

export function usePlayerLogs(playerName, token, limit, onUnauthorized) {
  const [logs, setLogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const enabled = Boolean(token && playerName)

  useEffect(() => {
    if (!enabled) {
      setLogs([])
      setErrorMessage('')
    }
  }, [enabled])

  usePollingEffect(
    async () => {
      try {
        const payload = await fetchPlayerLogs(playerName, limit, token)
        setLogs(payload)
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
    logs,
    errorMessage,
  }
}
