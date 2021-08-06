import MatomoTracker from './MatomoTracker'
import { UserOptions } from './types'

const URL_BASE = 'https://example.com'

describe('MatomoTracker', () => {
  it('should build the window._paq correctly on initialisation', () => {
    window._paq = []
    // eslint-disable-next-line no-new
    new MatomoTracker({
      siteId: 1,
      urlBase: 'https://foo.bar',
      configurations: { setCustomDimension: [1, 'someValue'], foo: 'bar' },
    })
    expect(window._paq).toEqual([
      ['setTrackerUrl', 'https://foo.bar/matomo.php'],
      ['setSiteId', 1],
      ['setCustomDimension', 1, 'someValue'],
      ['foo', 'bar'],
      ['enableHeartBeatTimer', 15],
      ['enableLinkTracking', true],
    ])
  })

  it('throws an error if no urlBase is passed in options', () => {
    expect(() => new MatomoTracker({ siteId: 1 } as UserOptions)).toThrowError()
  })

  it('throws an error if no siteId is passed in options', () => {
    expect(
      () => new MatomoTracker({ urlBase: URL_BASE } as UserOptions),
    ).toThrowError()
  })

  describe('pushInstruction', () => {
    it('should push the instruction', () => {
      const matomo = new MatomoTracker({
        urlBase: URL_BASE,
        siteId: 1,
      })

      window._paq = []
      matomo.pushInstruction('foo', 'bar', 1)

      expect(window._paq).toEqual([['foo', 'bar', 1]])
    })
  })
})
