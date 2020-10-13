import { useEffect } from 'react'

export const useCustomEvent = (eventName, callback) => {
  useEffect(() => {
    window.addEventListener(eventName, callback)

    return () => window.removeEventListener(eventName, callback)
  }, [eventName, callback])
}
