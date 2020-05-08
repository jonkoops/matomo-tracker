import { types } from '@datapunt/matomo-tracker-js'

export interface MatomoInstance {
  trackEvent?: Function
  trackPageView?: Function
  trackSiteSearch?: Function
  trackLink?: Function
}

export interface InstanceParams extends types.UserOptions {}

export interface TrackPageViewParams extends types.TrackPageViewParams {}

export interface TrackEventParams extends types.TrackEventParams {}

export interface TrackSiteSearchParams extends types.TrackSiteSearchParams {}

export interface TrackLinkParams extends types.TrackLinkParams {}
