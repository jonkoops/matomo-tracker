import MatomoTracker from "./MatomoTracker"

const URL_BASE = 'https://example.com'

describe('MatomoTracker', () => {
  describe('pushInstruction', () => {
    it('should push the instruction', () => {
      const matomo = new MatomoTracker({
        urlBase: URL_BASE,
        siteId: 1
      })

      window._paq = []
      matomo.pushInstruction('foo', 'bar', 1)

      expect(window._paq).toEqual([['foo', 'bar', 1]])
    })
  })
})