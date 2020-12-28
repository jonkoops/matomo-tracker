# Matomo Tracker (React)

Stand alone library for using Matamo tracking in React projects

## Installation

```sh
npm install @datapunt/matomo-tracker-react
```

## Usage

Before you're able to use this Matomo Tracker you need to create a Matomo instance with your project specific details, and wrap your application with the `MatomoProvider` that this package exposes.

```tsx
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

const instance = createInstance({
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

ReactDOM.render(
  <MatomoProvider value={instance}>
    <MyApp />
  </MatomoProvider>,
)
```

After wrapping your application with the `MatomoProvider` you can use the `useMatomo` hook to track your application from anywhere within the MatomoProvider component tree:

```tsx
import React from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'

const MyPage = () => {
  const { trackPageView, trackEvent } = useMatomo()

  // Track page view
  React.useEffect(() => {
    trackPageView()
  }, [])

  const handleOnClick = () => {
    // Track click on button
    trackEvent({ category: 'sample-page', action: 'click-event' })
  }

  return (
    <button type="button" onClick={handleOnClick}>
      Click me
    </button>
  )
}
```

## Advanced usage

By default the Matomo Tracker will send the window's document title and location, or send your own values. Also, [custom dimensions](https://matomo.org/docs/custom-dimensions/) can be used:

```tsx
import React from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'

const MyPage = () => {
  const { trackPageView, trackEvent } = useMatomo()

  // Track page view
  React.useEffect(() => {
    trackPageView({
      documentTitle: 'Page title', // optional
      href: 'https://LINK.TO.PAGE', // optional
      customDimensions: [
        {
          id: 1,
          value: 'loggedIn',
        },
      ], // optional
    })
  }, [])

  const handleOnClick = () => {
    // Track click on button
    trackEvent({ category: 'sample-page', action: 'click-event' })
  }

  return (
    <button type="button" onClick={handleOnClick}>
      Click me
    </button>
  )
}
```

And you can do the same for the `trackEvent` method:

```tsx
import React from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'

const MyPage = () => {
  const { trackEvent } = useMatomo()

  const handleOnClick = () => {
    // Track click on button
    trackEvent({
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
  }

  return (
    <button type="button" onClick={handleOnClick}>
      Click me
    </button>
  )
}
```

The `useMatomo` hook also exposes the following methods:
* `trackEvents()`
* `trackSiteSearch()`
* `trackLink()`
* `pushInstruction()`

For example, the `pushInstruction()` function can be used to push instructions to Matomo for execution. This
is equivalent to pushing entries into the `_paq` array.


```javascript
const { pushInstruction } = useMatomo();
pushInstruction('setUserId', 'USER_ID_HERE');
```

## SPA Link Tracking

Matomo provides the option to track outbound link, however, this implementation is flaky for a SPA (Single Page Application) **without** SSR (Server Side Rendering) across different versions of Matomo. Therefore you can use the `enableLinkTracking` method to listen to outbound clicks on anchor elements. This method should be placed on a component directly below your `MatomoProvider` on a component that's rendered on every page view. Also, make sure to disable the `linkTracking` option on the instance passed to the provider to prevent Matomo from catching some link clicks:

```tsx
import { MatomoProvider, createInstance, useMatomo } from '@datapunt/matomo-tracker-react'

const instance = createInstance({
  urlBase: "https://LINK.TO.DOMAIN",
  linkTracking: false // Important!
});

ReactDOM.render(
  <MatomoProvider value={instance}>
    <MyApp />
  </MatomoProvider>
)

const MyApp = () => {
  const { enableLinkTracking } = useMatomo()

  enableLinkTracking()

  return (
    // Render components
  )
}

```

## References

- [Matomo JavaScript Tracking Guide](https://developer.matomo.org/guides/tracking-javascript-guide)
