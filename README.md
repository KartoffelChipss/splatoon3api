# Splatoon3api
Splatoon3api is a simple library to get the current and next Splatoon 3 Maps (rotations), Salmonruns, Challenges, Splatfests and Splatnet gear. This package uses the data from [splatoon3.ink](https://splatoon3.ink/). Splatoon3api is available in eight different languages ([List of available languages](#languages))

[![npm](https://img.shields.io/npm/dm/splatoon3api?label=Downloads)](https://www.npmjs.com/package/splatoon3api) [![npm](https://img.shields.io/npm/v/splatoon3api?label=Version)](https://www.npmjs.com/package/splatoon3api) [![Discord](https://img.shields.io/discord/990295419005333554?color=%23738ADB&label=Discord)](https://discord.com/invite/Cc76tYwXvy)

If you have trouble with this package, feel free to ask me in my [Discord](https://discord.com/invite/Cc76tYwXvy).

If you would like to support the development of this package, please consider buying me a tea!

<a href="https://www.buymeacoffee.com/kartoffelchips"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a tea&emoji=🍵&slug=kartoffelchips&button_colour=40DCA5&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" height="38px"/></a>

## Table of contents
 - [Installation](#installation)
 - [Usage](#usage)
    - [Languages](#languages)
    - [Stages](#all-stages)
      - [All Stages](#all-stages)
      - [Current stages](#current-stages)
      - [Next stages](#next-stages)
    - [Salmonrun](#salmonrun-schedules)
    - [Challenges](#challenges)
    - [Splatnet gear](#splatnet-gear)
    - [Splatfests](#splatfests)
      - [Current Splatfests](#current-splatfest)
      - [Upcoming Splatfests](#scheduled-splatfests)
      - [Past Splatfests](#past-splatfests)
- [Change Log](#change-log)

### Installation
Simply execute the following command in your commandline:
```
npm install splatoon3api
```
### Usage
First, import the package like this:
```js
const splatoon3api = require("splatoon3api");
const Splatoon3 = new splatoon3api.Client("en-GB");
```

### Languages
You can exchange the `en-GB` for any other language in the list below:
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

Once you have done this, you can use all the following functions as you like.

---

### All Stages
To get 11 upcoming and the current stages for Turf War, Ranked, XBattle, and Splatfest, you can use the `getStages()` function:
```js
Splatoon3.getStages(res => {
  console.log(res);
});
```
It should return something like this:
```js
{
  regular: [
    {
      start_time: '2023-07-26T06:00:00Z',
      end_time: '2023-07-26T08:00:00Z',
      stage1: {
         name: 'Scorch Gorge',
         image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/35f9ca08ccc2bf759774ab2cb886567c117b9287875ca92fb590c1294ddcdc1e_1.png'
      },
      stage2: {
         name: 'Wahoo World',
         image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution61ea801fa4ed32360dcaf83986222ded46a72dbf56194acc6d0cf4659a92ba85_1.png'
      },
      rules: 'Turf War',
      rulesImg: 'https://splatoon3.ink/assets/regular.81d2e9e4.svg'
    },
    {
      start_time: '2023-07-26T08:00:00Z',
      end_time: '2023-07-26T10:00:00Z',
      stage1: [Object],
      stage2: [Object],
      rules: 'Turf War',
      rulesImg: 'https://splatoon3.ink/assets/regular.81d2e9e4.svg'
    },
    {
      start_time: '2023-07-26T10:00:00Z',
      end_time: '2023-07-26T12:00:00Z',
      stage1: [Object],
      stage2: [Object],
      rules: 'Turf War',
      rulesImg: 'https://splatoon3.ink/assets/regular.81d2e9e4.svg'
    },
    [Object],
    [Object],
    [Object],
    [Object],
    [Object],
    [Object],
    [Object],
    [Object],
    [Object]
  ],
  ranked: [
    { 
      series: {
         start_time: '2022-10-02T16:00:00Z',
         end_time: '2022-10-02T18:00:00Z',
         stage1: {
            name: 'Scorch Gorge',
            image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/35f9ca08ccc2bf759774ab2cb886567c117b9287875ca92fb590c1294ddcdc1e_1.png'
         },
         stage2: {
            name: 'Wahoo World',
            image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/61ea801fa4ed32360dcaf83986222ded46a72dbf56194acc6d0cf4659a92ba85_1.png'
         },
         rules: 'Splat Zones',
         rulesImg: 'here would mormally be the image url but I currently can\'t be fucked finding the right url sry'
      },
      open: {
         start_time: '2022-10-02T16:00:00Z',
         end_time: '2022-10-02T18:00:00Z',
         stage1: {
            name: 'Undertow Spillway',
            image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/9b1c17b2075479d0397d2fb96efbc6fa3a28900712920e5fe1e9dfc59c6abc5c_1.png'
         },
         stage2: {
            name: 'Mahi-Mahi Resort',
            image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/8273118c1ffe1bf6fe031c7d8c9795dab52632c9b76e8e9f01f644ac5ae0ccc0_1.png'
         },
         rules: 'Rainmaker',
         rulesImg: 'here would mormally be the image url but I currently can\'t be fucked finding the right url sry'
      }
   },
    { series: [Object], open: [Object] },
    { series: [Object], open: [Object] },
    { series: [Object], open: [Object] },
    { series: [Object], open: [Object] },
    { series: [Object], open: [Object] },
    { series: [Object], open: [Object] },
    { series: [Object], open: [Object] },
    { series: [Object], open: [Object] },
    { series: [Object], open: [Object] },
    { series: [Object], open: [Object] },
    { series: [Object], open: [Object] }
  ],
  xbattle: [
    {
      start_time: '2023-07-26T06:00:00Z',
      end_time: '2023-07-26T08:00:00Z',
      stage1: {
         name: 'Scorch Gorge',
         image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/35f9ca08ccc2bf759774ab2cb886567c117b9287875ca92fb590c1294ddcdc1e_1.png'
      },
      stage2: {
         name: 'Wahoo World',
         image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/61ea801fa4ed32360dcaf83986222ded46a72dbf56194acc6d0cf4659a92ba85_1.png'
      },
      rules: 'Tower Control',
      rulesImg: 'https://splatoon3.ink/assets/yagura.3d64cf2c.svg'
    },
    {
      start_time: '2023-07-26T08:00:00Z',
      end_time: '2023-07-26T10:00:00Z',
      stage1: [Object],
      stage2: [Object],
      rules: 'Splat Zones',
      rulesImg: 'https://splatoon3.ink/assets/area.02968ae6.svg'
    },
    {
      start_time: '2023-07-26T10:00:00Z',
      end_time: '2023-07-26T12:00:00Z',
      stage1: [Object],
      stage2: [Object],
      rules: 'Rainmaker',
      rulesImg: 'https://splatoon3.ink/assets/hoko.e3dce940.svg'
    },
    [Object],
    [Object],
    [Object],
    [Object],
    [Object],
    [Object],
    [Object],
    [Object],
    [Object]
  ],
  festSchedule: [
    null, null, null,
    null, null, null,
    null, null, null,
    null, null, null
  ],
  triColorStage: null
}
```

If a certain schedule is not available (e.g. regular schedules during a splatfest), it returns `null`.

---

### Current Stages
To get the current Turf War and Ranked maps, you can use the `getCurrentStages()` function:
```js
Splatoon3.getCurrentStages(res => {
  console.log(res);
});
```
It should return something like this:
```js
{
  regular: {
    start_time: '2022-10-02T16:00:00Z',
    end_time: '2022-10-02T18:00:00Z',
    stage1: {
      name: 'Hagglefish Market',
      image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/8dc2f16d39c630bab40cead5b2485ca3559e829d0d3de0c2232c7a62fefb5fa9_1.png'
    },
    stage2: {
      name: 'Sturgeon Shipyard',
      image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/48684c69d5c5a4ffaf16b712a4895545a8d01196115d514fc878ce99863bb3e9_1.png'
    },
    rules: 'Turf War',
   rulesImg: 'https://splatoon3.ink/assets/regular.81d2e9e4.svg'
  },
  ranked: {
    series: {
      start_time: '2022-10-02T16:00:00Z',
      end_time: '2022-10-02T18:00:00Z',
      stage1: {
          name: 'Scorch Gorge',
          image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/35f9ca08ccc2bf759774ab2cb886567c117b9287875ca92fb590c1294ddcdc1e_1.png'
      },
      stage2: {
          name: 'Wahoo World',
          image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/61ea801fa4ed32360dcaf83986222ded46a72dbf56194acc6d0cf4659a92ba85_1.png'
      },
      rules: 'Splat Zones',
      rulesImg: 'here would mormally be the image url but I currently can\'t be fucked finding the right url sry'
    },
    open: {
      start_time: '2022-10-02T16:00:00Z',
      end_time: '2022-10-02T18:00:00Z',
      stage1: {
          name: 'Undertow Spillway',
          image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/9b1c17b2075479d0397d2fb96efbc6fa3a28900712920e5fe1e9dfc59c6abc5c_1.png'
      },
      stage2: {
          name: 'Mahi-Mahi Resort',
          image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/8273118c1ffe1bf6fe031c7d8c9795dab52632c9b76e8e9f01f644ac5ae0ccc0_1.png'
      },
      rules: 'Rainmaker',
      rulesImg: 'here would mormally be the image url but I currently can\'t be fucked finding the right url sry'
    }
  },
  xbattle: {
    start_time: '2022-12-13T18:00:00Z',
    end_time: '2022-12-13T20:00:00Z',
    stage1: {
      name: 'Undertow Spillway',
      image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/9b1c17b2075479d0397d2fb96efbc6fa3a28900712920e5fe1e9dfc59c6abc5c_1.png'
    },
    stage2: {
      name: 'Wahoo World',
      image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/61ea801fa4ed32360dcaf83986222ded46a72dbf56194acc6d0cf4659a92ba85_1.png'
    },
    rules: 'Rainmaker',
   rulesImg: 'here would mormally be the image url but I currently can\'t be fucked finding the right url sry'
  },
  festSchedule: {
    start_time: '2023-07-16T18:00:00Z',
    end_time: '2023-07-16T20:00:00Z',
    stage1: {
      name: 'Kusaya-Quellen',
      image: 'https://splatoon3.ink/assets/splatnet/v1/stage_img/icon/low_resolution/cd84d711b47a424334569ac20f33f8e0ab6a652dc07854dcd36508a0081e9034_1.png'
    },
    stage2: {
      name: 'Pinakoithek',
      image: 'https://splatoon3.ink/assets/splatnet/v1/stage_img/icon/low_resolution/b9d8cfa186d197a27e075600a107c99d9e21646d116730f0843e0fff0aaba7dd_1.png'
    },
    rules: 'Turf War',
   rulesImg: 'https://splatoon3.ink/assets/regular.81d2e9e4.svg'
  },
  triColorStage: {
    start_time: '2023-07-15T00:00:00Z',
    end_time: '2023-07-17T00:00:00Z',
    name: 'Barnacle & Dime',
    image: 'https://splatoon3.ink/assets/splatnet/v1/stage_img/icon/high_resolution/f70e9f5af477a39ccfab631bfb81c9e2cedb4cd0947fe260847c214a6d23695f_0.png',
    rulesImg: "https://file.strassburger.org/tricolor.svg",
  }
}
```

If a certain schedule is not available (e.g. regular schedules during a splatfest), it returns `null`.

---

### Next Stages

To get the next Turf War and Ranked maps, you can use the `getNextStages()` function:
```js
Splatoon3.getNextStages(res => {
  console.log(res);
});
```
It should return something like this:
```js
{
  regular: {
    start_time: '2022-10-02T18:00:00Z',
    end_time: '2022-10-02T20:00:00Z',
    stage1: {
      name: 'Eeltail Alley',
      image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/898e1ae6c737a9d44552c7c81f9b710676492681525c514eadc68a6780aa52af_1.png'
    },
    stage2: {
      name: 'Wahoo World',
      image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/61ea801fa4ed32360dcaf83986222ded46a72dbf56194acc6d0cf4659a92ba85_1.png'
    },
    rules: 'Turf War',
    rulesImg: 'https://splatoon3.ink/assets/regular.81d2e9e4.svg'
  },
  ranked: {
    series: {
      start_time: '2022-10-02T18:00:00Z',
      end_time: '2022-10-02T20:00:00Z',
      stage1: {
          name: 'Mahi-Mahi Resort',
          image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/8273118c1ffe1bf6fe031c7d8c9795dab52632c9b76e8e9f01f644ac5ae0ccc0_1.png'
      },
      stage2: {
          name: 'MakoMart',
          image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/a8ba96c3dbd015b7bc6ea4fa067245c4e9aee62b6696cb41e02d35139dd21fe7_1.png'
      },
      rules: 'Tower Control',
      rulesImg: 'here would mormally be the image url but I currently can\'t be fucked finding the right url sry'
    },
    open: {
      start_time: '2022-10-02T18:00:00Z',
      end_time: '2022-10-02T20:00:00Z',
      stage1: {
          name: 'Scorch Gorge',
          image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/35f9ca08ccc2bf759774ab2cb886567c117b9287875ca92fb590c1294ddcdc1e_1.png'
      },
      stage2: {
          name: 'Sturgeon Shipyard',
          image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/48684c69d5c5a4ffaf16b712a4895545a8d01196115d514fc878ce99863bb3e9_1.png'
      },
      rules: 'Clam Blitz',
      rulesImg: 'here would mormally be the image url but I currently can\'t be fucked finding the right url sry'
    }
  },
  xbattle: {
    start_time: '2022-12-13T20:00:00Z',
    end_time: '2022-12-13T22:00:00Z',
    stage1: {
      name: 'Mahi-Mahi Resort',
      image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/8273118c1ffe1bf6fe031c7d8c9795dab52632c9b76e8e9f01f644ac5ae0ccc0_1.png'
    },
    stage2: {
      name: 'Inkblot Art Academy',
      image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/low_resolution/40aba8b36a9439e2d670fde5b3478819ea8a94f9e503b9d783248a5716786f35_1.png'
    },
    rules: 'Clam Blitz',
    rulesImg: 'here would mormally be the image url but I currently can\'t be fucked finding the right url sry'
  },
  festSchedule: {
    start_time: '2023-07-16T22:00:00Z',
    end_time: '2023-07-17T00:00:00Z',
    stage1: {
      name: 'Hagglefish Market',
      image: 'https://splatoon3.ink/assets/splatnet/v1/stage_img/icon/low_resolution/8dc2f16d39c630bab40cead5b2485ca3559e829d0d3de0c2232c7a62fefb5fa9_1.png'
    },
    stage2: {
      name: 'Wahoo World',
      image: 'https://splatoon3.ink/assets/splatnet/v1/stage_img/icon/low_resolution/61ea801fa4ed32360dcaf83986222ded46a72dbf56194acc6d0cf4659a92ba85_1.png'
    },
    rules: 'Turf War',
    rulesImg: 'https://splatoon3.ink/assets/regular.81d2e9e4.svg'
  },
  triColorStage: {
    start_time: '2023-07-15T00:00:00Z',
    end_time: '2023-07-17T00:00:00Z',
    name: 'Barnacle & Dime',
    image: 'https://splatoon3.ink/assets/splatnet/v1/stage_img/icon/high_resolution/f70e9f5af477a39ccfab631bfb81c9e2cedb4cd0947fe260847c214a6d23695f_0.png',
    rulesImg: "https://file.strassburger.org/tricolor.svg",
  }
}
```

If a certain schedule is not available (e.g. regular schedules during a splatfest), it returns `null`.

---

### Salmonrun Schedules
To get the current and next Salmonruns, you can use the ``getSalmonRun()`` function:
```js
Splatoon3.getSalmonRun(res => {
    console.log(res);
});
```
It should return something like this:
```js
{
   regularSchedules: {
      '0': {
         start_time: '2023-06-22T00:00:00Z',
         end_time: '2023-06-23T16:00:00Z',
         stage: {
            name: 'Salmoniden-Damm',
            image: 'https://splatoon3.ink/assets/splatnet/v1/stage_img/icon/high_resolution/be584c7c7f547b8cbac318617f646680541f88071bc71db73cd461eb3ea6326e_0.png'
         },
         weapons: {
            '0': {
               name: 'L3 Tintenwerfer',
               image: 'https://splatoon3.ink/assets/splatnet/v1/weapon_illust/96833fc0f74242cd2bc73b241aab8a00d499ce9f6557722ef6503e12af8979f4_0.png'
            },
            '1': {
               name: 'Kosmo-Kleckser',
               image: 'https://splatoon3.ink/assets/splatnet/v1/weapon_illust/8034dd1acde77c1a2df32197c12faa5ba1d65b43d008edd1b40f16fa8d106944_0.png'
            },
            '2': {
               name: 'Wannen-Schwapper',
               image: 'https://splatoon3.ink/assets/splatnet/v1/weapon_illust/0199e455872acba1ab8ef0040eca7f41afca48c1f9ad2c5d274323d6dbc49133_0.png'
            },
            '3': {
               name: 'Tri-Stringer',
               image: 'https://splatoon3.ink/assets/splatnet/v1/weapon_illust/676d9f49276f171a93ac06646c0fbdfbeb8c3d0284a057aee306404a6034ffef_0.png'
            }
         }
      },
      '1': {
         start_time: '2023-06-23T16:00:00Z',
         end_time: '2023-06-25T08:00:00Z',
         stage: [Object],
         weapons: [Object]
      },
      '2': {
         start_time: '2023-06-25T08:00:00Z',
         end_time: '2023-06-27T00:00:00Z',
         stage: [Object],
         weapons: [Object]
      },
      '3': {
         start_time: '2023-06-27T00:00:00Z',
         end_time: '2023-06-28T16:00:00Z',
         stage: [Object],
         weapons: [Object]
      },
      '4': {
         start_time: '2023-06-28T16:00:00Z',
         end_time: '2023-06-30T08:00:00Z',
         stage: [Object],
         weapons: [Object]
      }
   },
   bigRunSchedules: {
      '1': {
         start_time: '2023-06-10T00:00:00Z',
         end_time: '2023-06-12T00:00:00Z',
         stage: {
            name: 'Undertow Spillway',
            image: 'https://splatoon3.ink/assets/splatnet/v1/stage_img/icon/high_resolution/71c7076fc2d23f1833c923747e8582e29eb275bed96d8360aa5d0ed6ae069230_0.png'
         },
         weapons: {
            '0': {
               name: 'Random',
               image: 'https://splatoon3.ink/assets/splatnet/v1/ui_img/473fffb2442075078d8bb7125744905abdeae651b6a5b7453ae295582e45f7d1_0.png'
            },
            '1': {
               name: 'Random',
               image: 'https://splatoon3.ink/assets/splatnet/v1/ui_img/473fffb2442075078d8bb7125744905abdeae651b6a5b7453ae295582e45f7d1_0.png'
            },
            '2': {
               name: 'Random',
               image: 'https://splatoon3.ink/assets/splatnet/v1/ui_img/473fffb2442075078d8bb7125744905abdeae651b6a5b7453ae295582e45f7d1_0.png'
            },
            '3': {
               name: 'Random',
               image: 'https://splatoon3.ink/assets/splatnet/v1/ui_img/473fffb2442075078d8bb7125744905abdeae651b6a5b7453ae295582e45f7d1_0.png'
            }
         }
      }
   },
   monthlyGear: {
      name: 'Aquanaut-Schiffchen',
      type: 'Kopf',
      image: 'https://splatoon3.ink/assets/splatnet/v1/gear_img/36c8f7ca8dd42b60ca114b51b88fba5f0d21434b56b8f9d95e8c4f3c5ab097ee_0.png'
   }
}
```
---

### Challenges
To get the current Challenges, you can use the ``getChallenges()`` function:
```js
Splatoon3.getChallenges(res => {
    console.log(res);
});
```
It should return something like this:
```js
[
   {
      name: 'Trizookaracho',
      desc: 'Trizooka-Trommelfeuer ohne Ende!',
      eventRule: 'Das Treffen der Trizooka-Taktiker! Wer wischt mit seiner Wumme den Gegner weg?<br /><br />・ Nur Waffen-Sets mit der Trizooka als Spezialwaffe.<br />・ Die Spezialanzeige füllt sich rasch und ganz von selbst!<br />・ Nur Primäreffekte gelten! Sekundäreffekte sind inaktiv.',
      gameRule: 'Turm-Kommando',
      gameRuleImg: 'here would mormally be the image url but I currently can\'t be fucked finding the right url sry',
      stages: [
         {
            name: 'Pinakoithek',
            image: 'https://splatoon3.ink/assets/splatnet/v1/stage_img/icon/low_resolution/b9d8cfa186d197a27e075600a107c99d9e21646d116730f0843e0fff0aaba7dd_1.png'
         },
         {
            name: 'Buckelwal-Piste',
            image: 'https://splatoon3.ink/assets/splatnet/v1/stage_img/icon/low_resolution/7b3cf118bd9f45d141cd6db0ee75b06e697fa83945c7fe1e6f8483de6a591f5f_1.png'
         }
      ],
      timePeriods: [
         {
            startTime: '2023-06-06T02:00:00Z',
            endTime: '2023-06-06T04:00:00Z'
         },
         {
            startTime: '2023-06-06T10:00:00Z',
            endTime: '2023-06-06T12:00:00Z'
         },
         {
            startTime: '2023-06-06T18:00:00Z',
            endTime: '2023-06-06T20:00:00Z'
         }
      ]
   },
  {
    name: 'Probeklecks auf Arty-Art',
    desc: 'Spaß und Chaos mit Zufallswaffen!',
    eventRule: '„Mein ganzes Sortiment steht zur Verfügung! Ich hoffe, jeder findet neue Favoriten!“<br /> - Euer Arty<br /><br />・ Alle Spieler erhalten ein zufälliges Waffen-Set.<br />・ Arty verleiht sein ganzes Sortiment. Welche Waffen du bereits von ihm erworben hast, spielt keine Rolle!',
    gameRule: 'Herrschaft',
    gameRuleImg: 'here would mormally be the image url but I currently can\'t be fucked finding the right url sry',
    stages: [ [Object], [Object] ],
    timePeriods: [ [Object], [Object], [Object] ]
  }
]
```
---

### Splatnet gear
To get the current gear that is available in the splatnet shop, you can use the `getSplatnetGear()` function:
```js
Splatoon3.getSplatnetGear(res => {
    console.log(res);
});
```

It should return something like this:
```js
{
   featuredBrand:{
      name:"SquidForce",
      banner:"https://splatoon3.ink/assets/splatnet/carousel_img/9ec8a5b980418ad42b25a23ff7ed0417fa2dbd96d52976d55e33b2738a63aef5_0.png",
      usualPower:{
         name:"Ink Resistance Up",
         image:"https://splatoon3.ink/assets/splatnet/skill_img/db36f7e89194ed642f53465abfa449669031a66d7538135c703d3f7d41f99c0d_0.png"
      },
      saleEnd:"2022-12-30T00:00:00Z",
      brandGears:{
         0: {
            name:"White Headband",
            typ:"Headgear",
            image:"https://splatoon3.ink/assets/splatnet/gear_img/9970e78730016ca786353edf5de46e3f9c72f01ec1ac65bde2331f5b78eeb8c1_0.png",
            primaryGearPower:{
               name:"Comeback",
               image:"https://splatoon3.ink/assets/splatnet/skill_img/748c101d23261aee8404c573a947ffc7e116a8da588c7371c40c4f2af6a05a19_0.png"
            },
            additionalGearPowers:[
               {
                  name:"Unknown",
                  image:"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
               }
            ],
            price:750,
            saleEnd:"2022-12-30T00:00:00Z"
         },
         1: [Object],
         2: [Object]
      }
   },
   limitedGear:{
      0:{
         name:"Black Polo",
         typ:"Clothing",
         image:"https://splatoon3.ink/assets/splatnet/gear_img/3518171a2249d21477fc492e5fc1662677530d7640a2af3d190b2a6f6168555d_0.png",
         primaryGearPower:{
            name:"Haunt",
            image:"https://splatoon3.ink/assets/splatnet/skill_img/de15cad48e5f23d147449c70ee4e2973118959a1a115401561e90fc65b53311b_0.png"
         },
         additionalGearPowers:[
            {
               name:"Unknown",
               image:"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            }
         ],
         price:1250,
         saleEnd:"2022-12-30T00:00:00Z",
         brand:{
            name:"Zekko",
            image:"https://splatoon3.ink/assets/splatnet/brand_img/2d12e99ea10566aeb91543d4b95f4b91709551dd3eab66c2216e26b382f89229_0.png"
         }
      },
      1: [Object],
      2: [Object],
      3: [Object],
      4: [Object],
      5: [Object]
   }
}
```

---

## Splatfests

### Current Splatfest
To get the current Splatfest, you can use the `getCurrentSplatfest()` function:
```js
Splatoon3.getCurrentSplatfest(res => {
    console.log(res);
});
```

#### Splatfests are divided into those four regions:
- **US:** The Americas, Australia, New Zealand
- **EU:** Europe
- **JP:** Japan
- **AP:** Hong Kong, South Korea (Asia/Pacific)

Please note that the hexcolors may differ a little from the real colors. If you want the most accurate colors, you should use RGBA.

It should return something like this:
```js
{
   US: {
      title: 'Which flavor of ice cream is best?',
      startTime: '2023-07-15T00:00:00Z',
      endTime: '2023-07-17T00:00:00Z',
      state: 'SECOND_HALF',
      teams: {
         '0': {
            teamName: '',
            image: 'https://splatoon3.ink/assets/splatnet/resources/fest/v1juea-icecreama8e4c17157cd31507a9b7f4b6267d5caa0bdee317044d55a96c5496bb42228b6_0.png',
            color: 'rgba(204.00000306, 167.000005155, 112.00000095, 1)',
            colorHEX: '#cca770ff',
            role: null
         },
         '1': {
            teamName: '',
            image: 'https://splatoon3.ink/assets/splatnet/resources/fest/v1/juea-icecream/b3bb3b4aba5b1bd4a63c897dfe4d4b3676707aa6dac39222d761bfae9fb864b1_0.png',
            color: 'rgba(188.00000409, 109.000008825, 116.99999301, 1)',
            colorHEX: '#bc6d74ff',
            role: null
         },
         '2': {
            teamName: '',
            image: 'https://splatoon3.ink/assets/splatnet/resources/fest/v1/juea-icecream/c0276e2a150b4a61bcc46fca84c2aaef3bd09aa8e2e78baa4158e894c1685563_0.png',
            color: 'rgba(42.000005009999995, 194.00000364, 158.000020875, 1)',
            colorHEX: '#2ac29eff',
            role: null
         }
      }
   },
   EU: {
      title: 'Which flavor of ice cream is best?',
      startTime: '2023-07-15T00:00:00Z',
      endTime: '2023-07-17T00:00:00Z',
      state: 'SECOND_HALF',
      teams: { '0': [Object], '1': [Object], '2': [Object] }
   },
   JP: {
      title: 'Which flavor of ice cream is best?',
      startTime: '2023-07-15T00:00:00Z',
      endTime: '2023-07-17T00:00:00Z',
      state: 'SECOND_HALF',
      teams: { '0': [Object], '1': [Object], '2': [Object] }
   },
   AP: {
      title: 'Which flavor of ice cream is best?',
      startTime: '2023-07-15T00:00:00Z',
      endTime: '2023-07-17T00:00:00Z',
      state: 'SECOND_HALF',
      teams: { '0': [Object], '1': [Object], '2': [Object] }
   }
}
```

---

### Scheduled Splatfests
To get scheduled Splatfest, that are coming in the future, you can use the `getUpcomingSplatfests()` function:
```js
Splatoon3.getUpcomingSplatfests(res => {
    console.log(res);
});
```

#### Splatfests are divided into those four regions:
- **US:** The Americas, Australia, New Zealand
- **EU:** Europe
- **JP:** Japan
- **AP:** Hong Kong, South Korea (Asia/Pacific)

Please note that the hexcolors may differ a little from the real colors. If you want the most accurate colors, you should use RGBA.

It should return something like this:
```js
{
   "US":[
      {
         "title":"What's your favorite taste sensation?",
         "startTime":"2023-01-07T00:00:00Z",
         "endTime":"2023-01-09T00:00:00Z",
         "teams":{
            "0":{
               "teamName":"Spicy",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/a8e4c17157cd31507a9b7f4b6267d5caa0bdee317044d55a96c5496bb42228b6_0.png",
               "color":"rgba(172.99965535500002, 83.999546685, 56.000551529999996, 1)",
               "colorHEX":"#ac5338ff"
            },
            "1":{
               "teamName":"Sweet",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/b3bb3b4aba5b1bd4a63c897dfe4d4b3676707aa6dac39222d761bfae9fb864b1_0.png",
               "color":"rgba(153.99959566500002, 110.998952295, 204.00000306, 1)",
               "colorHEX":"#996eccff"
            },
            "2":{
               "teamName":"Sour",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/c0276e2a150b4a61bcc46fca84c2aaef3bd09aa8e2e78baa4158e894c1685563_0.png",
               "color":"rgba(165.000294135, 180.99900127499998, 51.000000765, 1)",
               "colorHEX":"#a5b433ff"
            }
         }
      }
   ],
   "EU":[
      {
         "title":"What's your favorite taste sensation?",
         "startTime":"2023-01-07T00:00:00Z",
         "endTime":"2023-01-09T00:00:00Z",
         "teams":{
            "0":{
               "teamName":"Spicy",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/a8e4c17157cd31507a9b7f4b6267d5caa0bdee317044d55a96c5496bb42228b6_0.png",
               "color":"rgba(172.99965535500002, 83.999546685, 56.000551529999996, 1)",
               "colorHEX":"#ac5338ff"
            },
            "1":{
               "teamName":"Sweet",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/b3bb3b4aba5b1bd4a63c897dfe4d4b3676707aa6dac39222d761bfae9fb864b1_0.png",
               "color":"rgba(153.99959566500002, 110.998952295, 204.00000306, 1)",
               "colorHEX":"#996eccff"
            },
            "2":{
               "teamName":"Sour",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/c0276e2a150b4a61bcc46fca84c2aaef3bd09aa8e2e78baa4158e894c1685563_0.png",
               "color":"rgba(165.000294135, 180.99900127499998, 51.000000765, 1)",
               "colorHEX":"#a5b433ff"
            }
         }
      }
   ],
   "JP":[
      {
         "title":"好みの味は？",
         "startTime":"2023-01-07T00:00:00Z",
         "endTime":"2023-01-09T00:00:00Z",
         "teams":{
            "0":{
               "teamName":"辛い",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/a8e4c17157cd31507a9b7f4b6267d5caa0bdee317044d55a96c5496bb42228b6_0.png",
               "color":"rgba(172.99965535500002, 83.999546685, 56.000551529999996, 1)",
               "colorHEX":"#ac5338ff"
            },
            "1":{
               "teamName":"甘い",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/b3bb3b4aba5b1bd4a63c897dfe4d4b3676707aa6dac39222d761bfae9fb864b1_0.png",
               "color":"rgba(153.99959566500002, 110.998952295, 204.00000306, 1)",
               "colorHEX":"#996eccff"
            },
            "2":{
               "teamName":"すっぱい",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/c0276e2a150b4a61bcc46fca84c2aaef3bd09aa8e2e78baa4158e894c1685563_0.png",
               "color":"rgba(165.000294135, 180.99900127499998, 51.000000765, 1)",
               "colorHEX":"#a5b433ff"
            }
         }
      }
   ],
   "AP":[
      {
         "title":"What's your favorite taste sensation?",
         "startTime":"2023-01-07T00:00:00Z",
         "endTime":"2023-01-09T00:00:00Z",
         "teams":{
            "0":{
               "teamName":"Spicy",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/a8e4c17157cd31507a9b7f4b6267d5caa0bdee317044d55a96c5496bb42228b6_0.png",
               "color":"rgba(172.99965535500002, 83.999546685, 56.000551529999996, 1)",
               "colorHEX":"#ac5338ff"
            },
            "1":{
               "teamName":"Sweet",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/b3bb3b4aba5b1bd4a63c897dfe4d4b3676707aa6dac39222d761bfae9fb864b1_0.png",
               "color":"rgba(153.99959566500002, 110.998952295, 204.00000306, 1)",
               "colorHEX":"#996eccff"
            },
            "2":{
               "teamName":"Sour",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-taste/c0276e2a150b4a61bcc46fca84c2aaef3bd09aa8e2e78baa4158e894c1685563_0.png",
               "color":"rgba(165.000294135, 180.99900127499998, 51.000000765, 1)",
               "colorHEX":"#a5b433ff"
            }
         }
      }
   ]
}
```

---

### Past Splatfests
To get all past Splatfests, you can use the `getPastSplatfests()` function:
```js
Splatoon3.getPastSplatfests(res => {
    console.log(res);
});
```

#### Splatfests are divided into those four regions:
- **US:** The Americas, Australia, New Zealand
- **EU:** Europe
- **JP:** Japan
- **AP:** Hong Kong, South Korea (Asia/Pacific)

Please note that the hexcolors may differ a little from the real colors. If you want the most accurate colors, you should use RGBA.

It should return something like this:
```js
{
   "US":[
      {
         "title":"What's your partner Pokémon type?",
         "startTime":"2022-11-12T00:00:00Z",
         "endTime":"2022-11-14T00:00:00Z",
         "teams":{
            "0":{
               "teamName":"Grass",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-pocket/a8e4c17157cd31507a9b7f4b6267d5caa0bdee317044d55a96c5496bb42228b6_0.png",
               "color":"rgba(26.9994, 169.00125153, 115.999499235, 1)",
               "colorHEX":"#1aa973ff",
               "role":"ATTACK",
               "results":{
                  "isWinner":false,
                  "conchShellsRatio":0.33711,
                  "conchShellsTop":false,
                  "voteRatio":0.25801,
                  "isVoteTop":false,
                  "regularContributionRatio":0.33411,
                  "isRegularContributionTop":false,
                  "proModeContributionRatio":0.33591,
                  "isProModeContributionTop":false
               }
            },
            "1":{
               "teamName":"Fire",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-pocket/b3bb3b4aba5b1bd4a63c897dfe4d4b3676707aa6dac39222d761bfae9fb864b1_0.png",
               "color":"rgba(217.99950051000002, 70.00004897999999, 20.9992501785, 1)",
               "colorHEX":"#d94614ff",
               "role":"ATTACK",
               "results":{
                  "isWinner":false,
                  "conchShellsRatio":0.32521,
                  "conchShellsTop":false,
                  "voteRatio":0.33601000000000003,
                  "isVoteTop":false,
                  "regularContributionRatio":0.32751,
                  "isRegularContributionTop":false,
                  "proModeContributionRatio":0.30551,
                  "isProModeContributionTop":false
               }
            },
            "2":{
               "teamName":"Water",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-pocket/c0276e2a150b4a61bcc46fca84c2aaef3bd09aa8e2e78baa4158e894c1685563_0.png",
               "color":"rgba(45.999449999999996, 115.999499235, 255, 1)",
               "colorHEX":"#2d73ffff",
               "role":"DEFENSE",
               "results":{
                  "isWinner":true,
                  "conchShellsRatio":0.33771,
                  "conchShellsTop":true,
                  "voteRatio":0.40601000000000004,
                  "isVoteTop":true,
                  "regularContributionRatio":0.33841,
                  "isRegularContributionTop":true,
                  "proModeContributionRatio":0.35861,
                  "isProModeContributionTop":true
               }
            }
         }
      },
      {
         "title":"What would you bring to a deserted island?",
         "startTime":"2022-09-24T00:00:00Z",
         "endTime":"2022-09-26T00:00:00Z",
         "teams":{
            "0":{
               "teamName":"Gear",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-mujintou/a8e4c17157cd31507a9b7f4b6267d5caa0bdee317044d55a96c5496bb42228b6_0.png",
               "color":"rgba(138.00000699, 25.0000004115, 248.000000355, 1)",
               "colorHEX":"#8a19f8ff",
               "role":"ATTACK",
               "results":{
                  "isWinner":true,
                  "conchShellsRatio":0.33451000000000003,
                  "conchShellsTop":false,
                  "voteRatio":0.5828099999999999,
                  "isVoteTop":true,
                  "regularContributionRatio":0.35291,
                  "isRegularContributionTop":true,
                  "proModeContributionRatio":0.33471,
                  "isProModeContributionTop":false
               }
            },
            "1":{
               "teamName":"Grub",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-mujintou/b3bb3b4aba5b1bd4a63c897dfe4d4b3676707aa6dac39222d761bfae9fb864b1_0.png",
               "color":"rgba(191.000003865, 113.00000844, 24.0000004695, 1)",
               "colorHEX":"#bf7118ff",
               "role":"ATTACK",
               "results":{
                  "isWinner":false,
                  "conchShellsRatio":0.30441,
                  "conchShellsTop":false,
                  "voteRatio":0.20701,
                  "isVoteTop":false,
                  "regularContributionRatio":0.31381000000000003,
                  "isRegularContributionTop":false,
                  "proModeContributionRatio":0.30161,
                  "isProModeContributionTop":false
               }
            },
            "2":{
               "teamName":"Fun",
               "image":"https://splatoon3.ink/assets/splatnet/resources/fest/juea-mujintou/c0276e2a150b4a61bcc46fca84c2aaef3bd09aa8e2e78baa4158e894c1685563_0.png",
               "color":"rgba(40.999997519999994, 192.000003705, 94.00000969499999, 1)",
               "colorHEX":"#28c05eff",
               "role":"DEFENSE",
               "results":{
                  "isWinner":false,
                  "conchShellsRatio":0.36111,
                  "conchShellsTop":true,
                  "voteRatio":0.21021,
                  "isVoteTop":false,
                  "regularContributionRatio":0.33331,
                  "isRegularContributionTop":false,
                  "proModeContributionRatio":0.36371000000000003,
                  "isProModeContributionTop":true
               }
            }
         }
      }
   ],
   "EU":[
      {
         "title":"What's your partner Pokémon type?",
         "startTime":"2022-11-12T00:00:00Z",
         "endTime":"2022-11-14T00:00:00Z",
         "teams":{
            "0":[Object],
            "1":[Object],
            "2":[Object],
         }
      },
      {
         "title":"What would you bring to a deserted island?",
         "startTime":"2022-09-24T00:00:00Z",
         "endTime":"2022-09-26T00:00:00Z",
         "teams":{
            "0":[Object],
            "1":[Object],
            "2":[Object],
         }
      }
   ],
   "JP":[
      {
         "title":"パートナーに選ぶならどのタイプ？",
         "startTime":"2022-11-12T00:00:00Z",
         "endTime":"2022-11-14T00:00:00Z",
         "teams":{
            "0":[Object],
            "1":[Object],
            "2":[Object],
         }
      },
      {
         "title":"無人島に持っていくなら？",
         "startTime":"2022-09-24T00:00:00Z",
         "endTime":"2022-09-26T00:00:00Z",
         "teams":{
            "0":[Object],
            "1":[Object],
            "2":[Object],
         }
      }
   ],
   "AP":[
      {
         "title":"What's your partner Pokémon type?",
         "startTime":"2022-11-12T00:00:00Z",
         "endTime":"2022-11-14T00:00:00Z",
         "teams":{
            "0":[Object],
            "1":[Object],
            "2":[Object],
         }
      },
      {
         "title":"What would you bring to a deserted island?",
         "startTime":"2022-09-24T00:00:00Z",
         "endTime":"2022-09-26T00:00:00Z",
         "teams":{
            "0":[Object],
            "1": [Object],
            "2":[Object]
         }
      }
   ]
}
```

---
## Change Log

You can find the Changelog in [CHANGELOG.md](./CHANGELOG.md).