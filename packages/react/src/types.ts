import { types } from "@datapunt/matomo-tracker-js";

export interface MatomoInstance {
  trackEvent?: Function;
  trackPageView?: Function;
  trackSiteSearch?: Function;
}

export interface InstanceParams extends types.UserOptions {}

export interface TrackPageViewParams extends types.TrackPageViewParams {}

export interface TrackEventParams extends types.TrackEventParams {}

export interface TrackSiteSearchParams extends types.TrackSiteSearchParams {}
