/// <reference types="vite-plugin-pwa/client" />
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onRegistered(registration: ServiceWorkerRegistration | undefined) {
    if (registration) {
      setInterval(() => {
        registration.update()
      }, 60 * 60 * 1000) // Check for updates every hour
    }
  },
  onRegisterError(error: Error) {
    console.error('Service worker registration error:', error)
  },
})
