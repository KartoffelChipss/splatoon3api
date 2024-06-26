# Change Log

Here, you will find all notabled changes that have been made to this project.

## 2.0.1 - 2024-06-30

### Added

### Changed

### Fixed
- Fixed a bug, where Types were not exported correctly

## 2.0.0 - 2024-06-30

### Added
- Added TS definitions

### Changed
- Rewrote the whole package in TS
- Tests now use historical data to ensure that splatfest functions work
- Salmonrun schedules and weapons are now provided in an array
- Splatnet gear is now provided in an array
- Removed `typ` attribute from SplatnetGear

### Fixed

---

## 1.6.4 - 2024-03-03

### Added
- .npmignore file to ignore test files

### Changed
- Changed some weird articulation in the readme

### Fixed

---

## 1.6.3 - 2024-03-03

### Added
- Added optional caching (can configured in the options)
- Added `userAgent` option to set a custom user agent for the requests
- Added automated testing

### Changed
- Unified fetch methods

### Fixed

---

## 1.6.2 - 2024-03-02

### Added
- New getRunningSplatfests method (Replacing getCurrentSplatfest)
- Added options parameter to the constructor (Only for testing purposes for now)
- Added additional keywords to readme

### Changed
- getCurrentSplatfest is now deprecated and won't be supported in future versions

### Fixed
- Currentstages translation fixed
- Current/RunningSplatfests undefined translation fixed

---

## 1.6.0 - 2024-01-29

### Added
- All functions now also return a Promise

### Changed
- Improved code readability and structure
- Split functions into multiple files

### Fixed

---

## 1.5.1 - 2024-01-16

### Added
- Differentiating between regular and challenge fest schedules

### Changed

### Fixed
- Fixed feststages returning null even if there are rotations

---

## 1.5.0 - 2023-12-29

### Added
- Added JSDoc Comments for a better developer experience

### Changed

### Fixed
- Removed unnecessary Code
- Removed old unused lang files
- Cleaned up Code
- Fixed typo (typ -> type)

---

## 1.4.9 - 2023-12-28

### Added
- Added Tricolor results to past splatfests

### Changed

### Fixed

---

## 1.4.8 - 2023-12-28

### Added

### Changed

### Fixed
- Fixed current Splatfests not returning anything

---

## 1.4.7 - 2023-12-28

### Added

### Changed

### Fixed
- Fixed possible missing translations for Splatfests

---

## 1.4.6 - 2023-09-08

### Added

### Changed

### Fixed
- Fixed Tricolor stage name bug

---

## 1.4.5 - 2023-07-17

### Added
- Added `getStages()` method to get all upcoming stages for each gamemode

### Changed

### Fixed

---

## 1.4.4 - 2023-07-17

### Added

### Changed
- Changed splatzones and towercontrol images

### Fixed

---

## 1.4.3 - 2023-07-16

### Added
- Added rules images to rotations
- Added Splatfest schedules
- Added Tricolor stage

### Changed

### Fixed

---

## 1.4.2 - 2023-07-16

### Added

### Changed
- Removed `getWeapons` method

### Fixed
- Fixed `getChallenges` timeout
- Removed unnecessary comments

---

## 1.4.1 - 2023-07-16

### Added
- Method to get current Splatfest

### Changed
- Current and next stages now returns `null` if theres a Splatfest happening

### Fixed
- Fixed translation not loading fast enogh

---

## 1.4.0 - 2023-06-23

```diff
! If your app uses Data for Salmonruns, you will have to update your code!
```

### Added
- Big Runs should work now but isn't tested yet

### Changed
- Restructured Salmonrun data to add Big Runs
- Added weapons and stages to all Salmonruns

### Fixed
- Salmonruns now show up correctly

---

## 1.3.1 - 2023-06-04

### Added
- New method to get challenges
- Added many new Languages with new language codes (old codes still work)

### Changed
- Changed language codes: [readme.md](./README.md#languages)

### Fixed
- Splatfest titles and team names now get translated
- Salmonrun schedule now doesn't get added if there is a Big Run

---

## 1.3.0 - 2023-06-03

### Added
- Support for new maps and weapons added with "Sizzle Season"

### Changed

### Fixed

---

## 1.2.0 - 2023-03-13

### Added
- Support for new maps and weapons

### Changed
- Minor Changes to the language files

### Fixed

---

## 1.1.7 - 2022-12-30

### Added

### Changed
- Minor Changes to [readme.md](./README.md)

### Fixed

---

## 1.1.6 - 2022-12-30

### Added
- Added upcoming Splatfests
- Added past Splatfests

### Changed
- Added Splatfests to [readme.md](./README.md)

### Fixed

---

## 1.1.5 - 2022-12-30

### Added
- Added Splatnet gear
- Added monthly salmonrun gear
- Added [CHANGELOG.md](./CHANGELOG.md)
- Added table of contents to [readme.md](./README.md)

### Changed
- Added Splatnet gear to [readme.md](./README.md)
- Completed all translations with gear, power, brand and weapon names

### Fixed

---

## 1.1.4 - 2022-12-28

### Added

### Changed
- Minor changes to [readme.md](./README.md)

### Fixed

---

## 1.1.3 - 2022-12-27

### Added
- Added badges to [readme.md](./README.md)

### Changed
- Removed folder "new"

### Fixed

---

## 1.1.2 - 2022-12-27

### Added
- Added dutch translation
- Added french translation
- Added japanese translation
- Added spanish translation
- Added italian translation
- Added russian translation

### Changed
- Minor changes to [readme.md](./README.md)

### Fixed

---

## 1.1.1 - 2022-12-13

### Added

### Changed
- Minor changes to [readme.md](./README.md)

### Fixed

---

## 1.1.0 - 2022-12-13

### Added
- Support for new maps and weapons
- Added X-Battles

### Changed

### Fixed
- Fixed salmonrun

---

## 1.0.4 - 2022-09-3

### Added

### Changed
- Changed `node-fetch` Version

### Fixed

---

## 1.0.3 - 2022-09-3

### Added

### Changed
- Minor changes to [readme.md](./README.md)

### Fixed

---

## 1.0.2 - 2022-09-2

### Added

### Changed
- Minor changes to [readme.md](./README.md)

### Fixed

---

## 1.0.1 - 2022-09-2

### Added

### Changed
- Minor changed to [readme.md](./README.md)

### Fixed

---

## 1.0.0 - 2022-09-2

### Added
- Current arenas
- Next arenas
- Salmonrun schedules
- German and english translation

### Changed

### Fixed