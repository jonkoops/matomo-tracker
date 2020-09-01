import React from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'

const App = () => {
  const { trackPageView, trackEvent } = useMatomo()

  // Track page view
  React.useEffect(() => {
    trackPageView({
      documentTitle: 'Page title', // optional
      customDimensions: [
        {
          id: 1,
          value: 'loggedIn',
        },
      ], // optional
    })
  }, [trackPageView])

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

export default App
