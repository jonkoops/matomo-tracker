import MatomoTracker from '@datapunt/matomo-tracker-js'
import { UserOptions } from '@datapunt/js'

export interface MatomoInstance {
  trackEvent: MatomoTracker['trackEvent']
  trackEvents: MatomoTracker['trackEvents']
  trackPageView: MatomoTracker['trackPageView']
  trackSiteSearch: MatomoTracker['trackSiteSearch']
  trackLink: MatomoTracker['trackLink']
  pushInstruction: MatomoTracker['pushInstruction']
}

export type InstanceParams = UserOptions
