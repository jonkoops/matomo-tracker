import React from 'react'
import { MatomoInstance } from './types'
import MatomoContext from './MatomoContext'

type Props = {
  children: React.ReactNode
  value: MatomoInstance
}

const MatomoProvider: React.FC<Props> = ({ children, value }) => {
  const Context = MatomoContext

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default MatomoProvider
