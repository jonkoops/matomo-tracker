import MatomoTracker from './MatomoTracker'
import * as types from './types'

declare global {
  interface Window {
    _paq: [any, ...any[]][]
  }
}

export default MatomoTracker

export { types }
