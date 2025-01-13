# Change Log

Here, you will find all notable changes that have been made to this project.

## 2.0.4 - 2025-01-13

- Salmonrun schedules now contain information about the current boss

## 2.0.3 - 2025-01-10

- The StagesResponse and AllStagesResponse objects now include either a single tricolor stage or an array of tricolor stages (@ntdoJanneck)

## 2.0.1 - 2024-06-30

- Fixed a bug, where Types were not exported correctly

## 2.0.0 - 2024-06-30

- Added TS definitions
- Rewrote the whole package in TS
- Tests now use historical data to ensure that splatfest functions work
- Salmonrun schedules and weapons are now provided in an array
- Splatnet gear is now provided in an array
- Removed `typ` attribute from SplatnetGear

## 1.6.4 - 2024-03-03

- .npmignore file to ignore test files
- Changed some weird articulation in the readme

## 1.6.3 - 2024-03-03

- Added optional caching (can configured in the options)
- Added `userAgent` option to set a custom user agent for the requests
- Added automated testing
- Unified fetch methods

## 1.6.2 - 2024-03-02

- New getRunningSplatfests method (Replacing getCurrentSplatfest)
- Added options parameter to the constructor (Only for testing purposes for now)
- Added additional keywords to readme
- getCurrentSplatfest is now deprecated and won't be supported in future versions
- Currentstages translation fixed
- Current/RunningSplatfests undefined translation fixed

## 1.6.0 - 2024-01-29

- All functions now also return a Promise
- Improved code readability and structure
- Split functions into multiple files

## 1.5.1 - 2024-01-16

- Differentiating between regular and challenge fest schedules
- Fixed feststages returning null even if there are rotations

## 1.5.0 - 2023-12-29

- Added JSDoc Comments for a better developer experience
- Removed unnecessary Code
- Removed old unused lang files
- Cleaned up Code
- Fixed typo (typ -> type)

## 1.4.9 - 2023-12-28

- Added Tricolor results to past splatfests

## 1.4.8 - 2023-12-28

- Fixed current Splatfests not returning anything

## 1.4.7 - 2023-12-28

- Fixed possible missing translations for Splatfests

## 1.4.6 - 2023-09-08

- Fixed Tricolor stage name bug

## 1.4.5 - 2023-07-17

- Added `getStages()` method to get all upcoming stages for each gamemode

## 1.4.4 - 2023-07-17

- Changed splatzones and towercontrol images

## 1.4.3 - 2023-07-16

- Added rules images to rotations
- Added Splatfest schedules
- Added Tricolor stage

## 1.4.2 - 2023-07-16

- Removed `getWeapons` method
- Fixed `getChallenges` timeout
- Removed unnecessary comments

## 1.4.1 - 2023-07-16

- Method to get current Splatfest
- Current and next stages now returns `null` if theres a Splatfest happening
- Fixed translation not loading fast enogh

## 1.4.0 - 2023-06-23

- Big Runs should work now but isn't tested yet
- Restructured Salmonrun data to add Big Runs
- Added weapons and stages to all Salmonruns
- Salmonruns now show up correctly

## 1.3.1 - 2023-06-04

- New method to get challenges
- Added many new Languages with new language codes (old codes still work)
- Changed language codes: [readme.md](./README.md#languages)
- Splatfest titles and team names now get translated
- Salmonrun schedule now doesn't get added if there is a Big Run

## 1.3.0 - 2023-06-03

- Support for new maps and weapons added with "Sizzle Season"

## 1.2.0 - 2023-03-13

- Support for new maps and weapons
- Minor Changes to the language files

## 1.1.7 - 2022-12-30

- Minor Changes to [readme.md](./README.md)

## 1.1.6 - 2022-12-30

- Added upcoming Splatfests
- Added past Splatfests
- Added Splatfests to [readme.md](./README.md)

## 1.1.5 - 2022-12-30

- Added Splatnet gear
- Added monthly salmonrun gear
- Added [CHANGELOG.md](./CHANGELOG.md)
- Added table of contents to [readme.md](./README.md)
- Added Splatnet gear to [readme.md](./README.md)
- Completed all translations with gear, power, brand and weapon names

## 1.1.4 - 2022-12-28

- Minor changes to [readme.md](./README.md)

## 1.1.3 - 2022-12-27

- Added badges to [readme.md](./README.md)
- Removed folder "new"

## 1.1.2 - 2022-12-27

- Added dutch translation
- Added french translation
- Added japanese translation
- Added spanish translation
- Added italian translation
- Added russian translation
- Minor changes to [readme.md](./README.md)

## 1.1.1 - 2022-12-13

- Minor changes to [readme.md](./README.md)

## 1.1.0 - 2022-12-13

- Support for new maps and weapons
- Added X-Battles
- Fixed salmonrun

## 1.0.4 - 2022-09-3

- Changed `node-fetch` Version

## 1.0.3 - 2022-09-3

- Minor changes to [readme.md](./README.md)

## 1.0.2 - 2022-09-2

- Minor changes to [readme.md](./README.md)

## 1.0.1 - 2022-09-2

- Minor changed to [readme.md](./README.md)

## 1.0.0 - 2022-09-2

- Current arenas
- Next arenas
- Salmonrun schedules
- German and english translation