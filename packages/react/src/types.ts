import { types } from '@datapunt/matomo-tracker-js'

export interface MatomoInstance {
  trackEvent?: Function
  trackEvents?: Function
  trackPageView?: Function
  trackSiteSearch?: Function
  trackLink?: Function
}

export interface TrackPageViewParams extends types.TrackPageViewParams {}

export interface TrackEventParams extends types.TrackEventParams {}

export interface TrackSiteSearchParams extends types.TrackSiteSearchParams {}

export interface TrackLinkParams extends types.TrackLinkParams {}
