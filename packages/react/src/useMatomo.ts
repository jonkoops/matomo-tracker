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

  const trackEvents = () => instance.trackEvents && instance.trackEvents()

  const trackSiteSearch = (params: TrackSiteSearchParams) =>
    instance.trackSiteSearch && instance.trackSiteSearch(params)

  const trackLink = (params: TrackLinkParams) =>
    instance.trackLink && instance.trackLink(params)

  const enableLinkTracking = () => useOutboundClickListener(instance)

  const pushInstruction = (name: string, ...args: any[]) => {
    if (instance.pushInstruction) {
      instance.pushInstruction(name, ...args)
    }
  }

  return {
    trackEvent,
    trackEvents,
    trackPageView,
    trackSiteSearch,
    trackLink,
    enableLinkTracking,
    pushInstruction,
  }
}

export default useMatomo
