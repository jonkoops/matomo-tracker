# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Prefix the change with one of these keywords:

- _Added_: for new features.
- _Changed_: for changes in existing functionality.
- _Deprecated_: for soon-to-be removed features.
- _Removed_: for now removed features.
- _Fixed_: for any bug fixes.
- _Security_: in case of vulnerabilities.

## [0.5.0]

- Added: `removeEcommerceItem` and `clearEcommerceCart` action

## [0.4.0]

- Added: Support React v17

## [0.3.1]

- Fixed: External links not being tracked

## [0.3.0]

- Changed: methods returned from `useMatomo` are now memoized so they can be tracked as dependencies (for example in `useEffect`)
- **[BREAKING]** Changed: The `siteId` option in the `MatomoTracker` constructor is now required.

## [0.2.1]

- Fixed: The `params` argument for the `trackPageView` method is now optional
- Fixed: The `pushInstruction` method is now exposed through `useMatomo`

## [0.2.0]

- Added: include `configurations` in the `MatomoTracker.initialize` params
- Added: add a generic `pushInstruction` method to pass instructions to Matomo
- Added: add `disabled` flag to options to make all tracking calls no-ops
- Removed: removed the `window.MatomoTracker` global
- Fixed: enableHeartBeat always set default seconds value

## [0.1.5]

- Added: [Exposed trackEvents function to useMatomo](https://github.com/Amsterdam/matomo-tracker/commit/79e96929c3fcde56434ec3ad82f24cb77d4225fd#diff-7f21e527da19e9a710bdcbb9a5387cbe)
- Changed: [TrackEvents on DOM changes using a MutationObserver](https://github.com/Amsterdam/matomo-tracker/issues/160)
- Added: [include `userId` in the `MatomoTracker.initialize` params](https://github.com/Amsterdam/matomo-tracker/pull/173)

## [0.1.4]

- [Add e-commerce tracking](https://github.com/Amsterdam/matomo-tracker/commit/0d51406c52760c0750c08e053cad190cf838e7b3)
- [Expose trackLink in react package](https://github.com/Amsterdam/matomo-tracker/commit/46987f87a22ca64eb81a22b304989808a0d544e8)
- [Check on window object (no reference error during SSR)](https://github.com/Amsterdam/matomo-tracker/commit/66f79e650472a169357066fb10286b9d85160bec)
