# Splatoon3api

Splatoon3api is a simple library to get the current and next Splatoon 3 Maps (rotations), Salmonruns, Challenges, Splatfests and Splatnet gear. This package uses the data from [splatoon3.ink](https://splatoon3.ink/). Splatoon3api is available in 14 different languages ([List of available languages](#languages))

[![npm](https://img.shields.io/npm/dm/splatoon3api?label=Downloads)](https://www.npmjs.com/package/splatoon3api) [![npm](https://img.shields.io/npm/v/splatoon3api?label=Version)](https://www.npmjs.com/package/splatoon3api) [![discord](https://dcbadge.vercel.app/api/server/Cc76tYwXvy?style=flat&theme=default-inverted)](https://discord.com/invite/Cc76tYwXvy)

If you have trouble with this package, feel free to ask me in my [Discord](https://discord.com/invite/Cc76tYwXvy).

## Table of contents

 - [Installation](#installation)
 - [Usage](#usage)
    - [Languages](#languages)
    - [Options](#options)
    - [Stages](#stages)
      - [All Stages](#all-stages)
      - [Current stages](#current-stages)
      - [Next stages](#next-stages)
    - [Other](#other)
        - [Salmonrun](#salmonrun-schedules)
        - [Challenges](#challenges)
        - [Splatnet gear](#splatnet-gear)
    - [Splatfests](#splatfests)
      - [Currently running Splatfests](#currently-running-splatfest)
      - [Upcoming Splatfests](#scheduled-splatfests)
      - [Past Splatfests](#past-splatfests)
- [Change Log](#change-log)

### Installation

Simply execute the following command in your commandline:

```
npm install splatoon3api
```

### Usage

Import the package like this:

```js
import splatoon3api from "splatoon3api";
const Splatoon3 = new splatoon3api.Client("en-US");
```

or this:

```js
const splatoon3api = require("splatoon3api");
const Splatoon3 = new splatoon3api.Client("en-US");
```

### Languages
You can exchange `en-US` for any other language in the list below:
- `en-US` - English (US)
- `en-GB` - English (GB)
- `de-DE` - Deutsch
- `nl-NL` - Nederlands
- `fr-FR` - Français (FR)
- `fr-CA` - Français (CA)
- `es-ES` - Español (ES)
- `es-MX` - Español (MX)
- `it-IT` - Italiano
- `ru-RU` - Русский
- `ja-JP` - 日本語
- `ko-KR` - 한국어
- `zh-CN` - 中文(简体)
- `zh-TW` - 中文(台灣)

### Options

You can change the options to tune splatoon3api to your liking:

```js
const Splatoon3 = new splatoon3api.Client("en-GB");
Splatoon3.options.userAgent = "MyApp/1.0 (contact@example.com)";
Splatoon3.options.cache = {
   enabled: true,
   ttl: 60,
}
```

Once you have done this, you can use all the following functions as you like.

## Stages

### All Stages

To get 11 upcoming and the current stages for Turf War, Ranked, XBattle, and Splatfest, you can use the `getStages()` function:

```js
Splatoon3.getStages(res => {
    console.log(res);
});
```

### Current Stages

To get the current Turf War and Ranked maps, you can use the `getCurrentStages()` function:

```js
Splatoon3.getCurrentStages(res => {
    console.log(res);
});
```

### Next Stages

To get the next Turf War and Ranked maps, you can use the `getNextStages()` function:

```js
Splatoon3.getNextStages(res => {
    console.log(res);
});
```

## Other

### Salmonrun Schedules

To get the current and next Salmonruns, you can use the `getSalmonRun()` function:

```js
Splatoon3.getSalmonRun(res => {
    console.log(res);
});
```

### Challenges

To get the current Challenges, you can use the `getChallenges()` function:

```js
Splatoon3.getChallenges(res => {
    console.log(res);
});
```

### Splatnet Gear

To get the currently available Splatnet gear, you can use the `getSplatnetGear()` function:

```js
Splatoon3.getSplatnetGear(res => {
    console.log(res);
});
```

## Splatfests

#### Splatfests are divided into those four regions:
- **US:** The Americas, Australia, New Zealand
- **EU:** Europe
- **JP:** Japan
- **AP:** Hong Kong, South Korea (Asia/Pacific)

### Currently running Splatfest

To get the currenttly running Splatfest, you can use the `getRunningSplatfests()` function:

```js
Splatoon3.getRunningSplatfests(res => {
    console.log(res);
});
```

Please note that the hexcolors may differ a little from the real colors. If you want the most accurate colors, you should use RGBA.

### Scheduled Splatfests

To get scheduled Splatfest, that are coming in the future, you can use the `getUpcomingSplatfests()` function:

```js
Splatoon3.getUpcomingSplatfests(res => {
    console.log(res);
});
```

### Past Splatfests

To get all past Splatfests, you can use the `getPastSplatfests()` function:

```js
Splatoon3.getPastSplatfests(res => {
    console.log(res);
});
```

## Change Log

You can find the Changelog in [CHANGELOG.md](./CHANGELOG.md).
