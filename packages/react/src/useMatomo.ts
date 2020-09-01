import React from 'react'
import MatomoContext from './MatomoContext'
import { MatomoInstance } from './types'
import useOutboundClickListener from './utils/useOutboundClickListener'

function useMatomo(): MatomoInstance & { enableLinkTracking: () => void } {
  const instance = React.useContext(MatomoContext)

  if (!instance) {
    throw Error('Something went wrong')
  }

  const enableLinkTracking = () => useOutboundClickListener(instance)

  return {
    ...instance,
    enableLinkTracking,
  }
}

export default useMatomo
