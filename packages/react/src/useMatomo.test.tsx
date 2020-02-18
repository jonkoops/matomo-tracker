import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import MatomoTracker from '@datapunt/matomo-tracker-js'
import MatomoProvider from './MatomoProvider'
import createInstance from './instance'
import useMatomo from './useMatomo'

jest.mock('@datapunt/matomo-tracker-js')

describe('useMatomo', () => {
  const JustAComponent = () => {
    const { trackPageView, trackEvent } = useMatomo()

    // Track page view after page load
    React.useEffect(() => {
      trackPageView({
        documentTitle: 'Hello',
      })
    }, [trackPageView])

    const handleOnClick = () => {
      trackEvent({ category: 'sample-page', action: 'click-event' })
    }

    return (
      <button type="button" data-testid="btn" onClick={handleOnClick}>
        Click me
      </button>
    )
  }
  it('should render, call trackPageView once and call trackEvent when clicking a button', () => {
    const trackEventMock = jest.fn()
    const trackPageViewMock = jest.fn()
    const mockedMatomoTracker = MatomoTracker as jest.Mocked<any>
    mockedMatomoTracker.mockImplementation(() => ({
      trackEvent: trackEventMock,
      trackPageView: trackPageViewMock,
    }))

    const instance = createInstance({
      urlBase: 'https://LINK.TO.DOMAIN/',
      siteId: 3, // optional, default value: `1`
    })

    const Component = () => {
      return (
        <MatomoProvider value={instance}>
          <JustAComponent />
        </MatomoProvider>
      )
    }
    expect(MatomoTracker).toHaveBeenCalled()

    const { getByTestId } = render(<Component />)
    expect(trackPageViewMock).toHaveBeenCalled()

    fireEvent.click(getByTestId('btn'))

    expect(trackEventMock).toHaveBeenCalledWith({
      category: 'sample-page',
      action: 'click-event',
    })
  })
})
