import React from 'react'
import MatomoContext from './MatomoContext'
import { MatomoInstance } from './types'

export interface MatomoProviderProps {
  value: MatomoInstance,
  children: React.ReactNode
}

const MatomoProvider: React.FC<MatomoProviderProps> = function ({
  children,
  value,
}) {
  const Context = MatomoContext

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default MatomoProvider
