import { createContext } from 'react'
import { MatomoInstance } from './types'

const MatomoContext = createContext<MatomoInstance | null>(null)

export default MatomoContext
