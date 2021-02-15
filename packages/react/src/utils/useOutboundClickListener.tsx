import { useEffect } from 'react'
import { MatomoInstance } from '../types'

const useOutboundClickListener = (matomoInstance: MatomoInstance): void => {
  const handleOutboundClick = (event: MouseEvent) => {
    const { target } = event

    if (!(target instanceof HTMLAnchorElement)) {
      return
    }

    const { href } = target

    // Check if the click target differs from the current hostname, meaning it's external
    if (
      // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
      !href.match(
        new RegExp(
          `^(http://www.|https://www.|http://|https://)+(${window.location.hostname})`,
        ),
      )
    ) {
      matomoInstance.trackLink({ href })
    }
  }

  useEffect(() => {
    window.document.addEventListener('click', handleOutboundClick, {
      capture: true,
    })

    return () =>
      window.document.removeEventListener('click', handleOutboundClick, {
        capture: true,
      })
  }, [])
}

export default useOutboundClickListener
