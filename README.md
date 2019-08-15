# Matomo Tracker

Stand alone library for using matamo tracking in frontend projects

## Installation

_Update when package is released_

## Usage

Before you're able to use this Matomo Tracker you need to initialize Matomo with you project specific details.

**Initialize:**

```js
const MatomoInstance = new window.MatomoTracker({
  urlBase: "https://LINK.TO.DOMAIN/",
  siteId: 3, // optional, default value: `1`
  trackerUrl: "https://LINK.TO.DOMAIN/tracking.php", // optional, default value: `${urlBase}matomo.php`
  srcUrl: "https://LINK.TO.DOMAIN/tracking.js" // optional, default value: `${urlBase}matomo.js`
});
```

After initialization you can use the Matomo Tracker to track events and page views like this:

```js
require("MatomoTracker");

const MatomoInstance = MatomoTracker({
  /* setup */
});

MatomoInstance.trackPageView();

MatomoInstance.trackEvent({
  action: "test",
  name: "sample", // optional
  value: "123" // optional
});
```

## Advanced usage

By default the Matomo Tracker will send the window's document title and location, but you're able to send your own values. Also, [custom dimensions](https://matomo.org/docs/custom-dimensions/) can be used:

```js

require('MatomoTracker');

const MatomoInstance = MatomoTracker({ /* setup */ });

MatomoInstance.trackPageView({
  documentTitle: 'Page title', // optional
  href: 'https://LINK.TO.PAGE', // optional
  customDimensions: [
    {
      id: 1,
      value: 'loggedIn'
    }
  ] // optional
})
})

MatomoInstance.trackEvent({
  action: 'test',
  name: 'sample', // optional
  value: '123' // optional
  documentTitle: 'Page title', // optional
  href: 'https://LINK.TO.PAGE', // optional
  customDimensions: [
    {
      id: 1,
      value: 'loggedIn'
    }
  ] // optional
})

```

Next to the tracking of events, this project also supports tracking site searches:

```js

require('MatomoTracker');

const MatomoInstance = MatomoTracker({ /* setup */ });

MatomoInstance.trackSiteSearch({
  keyword: 'test',
  category: 'blog', // optional
  count: 4 // optional
  documentTitle: 'Page title', // optional
  href: 'https://LINK.TO.PAGE', // optional
  customDimensions: [
    {
      id: 1,
      value: 'loggedIn'
    }
  ] // optional
})

```

Or if you want to stay away from inline JavaScript events, this project can be used to track events from buttons with data attributes:

**HTML5 data-attributes**

```html
<html>
<body>
    <button
      data-matomo-event="click"
      data-matomo-action="test" // optional
      data-matomo-name="sample" // optional
      data-matomo-value="123" // optional
      type="button"
    >
      Track me!
    </button>


    <script src="lib/index.js"></script>
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
