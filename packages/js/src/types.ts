declare global {
  interface Window {
    _paq: any
    MatomoTracker: any
  }
}

export interface CustomDimension {
  id: number
  value: string
}

export interface TrackPageViewParams {
  documentTitle?: string
  href?: string | Location
  customDimensions?: boolean | CustomDimension[]
}

export interface TrackParams extends TrackPageViewParams {
  data: any
}

export interface TrackEventParams extends TrackPageViewParams {
  category: string
  action: string
  name?: string
  value?: number
}

export interface TrackLinkParams {
  href: string
  linkType?: 'download' | 'link'
}

export interface TrackSiteSearchParams extends TrackPageViewParams {
  keyword: string
  category?: string
  count?: number
}

export interface TrackEcommerceOrderParams {
  orderId: string
  orderRevenue: number
  orderSubTotal?: number
  taxAmount?: number
  shippingAmount?: number
  discountOffered?: boolean
}

export interface AddEcommerceItemParams {
  sku: string
  productName?: string
  productCategory?: string
  productPrice?: number
  productQuantity?: number
}

export interface SetEcommerceViewParams {
  sku: string | boolean
  productName?: string | boolean
  productCategory?: string
  productPrice?: number
}
