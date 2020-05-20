import { defaultOptions, TRACK_TYPES } from './constants'
import {
  CustomDimension,
  TrackEventParams,
  TrackLinkParams,
  TrackPageViewParams,
  TrackParams,
  TrackSiteSearchParams,
  TrackEcommerceOrderParams,
  AddEcommerceItemParams,
  SetEcommerceViewParams,
  UserOptions,
} from './types'

class MatomoTracker {
  mutationObserver?: MutationObserver

  constructor(userOptions: UserOptions) {
    const options = { ...defaultOptions, ...userOptions }
    if (!options.urlBase) {
      throw new Error('Matomo urlBase is required.')
    }

    MatomoTracker.initialize(options)
  }

  // Initializes the Matomo Tracker
  static initialize({
    urlBase,
    siteId,
    trackerUrl,
    srcUrl,
    heartBeat,
    linkTracking = true,
  }: UserOptions) {
    if (urlBase[urlBase.length - 1] !== '/') {
      urlBase = urlBase + '/'
    }

    if (typeof window !== 'undefined') {
      window._paq = window._paq || []

      if (window._paq.length === 0) {
        window._paq.push([
          'setTrackerUrl',
          trackerUrl || `${urlBase}matomo.php`,
        ])
        window._paq.push(['setSiteId', siteId])

        // accurately measure the time spent on the last pageview of a visit
        if (!heartBeat || (heartBeat && heartBeat.active)) {
          this.enableHeartBeatTimer(15 || (heartBeat && heartBeat.seconds))
        }

        // // measure outbound links and downloads
        // // might not work accurately on SPAs because new links (dom elements) are created dynamically without a server-side page reload.
        this.enableLinkTracking(linkTracking)

        const doc = document
        const scriptElement = doc.createElement('script')
        const scripts = doc.getElementsByTagName('script')[0]

        scriptElement.type = 'text/javascript'
        scriptElement.async = true
        scriptElement.defer = true
        scriptElement.src = srcUrl || `${urlBase}matomo.js`

        if (scripts && scripts.parentNode) {
          scripts.parentNode.insertBefore(scriptElement, scripts)
        }
      }
    }
  }

  static enableHeartBeatTimer(seconds: number) {
    window._paq.push(['enableHeartBeatTimer', seconds])
  }

  static enableLinkTracking(active: boolean) {
    window._paq.push(['enableLinkTracking', active])
  }

  private trackEventsForElements(elements: HTMLElement[]) {
    if (elements.length) {
      elements.forEach((element) => {
        element.addEventListener('click', () => {
          const {
            matomoCategory,
            matomoAction,
            matomoName,
            matomoValue,
          } = element.dataset
          if (matomoCategory && matomoAction) {
            this.trackEvent({
              category: matomoCategory,
              action: matomoAction,
              name: matomoName,
              value: Number(matomoValue),
            })
          } else {
            throw new Error(
              `Error: data-matomo-category and data-matomo-action are required.`,
            )
          }
        })
      })
    }
  }

  // Tracks events based on data attributes
  trackEvents() {
    const matchString = '[data-matomo-event="click"]'
    let firstTime = false
    if (!this.mutationObserver) {
      firstTime = true
      this.mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          // Iterate over NodeList by indices (es15 does not allow using 'let node of mutation.addedNodes')
          mutation.addedNodes.forEach((node) => {
            // only track HTML elements
            if (!(node instanceof HTMLElement)) return

            // check the inserted element for being a code snippet
            if (node.matches(matchString)) {
              this.trackEventsForElements([node])
            }

            const elements = Array.from(
              node.querySelectorAll<HTMLElement>(matchString),
            )
            this.trackEventsForElements(elements)
          })
        }
      })
    }
    this.mutationObserver.observe(document, { childList: true, subtree: true })

    // Now track all already existing elements
    if (firstTime) {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(matchString),
      )
      this.trackEventsForElements(elements)
    }
  }

  stopObserving() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  }

  // Tracks events
  // https://matomo.org/docs/event-tracking/#tracking-events
  trackEvent({
    category,
    action,
    name,
    value,
    ...otherParams
  }: TrackEventParams) {
    if (category && action) {
      this.track({
        data: [TRACK_TYPES.TRACK_EVENT, category, action, name, value],
        ...otherParams,
      })
    } else {
      throw new Error(`Error: category and action are required.`)
    }
  }

  // Tracks site search
  // https://developer.matomo.org/guides/tracking-javascript-guide#internal-search-tracking
  trackSiteSearch({
    keyword,
    category,
    count,
    ...otherParams
  }: TrackSiteSearchParams) {
    if (keyword) {
      this.track({
        data: [TRACK_TYPES.TRACK_SEARCH, keyword, category, count],
        ...otherParams,
      })
    } else {
      throw new Error(`Error: keyword is required.`)
    }
  }

  // Tracks outgoing links to other sites and downloads
  // https://developer.matomo.org/guides/tracking-javascript-guide#enabling-download-outlink-tracking
  trackLink({ href, linkType = 'link' }: TrackLinkParams) {
    window._paq.push([TRACK_TYPES.TRACK_LINK, href, linkType])
  }

  // Tracks page views
  // https://developer.matomo.org/guides/spa-tracking#tracking-a-new-page-view
  trackPageView(params: TrackPageViewParams) {
    this.track({ data: [TRACK_TYPES.TRACK_VIEW], ...params })
  }

  // Adds a product to an Ecommerce order to be tracked via trackEcommerceOrder.
  // https://matomo.org/docs/ecommerce-analytics
  // https://matomo.org/docs/ecommerce-analytics/#1-addecommerceitemproductsku-productname-productcategory-price-quantity
  addEcommerceItem({
    sku,
    productName,
    productCategory,
    productPrice = 0.0,
    productQuantity = 1,
  }: AddEcommerceItemParams) {
    window._paq.push([
      'addEcommerceItem',
      sku,
      productName,
      productCategory,
      productPrice,
      productQuantity,
    ])
  }

  // Tracks an Ecommerce order containing items added via addEcommerceItem.
  // https://matomo.org/docs/ecommerce-analytics/#2-trackecommerceorderorderid-revenue-subtotal-tax-shipping-discount
  trackEcommerceOrder({
    orderId,
    orderRevenue,
    orderSubTotal,
    taxAmount,
    shippingAmount,
    discountOffered = false,
  }: TrackEcommerceOrderParams) {
    this.track({
      data: [
        TRACK_TYPES.TRACK_ECOMMERCE_ORDER,
        orderId,
        orderRevenue,
        orderSubTotal,
        taxAmount,
        shippingAmount,
        discountOffered,
      ],
    })
  }

  // Tracks updates to an Ecommerce Cart before an actual purchase.
  // This will replace currently tracked information of the cart. Always include all items of the updated cart!
  // https://matomo.org/docs/ecommerce-analytics/#example-tracking-an-ecommerce-cart-update-containing-two-products
  trackEcommerceCartUpdate(amount: number) {
    window._paq.push([TRACK_TYPES.TRACK_ECOMMERCE_CART_UPDATE, amount])
  }

  // Marks the next page view as an Ecommerce product page.
  // https://matomo.org/docs/ecommerce-analytics/#example-tracking-a-product-page-view
  setEcommerceView({
    sku,
    productName,
    productCategory,
    productPrice,
  }: SetEcommerceViewParams) {
    window._paq.push([
      'setEcommerceView',
      sku,
      productName,
      productCategory,
      productPrice,
    ])
  }

  // Marks the next tracked page view as an Ecommerce category page.
  // https://matomo.org/docs/ecommerce-analytics/#example-tracking-a-category-page-view
  setEcommerceCategoryView(productCategory: string) {
    this.setEcommerceView({ productCategory, productName: false, sku: false })
  }

  // Sends the tracked page/view/search to Matomo
  track({
    data = [],
    documentTitle = window.document.title,
    href = window.location.href,
    customDimensions = false,
  }: TrackParams) {
    if (data.length) {
      if (
        customDimensions &&
        Array.isArray(customDimensions) &&
        customDimensions.length
      ) {
        customDimensions.map((customDimension: CustomDimension) =>
          window._paq.push([
            'setCustomDimension',
            customDimension.id,
            customDimension.value,
          ]),
        )
      }

      window._paq.push(['setCustomUrl', href])
      window._paq.push(['setDocumentTitle', documentTitle])
      window._paq.push(data)
    }
  }
}

export default MatomoTracker
