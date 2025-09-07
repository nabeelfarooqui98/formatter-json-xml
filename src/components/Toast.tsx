import { useEffect, useState } from 'react'

type ToastProps = {
  message: string
  show: boolean
  onHide?: () => void
  durationMs?: number
}

export default function Toast({ message, show, onHide, durationMs = 1200 }: ToastProps) {
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    setVisible(show)
    if (show) {
      const t = setTimeout(() => {
        setVisible(false)
        onHide?.()
      }, durationMs)
      return () => clearTimeout(t)
    }
  }, [show, durationMs, onHide])

  return (
    <div className={`toast ${visible ? 'show' : ''}`} aria-live="polite" aria-atomic="true">
      {message}
    </div>
  )
}


