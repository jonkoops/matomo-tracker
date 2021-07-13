import MatomoTracker from './MatomoTracker'
import * as types from './types'

declare global {
  interface Window {
    _paq: [string, ...any[]][]
    Matomo: {
      getAsyncTrackers: () => types.AsyncTracker[]
    }
  }
}

export default MatomoTracker

export { types }
