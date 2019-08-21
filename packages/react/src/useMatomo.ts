import React from 'react'
import MatomoContext from './MatomoContext'
import {
  MatomoInstance,
  TrackPageViewParams,
  TrackEventParams,
  TrackSiteSearchParams,
} from './types'

function useMatomo() {
  const instance: MatomoInstance = React.useContext(MatomoContext)

  const trackPageView = (params: TrackPageViewParams) =>
    instance.trackPageView && instance.trackPageView(params)

  const trackEvent = (params: TrackEventParams) =>
    instance.trackEvent && instance.trackEvent(params)

  const trackSiteSearch = (params: TrackSiteSearchParams) =>
    instance.trackSiteSearch && instance.trackSiteSearch(params)

  return {
    trackEvent,
    trackPageView,
    trackSiteSearch,
  }
}

export default useMatomo
