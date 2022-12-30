# Splatoon3api
Splatoon3api is a simple library to get the current and next Splatoon 3 Maps (rotations), Salmonruns and Splatnet gear. This package uses the data from [splatoon3.ink](https://splatoon3.ink/). It is an updated and modified version of [vincent-coding's Splatoon2api](https://github.com/vincent-coding/Splatoon2api). Splatoon3api is available in eight different languages ([List of available languages](#languages))

[![npm](https://img.shields.io/npm/dm/splatoon3api?label=Downloads)](https://www.npmjs.com/package/splatoon3api) [![npm](https://img.shields.io/npm/v/splatoon3api?label=Version)](https://www.npmjs.com/package/splatoon3api) [![Discord](https://img.shields.io/discord/990295419005333554?color=%23738ADB&label=Discord)](https://discord.gg/KevMGSc4Mz)

Splatoon3api is now also supporting the new maps and X-Battles!

If you have trouble with this package, feel free to ask me in my [Discord](https://discord.gg/KevMGSc4Mz).

## Table of contents
 - [Installation](#installation)
 - [Usage](#usage)
    - [Languages](#languages)
    - [Current stages](#current-stages)
    - [Next stages](#next-stages)
    - [Salmonrun](#salmonrun-schedules)
    - [Splatnet gear](#splatnet-gear)
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
const Splatoon3 = new splatoon3api.Client("en");
```

### Languages
You can exchange the `en` for any other language in the list below:
- `en` - English
- `de` - German
- `nl` - Dutch
- `fr` - French
- `es` - Spanish
- `it` - Italian
- `ru` - Russian
- `jp` - Japanese

Once you have done this, you can use all the following functions as you like.

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
    rules: 'Turf War'
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
      rules: 'Splat Zones'
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
      rules: 'Rainmaker'
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
    rules: 'Rainmaker'
  }
}
```

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
    rules: 'Turf War'
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
      rules: 'Tower Control'
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
      rules: 'Clam Blitz'
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
    rules: 'Clam Blitz'
  }
}
```
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
   "details":{
      "0":{
         "start_time":"2022-12-28T16:00:00Z",
         "end_time":"2022-12-30T08:00:00Z",
         "stage":{
            "name":"Gone Fission Hydroplant",
            "image":"https://splatoon3.ink/assets/splatnet/stage_img/icon/high_resolution/f1e4df4cff1dc5e0acc66a9654fecf949224f7e4f6bd36305d4600ac3fa3db7b_0.png"
         },
         "weapons":{
            "0":{
               "name":"Sploosh-o-matic",
               "image":"https://splatoon3.ink/assets/splatnet/weapon_illust/6e58a0747ab899badcb6f351512c6034e0a49bd6453281f32c7f550a2132fd65_0.png"
            },
            "1":{
               "name":"Carbon Roller",
               "image":"https://splatoon3.ink/assets/splatnet/weapon_illust/29358fd25b6ad1ba9e99f5721f0248af8bde7f1f757d00cbbc7a8a6be02a880d_0.png"
            },
            "2":{
               "name":"Rapid Blaster",
               "image":"https://splatoon3.ink/assets/splatnet/weapon_illust/0a929d514403d07e1543e638141ebace947ffd539f5f766b42f4d6577d40d7b8_0.png"
            },
            "3":{
               "name":"Hydra Splatling",
               "image":"https://splatoon3.ink/assets/splatnet/weapon_illust/34fe0401b6f6a0b09839696fc820ece9570a9d56e3a746b65f0604dec91a9920_0.png"
            }
         }
      },
      "1":{
         "start_time":"2022-12-30T08:00:00Z",
         "end_time":"2023-01-01T00:00:00Z",
         "stage":{
            "name":"Marooner's Bay",
            "image":"https://splatoon3.ink/assets/splatnet/stage_img/icon/high_resolution/1a29476c1ab5fdbc813e2df99cd290ce56dfe29755b97f671a7250e5f77f4961_0.png"
         },
         "weapons":{
            "0":{
               "name":"Luna Blaster",
               "image":"https://splatoon3.ink/assets/splatnet/weapon_illust/10d4a1584d1428cb164ddfbc5febc9b1e77fd05e2e9ed9de851838a94d202c15_0.png"
            },
            "1":{
               "name":"Splattershot",
               "image":"https://splatoon3.ink/assets/splatnet/weapon_illust/e3874d7d504acf89488ad7f68d29a348caea1a41cd43bd9a272069b0c0466570_0.png"
            },
            "2":{
               "name":"Dynamo Roller",
               "image":"https://splatoon3.ink/assets/splatnet/weapon_illust/18fdddee9c918842f076c10f12e46d891aca302d2677bf968ee2fe4e65b831a8_0.png"
            },
            "3":{
               "name":"Splat Charger",
               "image":"https://splatoon3.ink/assets/splatnet/weapon_illust/3f99800b569e286305669b7ab28dc3ff0f0b1b015600569d5ac30ab8a97047a0_0.png"
            }
         }
      }
   },
   "next":{
      "0":{
         "start_time":"2022-12-28T16:00:00Z",
         "end_time":"2022-12-30T08:00:00Z"
      },
      "1":{
         "start_time":"2022-12-30T08:00:00Z",
         "end_time":"2023-01-01T00:00:00Z"
      },
      "2":{
         "start_time":"2023-01-01T00:00:00Z",
         "end_time":"2023-01-02T16:00:00Z"
      },
      "3":{
         "start_time":"2023-01-02T16:00:00Z",
         "end_time":"2023-01-04T08:00:00Z"
      },
      "4":{
         "start_time":"2023-01-04T08:00:00Z",
         "end_time":"2023-01-06T00:00:00Z"
      }
   },
   "monthlyGear":{
      "name":"Astro Helm",
      "type":"Headgear",
      "image":"https://splatoon3.ink/assets/splatnet/gear_img/205627105988cbb1f31e504cbf0874e5b5fb8c933f40da11fc4c66c4a0223a05_0.png"
   }
}
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
   "featuredBrand":{
      "name":"SquidForce",
      "banner":"https://splatoon3.ink/assets/splatnet/carousel_img/9ec8a5b980418ad42b25a23ff7ed0417fa2dbd96d52976d55e33b2738a63aef5_0.png",
      "usualPower":{
         "name":"Ink Resistance Up",
         "image":"https://splatoon3.ink/assets/splatnet/skill_img/db36f7e89194ed642f53465abfa449669031a66d7538135c703d3f7d41f99c0d_0.png"
      },
      "saleEnd":"2022-12-30T00:00:00Z",
      "brandGears":{
         "0":{
            "name":"White Headband",
            "typ":"Headgear",
            "image":"https://splatoon3.ink/assets/splatnet/gear_img/9970e78730016ca786353edf5de46e3f9c72f01ec1ac65bde2331f5b78eeb8c1_0.png",
            "primaryGearPower":{
               "name":"Comeback",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/748c101d23261aee8404c573a947ffc7e116a8da588c7371c40c4f2af6a05a19_0.png"
            },
            "additionalGearPowers":[
               {
                  "name":"Unknown",
                  "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
               }
            ],
            "price":750,
            "saleEnd":"2022-12-30T00:00:00Z"
         },
         "1":{
            "name":"Tri-Octo Tee",
            "typ":"Clothing",
            "image":"https://splatoon3.ink/assets/splatnet/gear_img/203f2d96ae136516a9976a832a761599c30038d0af777a42ad15c46cc3e35a16_0.png",
            "primaryGearPower":{
               "name":"Ninja Squid",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/2c0ef71abfb3efe0e67ab981fc9cd46efddcaf93e6e20da96980079f8509d05d_0.png"
            },
            "additionalGearPowers":[
               {
                  "name":"Unknown",
                  "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
               }
            ],
            "price":750,
            "saleEnd":"2022-12-30T00:00:00Z"
         },
         "2":{
            "name":"Painter's Mask",
            "typ":"Headgear",
            "image":"https://splatoon3.ink/assets/splatnet/gear_img/921755ccd3f0dac0afde15b8684dea095e14068ae204febd0beb7c1d039b5676_0.png",
            "primaryGearPower":{
               "name":"Special Charge Up",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/e8668a2af7259be74814a9e453528a3e9773435a34177617a45bbf79ad0feb17_0.png"
            },
            "additionalGearPowers":[
               {
                  "name":"Unknown",
                  "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
               },
               {
                  "name":"Unknown",
                  "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
               }
            ],
            "price":9000,
            "saleEnd":"2022-12-30T00:00:00Z"
         }
      }
   },
   "limitedGear":{
      "0":{
         "name":"Black Polo",
         "typ":"Clothing",
         "image":"https://splatoon3.ink/assets/splatnet/gear_img/3518171a2249d21477fc492e5fc1662677530d7640a2af3d190b2a6f6168555d_0.png",
         "primaryGearPower":{
            "name":"Haunt",
            "image":"https://splatoon3.ink/assets/splatnet/skill_img/de15cad48e5f23d147449c70ee4e2973118959a1a115401561e90fc65b53311b_0.png"
         },
         "additionalGearPowers":[
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            }
         ],
         "price":1250,
         "saleEnd":"2022-12-30T00:00:00Z",
         "brand":{
            "name":"Zekko",
            "image":"https://splatoon3.ink/assets/splatnet/brand_img/2d12e99ea10566aeb91543d4b95f4b91709551dd3eab66c2216e26b382f89229_0.png"
         }
      },
      "1":{
         "name":"White 8-Bit FishFry",
         "typ":"Clothing",
         "image":"https://splatoon3.ink/assets/splatnet/gear_img/0ebc7b54299e1f269f6581ed0783e76249e69b542dbb33ac1e23773e4472c5c8_0.png",
         "primaryGearPower":{
            "name":"Special Power Up",
            "image":"https://splatoon3.ink/assets/splatnet/skill_img/fba267bd56f536253a6bcce1e919d8a48c2b793c1b554ac968af8d2068b22cab_0.png"
         },
         "additionalGearPowers":[
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            }
         ],
         "price":2000,
         "saleEnd":"2022-12-30T04:00:00Z",
         "brand":{
            "name":"Firefin",
            "image":"https://splatoon3.ink/assets/splatnet/brand_img/d24063d70a2f91ba89ac3e109e492efde75351b2735bf532c1f5285aab3fe299_0.png"
         }
      },
      "2":{
         "name":"Rugby King 08",
         "typ":"Clothing",
         "image":"https://splatoon3.ink/assets/splatnet/gear_img/faa679a1cb88dc61aa739be96d65846bd51fda65717b0a0c92b6113c070a16d2_0.png",
         "primaryGearPower":{
            "name":"Special Saver",
            "image":"https://splatoon3.ink/assets/splatnet/skill_img/e3154ab67494df2793b72eabf912104c21fbca71e540230597222e766756b3e4_0.png"
         },
         "additionalGearPowers":[
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            },
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            }
         ],
         "price":6400,
         "saleEnd":"2022-12-30T08:00:00Z",
         "brand":{
            "name":"Enperry",
            "image":"https://splatoon3.ink/assets/splatnet/brand_img/bc215963d1a424a5f9707d565f07a5bcf79e19cde17372a9a6a914cd986f7fc9_0.png"
         }
      },
      "3":{
         "name":"Navy Red-Soled Wingtips",
         "typ":"Shoes",
         "image":"https://splatoon3.ink/assets/splatnet/gear_img/208974a079935bac5a0af6b1b71e7e31d4b0b53faf5e1984b131eb13f7f12750_0.png",
         "primaryGearPower":{
            "name":"Special Saver",
            "image":"https://splatoon3.ink/assets/splatnet/skill_img/e3154ab67494df2793b72eabf912104c21fbca71e540230597222e766756b3e4_0.png"
         },
         "additionalGearPowers":[
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            },
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            }
         ],
         "price":9200,
         "saleEnd":"2022-12-30T12:00:00Z",
         "brand":{
            "name":"Rockenberg",
            "image":"https://splatoon3.ink/assets/splatnet/brand_img/3f572aafe18399d97020bfb198f6f6d5ffeb57a0d9f082d780c635507393ca7c_0.png"
         }
      },
      "4":{
         "name":"Khaki Ranger Vest",
         "typ":"Clothing",
         "image":"https://splatoon3.ink/assets/splatnet/gear_img/ab73195e3c0ecf0dd3b65464afd627b1ee3ef1bf39624cc4c5a5157bcb9bfa88_0.png",
         "primaryGearPower":{
            "name":"Ink Recovery Up",
            "image":"https://splatoon3.ink/assets/splatnet/skill_img/29b845ea895b931bfaf895e0161aeb47166cbf05f94f04601769c885d019073b_0.png"
         },
         "additionalGearPowers":[
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            },
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            }
         ],
         "price":8400,
         "saleEnd":"2022-12-30T16:00:00Z",
         "brand":{
            "name":"Inkline",
            "image":"https://splatoon3.ink/assets/splatnet/brand_img/b7721cb9eafab52885c463b2bacf32ec0844834e9ac3f62230606de83497a1da_0.png"
         }
      },
      "5":{
         "name":"Barazushi Wrap",
         "typ":"Clothing",
         "image":"https://splatoon3.ink/assets/splatnet/gear_img/ef70c91fe43b4ccc9e129cd5fa31c6cd76f391e652570ed6a1d91c9452c71890_0.png",
         "primaryGearPower":{
            "name":"Ink Recovery Up",
            "image":"https://splatoon3.ink/assets/splatnet/skill_img/29b845ea895b931bfaf895e0161aeb47166cbf05f94f04601769c885d019073b_0.png"
         },
         "additionalGearPowers":[
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            },
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            },
            {
               "name":"Unknown",
               "image":"https://splatoon3.ink/assets/splatnet/skill_img/dc937b59892604f5a86ac96936cd7ff09e25f18ae6b758e8014a24c7fa039e91_0.png"
            }
         ],
         "price":10800,
         "saleEnd":"2022-12-30T20:00:00Z",
         "brand":{
            "name":"Barazushi",
            "image":"https://splatoon3.ink/assets/splatnet/brand_img/d614cbb672fe000ee39c1919e5b034f2e55b702cafaff1a7cc5f37dcf7ad1024_0.png"
         }
      }
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

Please note, that the Hexcolors can be a bit off the real colors. If you want the most accurate colors, you should use RGBA.

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

Please note, that the Hexcolors can be a bit off the real colors. If you want the most accurate colors, you should use RGBA.

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