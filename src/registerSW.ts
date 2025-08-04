import { registerSW } from 'virtual:pwa-register'

registerSW({
  onRegistered(r) {
    r && setInterval(() => {
      r.update()
    }, 60 * 60 * 1000) // Check for updates every hour
  },
  onRegisterError(error) {
    console.error('Service worker registration error:', error)
  },
})
