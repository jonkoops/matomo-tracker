import MatomoTracker from './MatomoTracker'
import * as types from './types'

declare global {
  interface Window {
    _paq: [string, ...any[]][]
    MatomoTracker: typeof MatomoTracker
  }
}

if (typeof window !== 'undefined') {
  window.MatomoTracker = MatomoTracker
}

export default MatomoTracker

export { types }
