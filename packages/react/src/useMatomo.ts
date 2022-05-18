import { useCallback, useContext } from 'react'
import MatomoContext from './MatomoContext'
import {
  TrackEventParams,
  TrackLinkParams,
  TrackPageViewParams,
  TrackSiteSearchParams,
} from './types'
import useOutboundClickListener from './utils/useOutboundClickListener'

function useMatomo() {
  const instance = useContext(MatomoContext)

  const trackPageView = useCallback(
    (params?: TrackPageViewParams) => instance?.trackPageView(params),
    [instance],
  )

  const trackEvent = useCallback(
    (params: TrackEventParams) => instance?.trackEvent(params),
    [instance],
  )

  const trackEvents = useCallback(() => instance?.trackEvents(), [instance])

  const trackSiteSearch = useCallback(
    (params: TrackSiteSearchParams) => instance?.trackSiteSearch(params),
    [instance],
  )

  const trackLink = useCallback(
    (params: TrackLinkParams) => instance?.trackLink(params),
    [instance],
  )

  const enableLinkTracking = useCallback(() => {
    if (instance) {
      useOutboundClickListener(instance)
    }
  }, [instance])

  const pushInstruction = useCallback(
    (name: string, ...args: any[]) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      instance?.pushInstruction(name, ...args)
    },
    [instance],
  )

  const enableTracking = useCallback(() => {
    instance?.enableTracking()
  }, [instance])

  return {
    enableLinkTracking,
    enableTracking,
    pushInstruction,
    trackEvent,
    trackEvents,
    trackLink,
    trackPageView,
    trackSiteSearch,
  }
}

export default useMatomo
