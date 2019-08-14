const defaultOptions = {
  urlBase: null,
  siteId: 1
};

const TRACK_TYPES = {
  TRACK_EVENT: "trackEvent",
  TRACK_SEARCH: "trackSiteSearch",
  TRACK_VIEW: "trackPageView"
};

class MatomoTracker {
  constructor(userOptions) {
    const options = { ...defaultOptions, ...userOptions };
    if (!options.urlBase) {
      new Error("Matomo urlBase is not set.");
    }

    this.initialize(options);
  }

  initialize({ urlBase, siteId, trackerUrl, srcUrl }) {
    window._paq = window._paq || [];

    if (window._paq.length === 0) {
      window._paq.push(["enableLinkTracking"]);
      window._paq.push([
        "setTrackerUrl",
        trackerUrl ? trackerUrl : `${urlBase}matomo.php`
      ]);
      window._paq.push(["setSiteId", siteId]);

      const doc = document;
      const scriptElement = doc.createElement("script");
      const scripts = doc.getElementsByTagName("script")[0];

      scriptElement.type = "text/javascript";
      scriptElement.async = true;
      scriptElement.defer = true;
      scriptElement.src = srcUrl ? srcUrl : `${urlBase}matomo.js`;

      scripts.parentNode.insertBefore(scriptElement, scripts);
    }
  }

  trackEvents() {
    const clickEvents = [
      ...document.querySelectorAll('[data-matomo-event="click"]')
    ];

    clickEvents.forEach(element => {
      element.addEventListener("click", () => {
        const { matomoAction, matomoName, matomoValue } = element.dataset;
        this.trackEvent({
          action: matomoAction,
          name: matomoName,
          value: matomoValue
        });
      });
    });
  }

  trackEvent({
    action,
    name,
    value,
    documentTitle = window.document.title,
    href = window.location,
    customDimensions = false
  }) {
    if (!action) {
      throw new Error(`Error: action is not defined.`);
    }
    this.track(
      [TRACK_TYPES.TRACK_EVENT, action, name, value],
      documentTitle,
      href,
      customDimensions
    );
  }

  trackPageView({
    documentTitle = window.document.title,
    href = window.location,
    customDimensions = false
  }) {
    this.track([TRACK_TYPES.TRACK_VIEW], documentTitle, href, customDimensions);
  }

  track(data = [], documentTitle, href, customDimensions = false) {
    if (data.length) {
      if (customDimensions.length) {
        customDimensions.map(customDimension =>
          window._paq.push([
            "setCustomDimension",
            customDimension.id,
            customDimension.value
          ])
        );
      }

      window._paq.push(["setCustomUrl", href]);
      window._paq.push(["setDocumentTitle", documentTitle]);
      window._paq.push(["enableHeartBeatTimer"]); // accurately measure the time spent on the last pageview of a visit
      window._paq.push(data);
    }
  }
}

export default MatomoTracker;
