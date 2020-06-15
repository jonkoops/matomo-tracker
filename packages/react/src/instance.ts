import MatomoTracker from '@datapunt/matomo-tracker-js'

function createInstance(urlBase: string) {
  return new MatomoTracker(urlBase)
}

export default createInstance
