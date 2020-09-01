import React from 'react'
import ReactDOM from 'react-dom'
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import App from './App'

const instance = createInstance({
  urlBase: 'https://demo.matomo.org',
  siteId: 3, // optional, default value: `1`
  userId: 'UID76903202', // optional, default value: `undefined`.
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: {
    // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10, // optional, default value: `15
  },
  linkTracking: false, // optional, default value: true
  configurations: {
    // optional, default value: {}
    // any valid matomo configuration, all below are optional
    disableCookies: true,
    setSecureCookie: true,
    setRequestMethod: 'POST',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <MatomoProvider value={instance}>
      <App />
    </MatomoProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
