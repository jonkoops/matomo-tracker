import MatomoTracker from '@datapunt/matomo-tracker-js'
import { fireEvent, render, renderHook } from '@testing-library/react'
import React from 'react'
import { mocked } from 'ts-jest/utils'
import createInstance from './instance'
import MatomoProvider from './MatomoProvider'
import useMatomo from './useMatomo'

jest.mock('@datapunt/matomo-tracker-js')

describe('useMatomo', () => {
  const JustAComponent = function () {
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
    const mockedMatomoTracker = mocked(MatomoTracker)
    mockedMatomoTracker.mockImplementation(
      () =>
        ({
          trackEvent: trackEventMock,
          trackPageView: trackPageViewMock,
        } as unknown as MatomoTracker),
    )

    const instance = createInstance({
      urlBase: 'https://LINK.TO.DOMAIN',
      siteId: 3,
    })

    const Component = function () {
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

  it('memoizes the methods between renders', () => {
    const instance = new MatomoTracker({
      urlBase: 'https://LINK.TO.DOMAIN',
      siteId: 3, // optional, default value: `1`
    })

    const { result, rerender } = renderHook(() => useMatomo(), {
      wrapper: ({ children }) => (
        <MatomoProvider value={instance}>{children}</MatomoProvider>
      ),
    })

    const originalMethods = result.current

    rerender()

    expect(Object.values(originalMethods)).toEqual(
      Object.values(result.current),
    )
  })
})
