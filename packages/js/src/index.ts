import MatomoTracker from './MatomoTracker'

declare global {
  interface Window {
    _paq: [any, ...any[]][]
  }
}

export default MatomoTracker

export * from './types'
