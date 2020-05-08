import React from 'react'
import MatomoContext from './MatomoContext'
import {
  MatomoInstance,
  TrackPageViewParams,
  TrackEventParams,
  TrackSiteSearchParams,
  TrackLinkParams,
} from './types'
import useOutboundClickListener from './utils/useOutboundClickListener'

function useMatomo() {
  const instance: MatomoInstance = React.useContext(MatomoContext)

  const trackPageView = (params: TrackPageViewParams) =>
    instance.trackPageView && instance.trackPageView(params)

  const trackEvent = (params: TrackEventParams) =>
    instance.trackEvent && instance.trackEvent(params)

  const trackSiteSearch = (params: TrackSiteSearchParams) =>
    instance.trackSiteSearch && instance.trackSiteSearch(params)

  const trackLink = (params: TrackLinkParams) =>
    instance.trackLink && instance.trackLink(params)

  const enableLinkTracking = () => useOutboundClickListener(instance)

  return {
    trackEvent,
    trackPageView,
    trackSiteSearch,
    trackLink,
    enableLinkTracking,
  }
}

export default useMatomo
