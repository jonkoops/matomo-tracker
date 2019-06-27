const defaultOptions = {
  urlBase: null,
  siteId: 1, // production
}

class MatomoTracker {
  static TRACK_TYPES = {
    TRACK_EVENT: 'trackEvent',
    TRACK_SEARCH: 'trackSiteSearch',
    TRACK_VIEW: 'trackPageView',
  }

  constructor(userOptions) {
    const options = { ...defaultOptions, ...userOptions }
    if (!options.urlBase) {
      new Error('Matomo urlBase is not set.')
    }

    this.initialize(options)
  }

  initialize({ urlBase, siteId }) {
    window._paq = window._paq || []

    if (window._paq.length === 0) {
      window._paq.push(['enableLinkTracking'])
      window._paq.push(['setTrackerUrl', `${urlBase}piwik.php`])
      window._paq.push(['setSiteId', siteId])

      const doc = document
      const scriptElement = doc.createElement('script')
      const scripts = doc.getElementsByTagName('script')[0]

      scriptElement.type = 'text/javascript'
      scriptElement.async = true
      scriptElement.defer = true
      scriptElement.src = `${urlBase}piwik.js`

      scripts.parentNode.insertBefore(scriptElement, scripts)
    }
  }

  trackEvents() {
    const clickEvents = [...document.querySelectorAll('[data-matomo-event="click"]')]
    clickEvents.forEach((element) => {
      element.addEventListener('click', () => {
        const { matomoCategory, matomoQuery } = element.dataset
        this.track([matomoCategory, matomoQuery])
      })
    })
  }

  trackPageView() {
    this.track()
  }

  track(data = [], customDimensions = false) {
    const href = window.location.href
    const title = window.document.title

    if (data.length) {
      if (customDimensions.length) {
        customDimensions.map(
          (customDimension) => window._paq.push(['setCustomDimension', customDimension.id, customDimension.value]),
        )
      }

      window._paq.push(['setCustomUrl', href])
      window._paq.push(['setDocumentTitle', title])
      window._paq.push(['enableHeartBeatTimer']) // accurately measure the time spent on the last pageview of a visit
      window._paq.push(data)
    }
  }
}

export default MatomoTracker
