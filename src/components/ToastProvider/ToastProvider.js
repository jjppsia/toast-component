import React from 'react'
import useKeydown from '../../hooks/use-keydown'

export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([])
  const handleEscape = React.useCallback(() => setToasts([]), [])

  useKeydown(handleEscape)

  const createToast = React.useCallback(
    (message, variant) => {
      const nextToast = [
        ...toasts,
        {
          id: crypto.randomUUID(),
          message,
          variant,
        },
      ]

      setToasts(nextToast)
    },
    [toasts]
  )

  const dismissToast = React.useCallback(
    (id) => {
      const nextToast = toasts.filter((toast) => toast.id !== id)

      setToasts(nextToast)
    },
    [toasts]
  )

  const value = React.useMemo(() => {
    return { toasts, createToast, dismissToast }
  }, [toasts, createToast, dismissToast])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export default ToastProvider
