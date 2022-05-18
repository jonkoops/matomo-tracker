import MatomoTracker, { types } from '@datapunt/matomo-tracker-js'

export interface MatomoInstance {
  trackEvent: MatomoTracker['trackEvent']
  trackEvents: MatomoTracker['trackEvents']
  trackPageView: MatomoTracker['trackPageView']
  trackSiteSearch: MatomoTracker['trackSiteSearch']
  trackLink: MatomoTracker['trackLink']
  pushInstruction: MatomoTracker['pushInstruction']
  enableTracking: MatomoTracker['enableTracking']
}

export type InstanceParams = types.UserOptions

export type TrackPageViewParams = types.TrackPageViewParams

export type TrackEventParams = types.TrackEventParams

export type TrackSiteSearchParams = types.TrackSiteSearchParams

export type TrackLinkParams = types.TrackLinkParams
