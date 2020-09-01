import MatomoTracker from './MatomoTracker'
import { UserOptions } from './types'

const URL_BASE = 'https://example.com'

describe('MatomoTracker', () => {
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
