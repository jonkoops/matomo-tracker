declare global {
  interface Window {
    _paq: any;
    MatomoTracker: any;
  }
}

export interface CustomDimension {
  id: number;
  value: string;
}

export interface UserOptions {
  urlBase: string;
  siteId: number;
  trackerUrl?: string;
  srcUrl?: string;
}

export interface TrackPageViewParams {
  documentTitle?: string;
  href?: string | Location;
  customDimensions?: boolean | [];
}

export interface TrackParams extends TrackPageViewParams {
  data: any;
}

export interface TrackEventParams extends TrackPageViewParams {
  action: string;
  name?: string;
  value?: string;
}

export interface TrackSiteSearchParams extends TrackPageViewParams {
  keyword: string;
  category?: string;
  count?: number;
}
