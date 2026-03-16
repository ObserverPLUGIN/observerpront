import { useState } from 'react'
import { usePollingEffect } from '../../../shared/hooks/usePollingEffect'
import { fetchServerHealth } from '../api/serverApi'

const initialHealth = {
  state: 'loading',
  message: 'Spring Boot API 연결 상태를 확인하는 중입니다.',
}

export function useServerHealth() {
  const [health, setHealth] = useState(initialHealth)

  usePollingEffect(async () => {
    try {
      const payload = await fetchServerHealth()
      setHealth({
        state: 'connected',
        message: `${payload.service} 정상 연결`,
      })
    } catch (error) {
      setHealth({
        state: 'error',
        message: error.message,
      })
    }
  }, 5000)

  return health
}
