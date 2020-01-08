import MatomoTracker from './MatomoTracker'
import * as types from './types'

if (typeof window !== 'undefined') {
  window.MatomoTracker = MatomoTracker
}

export default MatomoTracker

export { types }
