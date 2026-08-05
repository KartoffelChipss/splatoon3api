Splatoon3api is a simple library to get the current and next Splatoon 3 Maps (rotations), Salmon Runs, Challenges, Splatfests and Splatnet gear. This package uses the data from [splatoon3.ink](https://splatoon3.ink/). Splatoon3api is available in 14 different languages ([List of available languages](#languages))

[![npm](https://img.shields.io/npm/dm/splatoon3api?label=Downloads)](https://www.npmjs.com/package/splatoon3api) [![npm](https://img.shields.io/npm/v/splatoon3api?label=Version)](https://www.npmjs.com/package/splatoon3api) [![Discord](https://discord.com/api/guilds/990295419005333554/widget.png)](https://strassburger.org/discord)

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
        - [Salmon Run](#salmon-run-schedules)
        - [Challenges](#challenges)
        - [Splatnet gear](#splatnet-gear)
    - [Splatfests](#splatfests)
        - [Currently running Splatfests](#currently-running-splatfest)
        - [Upcoming Splatfests](#scheduled-splatfests)
        - [Past Splatfests](#past-splatfests)

### Installation

Simply execute the following command in your commandline:

```
npm install splatoon3api
```

### Usage

```js
import { Client } from 'splatoon3api';

const splatoon3 = new Client();

const stages = await splatoon3.stages.getCurrent();
console.log(stages);
```

Every method returns a `Promise`, so you can use `await` or `.then()` to get the result.

### Languages

A `Client` isn't tied to a single language. Every fetch method takes an optional `{ lang }`, which falls back to the client's `defaultLang` (`"en-US"` unless configured otherwise) when omitted:

```js
const splatoon3 = new Client({ defaultLang: 'de-DE' });

const stagesDE = await splatoon3.stages.getCurrent(); // uses defaultLang: de-DE
const stagesEN = await splatoon3.stages.getCurrent({ lang: 'en-US' }); // one-off override
```

One `Client` is all you need even in a multi-language app. The underlying schedule/gear/festival data is cached once regardless of language, and each language's translation file is fetched once and reused across every call. You never need to create multiple clients just to serve multiple languages.

Supported values for `lang` / `defaultLang`:

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

You can tune splatoon3api to your liking by passing options to the `Client` constructor:

```js
const splatoon3 = new Client({
    defaultLang: 'en-GB',
    userAgent: 'MyApp/1.0 (contact@example.com)',
    cache: {
        enabled: true,
        ttl: 60,
    },
});
```

## Stages

### All Stages

To get 11 upcoming and the current stages for Turf War, Ranked, X Battle, and Splatfest, use `stages.getAll()`:

```js
const stages = await splatoon3.stages.getAll();
console.log(stages);
```

### Current Stages

To get the currently active Turf War, Ranked and X Battle maps, use `stages.getCurrent()`:

```js
const stages = await splatoon3.stages.getCurrent();
console.log(stages);
```

### Next Stages

To get the next Turf War, Ranked and X Battle maps, use `stages.getNext()`:

```js
const stages = await splatoon3.stages.getNext();
console.log(stages);
```

## Other

### Salmon Run Schedules

To get the current and next Salmon Run schedules, use `salmonRun.get()`:

```js
const salmonRun = await splatoon3.salmonRun.get();
console.log(salmonRun);
```

### Challenges

To get the current challenges, use `challenges.get()`:

```js
const challenges = await splatoon3.challenges.get();
console.log(challenges);
```

### Splatnet Gear

To get the currently available Splatnet gear, use `gear.get()`:

```js
const gear = await splatoon3.gear.get();
console.log(gear);
```

## Splatfests

#### Splatfests are divided into those four regions:

- **US:** The Americas, Australia, New Zealand
- **EU:** Europe
- **JP:** Japan
- **AP:** Hong Kong, South Korea (Asia/Pacific)

### Currently running Splatfest

To get the currently running Splatfest, use `splatfests.running()`:

```js
const running = await splatoon3.splatfests.running();
console.log(running);
```

Please note that the hex colors may differ a little from the real colors. If you want the most accurate colors, you should use the `color` (rgba) field instead of `colorHEX`.

### Scheduled Splatfests

To get scheduled Splatfests that are coming in the future, use `splatfests.upcoming()`:

```js
const upcoming = await splatoon3.splatfests.upcoming();
console.log(upcoming);
```

Note that upcoming Splatfest titles and team names come straight from Nintendo's per-region data rather than the translation file, so `lang`/`defaultLang` has no effect on this particular call.

### Past Splatfests

To get all past Splatfests, use `splatfests.past()`:

```js
const past = await splatoon3.splatfests.past();
console.log(past);
```
