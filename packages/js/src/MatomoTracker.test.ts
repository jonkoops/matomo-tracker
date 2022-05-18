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

  describe('delay enabling tracking', () => {
    it('should allow to delay enabling tracking', () => {
      window._paq = []

      const fakeScriptElement = {} as HTMLScriptElement

      const createElementSpy = jest
        .spyOn(document, 'createElement')
        .mockReturnValue(fakeScriptElement)

      const matomo = new MatomoTracker({
        disabled: true,
        siteId: 1,
        urlBase: 'https://foo.bar',
        configurations: { setCustomDimension: [1, 'someValue'], foo: 'bar' },
      })

      expect(window._paq).toEqual([])
      expect(createElementSpy).not.toHaveBeenCalled()

      matomo.enableTracking()

      expect(window._paq).toEqual([
        ['setTrackerUrl', 'https://foo.bar/matomo.php'],
        ['setSiteId', 1],
        ['setCustomDimension', 1, 'someValue'],
        ['foo', 'bar'],
        ['enableHeartBeatTimer', 15],
        ['enableLinkTracking', true],
      ])

      expect(createElementSpy).toHaveBeenCalledWith('script')

      expect(fakeScriptElement).toEqual({
        type: 'text/javascript',
        async: true,
        defer: true,
        src: 'https://foo.bar/matomo.js',
      })
    })
  })
})
