import { useEffect, useRef } from 'react'

export function usePollingEffect(callback, delay, enabled = true) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    callbackRef.current()
    const intervalId = window.setInterval(() => {
      callbackRef.current()
    }, delay)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [delay, enabled])
}
