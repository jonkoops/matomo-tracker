# Matomo Tracker (JavaScript)

Stand alone library for using Matamo tracking in frontend projects

## Installation

```sh
npm install @datapunt/matomo-tracker-js
```

## Usage

Before you're able to use this Matomo Tracker you need to initialize Matomo with your project specific details.

**Initialize:**

```ts
import MatomoTracker from '@datapunt/matomo-tracker-js'

const tracker = new MatomoTracker({
  urlBase: 'https://LINK.TO.DOMAIN',
  siteId: 3,
  userId: 'UID76903202', // optional, default value: `undefined`.
  trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
  srcUrl: 'https://LINK.TO.DOMAIN/tracking.js', // optional, default value: `${urlBase}matomo.js`
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: { // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10 // optional, default value: `15
  },
  linkTracking: false, // optional, default value: true
  configurations: { // optional, default value: {}
    // any valid matomo configuration, all below are optional
    disableCookies: true,
    setSecureCookie: true,
    setRequestMethod: 'POST'
  }
})
```

After initialization you can use the Matomo Tracker to track events and page views like this:

```ts
import MatomoTracker from '@datapunt/matomo-tracker-js'

const tracker = new MatomoTracker({
  /* setup */
})

tracker.trackPageView()

tracker.trackEvent({
  category: 'sample-page',
  action: 'click-event',
  name: 'test', // optional
  value: 123, // optional, numerical value
})

tracker.trackLink({
  href: 'https://link-to-other-website.org',
})
```

## Advanced usage

By default the Matomo Tracker will send the window's document title and location, but you're able to send your own values. Also, [custom dimensions](https://matomo.org/docs/custom-dimensions/) can be used:

```ts
import MatomoTracker from '@datapunt/matomo-tracker-js'

const tracker = new MatomoTracker({
  /* setup */
})

tracker.trackPageView({
  documentTitle: 'Page title', // optional
  href: 'https://LINK.TO.PAGE', // optional
  customDimensions: [
    {
      id: 1,
      value: 'loggedIn',
    },
  ], // optional
})

tracker.trackEvent({
  category: 'sample-page',
  action: 'click-event',
  name: 'test', // optional
  value: 123, // optional, numerical value
  documentTitle: 'Page title', // optional
  href: 'https://LINK.TO.PAGE', // optional
  customDimensions: [
    {
      id: 1,
      value: 'loggedIn',
    },
  ], // optional
})

tracker.trackLink({
  href: 'https://link-to-your-file.pdf',
  linkType: 'download', // optional, default value 'link'
})
```

Next to the tracking of events, this project also supports tracking site searches:

```ts
import MatomoTracker from '@datapunt/matomo-tracker-js'

const tracker = new MatomoTracker({
  /* setup */
})

tracker.trackSiteSearch({
  keyword: 'test',
  category: 'blog', // optional
  count: 4, // optional
  documentTitle: 'Page title', // optional
  href: 'https://LINK.TO.PAGE', // optional
  customDimensions: [
    {
      id: 1,
      value: 'loggedIn',
    },
  ], // optional
})
```

Or if you want to stay away from inline JavaScript events, this project can be used to track events from buttons with data attributes:

**HTML5 data-attributes**

```html
<button
  data-matomo-event="click"
  data-matomo-category="sample-page"
  data-matomo-action="click-event"
  data-matomo-name="test" // optional
  data-matomo-value="123" // optional, numerical value
  type="button">
  Track me!
</button>
```

```ts
import MatomoTracker from '@datapunt/matomo-tracker-js'

const tracker = new MatomoTracker({
  /* setup */
})

// Load the event listeners
tracker.trackEvents()

// Track page views
tracker.trackPageView()
```

## References

- [Matomo JavaScript Tracking Guide](https://developer.matomo.org/guides/tracking-javascript-guide)
