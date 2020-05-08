# Matomo Tracker (JavaScript)

Stand alone library for using Matamo tracking in frontend projects

## Installation

Matomo Tracker can be used in two ways:

1. Installing with npm: `npm i --save @datapunt/matomo-tracker-js` or yarn `yarn add -S @datapunt/matomo-tracker-js`

```js
import MatomoTracker from '@datapunt/matomo-tracker-js'

const MatomoInstance = new window.MatomoTracker({ ... })
```

2. By downloading the `bundle.min.js` from this repo and load it in your html as a script:

```html
<script src="./bundle.min.js"></script>
<script>
  const MatomoInstance = new window.MatomoTracker.default({
    /* setup */
  })

  // Load the event listeners
  MatomoInstance.trackEvents()

  // Track page views
  MatomoInstance.trackPageView()
</script>
```

## Usage

Before you're able to use this Matomo Tracker you need to initialize Matomo with your project specific details.

**Initialize:**

```js
const MatomoInstance = new window.MatomoTracker({
  urlBase: 'https://LINK.TO.DOMAIN',
  siteId: 3, // optional, default value: `1`
  trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
  srcUrl: 'https://LINK.TO.DOMAIN/tracking.js', // optional, default value: `${urlBase}matomo.js`
  heartBeat: { // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10 // optional, default value: `15
  }
  linkTracking: false // optional, default value: true
})
```

After initialization you can use the Matomo Tracker to track events and page views like this:

```js
import MatomoTracker from '@datapunt/matomo-tracker-js'

const MatomoInstance = new MatomoTracker({
  /* setup */
})

MatomoInstance.trackPageView()

MatomoInstance.trackEvent({
  category: 'sample-page',
  action: 'click-event',
  name: 'test', // optional
  value: 123, // optional, numerical value
})

MatomoInstance.trackLink({
  href: 'https://link-to-other-website.org',
})
```

## Advanced usage

By default the Matomo Tracker will send the window's document title and location, but you're able to send your own values. Also, [custom dimensions](https://matomo.org/docs/custom-dimensions/) can be used:

```js
import MatomoTracker from '@datapunt/matomo-tracker-js'

const MatomoInstance = new MatomoTracker({
  /* setup */
})

MatomoInstance.trackPageView({
  documentTitle: 'Page title', // optional
  href: 'https://LINK.TO.PAGE', // optional
  customDimensions: [
    {
      id: 1,
      value: 'loggedIn',
    },
  ], // optional
})

MatomoInstance.trackEvent({
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

MatomoInstance.trackLink({
  href: 'https://link-to-your-file.pdf',
  linkType: 'download', // optional, default value 'link'
})
```

Next to the tracking of events, this project also supports tracking site searches:

```js
import MatomoTracker from '@datapunt/matomo-tracker-js'

const MatomoInstance = new MatomoTracker({
  /* setup */
})

MatomoInstance.trackSiteSearch({
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
<html>
<body>
    <button
      data-matomo-event="click"
      data-matomo-category="sample-page"
      data-matomo-action="click-event"
      data-matomo-name="test" // optional
      data-matomo-value="123" // optional, numerical value
      type="button"
    >
      Track me!
    </button>


    <script src="./some-dir/bundle.min.js"></script>
    <script>
      const MatomoInstance = new window.MatomoTracker({ /* setup */ });

	  // Load the event listeners
      MatomoInstance.trackEvents();

      // Track page views
      MatomoInstance.trackPageView();

    </script>

    </body>
</html>
```

## References

- [Matomo JavaScript Tracking Guide](https://developer.matomo.org/guides/tracking-javascript-guide)
