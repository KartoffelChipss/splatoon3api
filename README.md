# Splatoon3api
Splatoon3api is a simple library to get the current and next Splatoon 3 Maps and Salmonruns. This package uses the data from [splatoon3.ink](https://splatoon3.ink/). It is an updated and modified version of [vincent-coding's Splatoon2api](https://github.com/vincent-coding/Splatoon2api). Currently, there is only an english and german translation, but there will be more in the future.

## Usage
### Installation
Simply execute the following command in your commandline:
```
npm install splatoon3api
```
### Usage
First, import the module like this:
```js
const splatoon3api = require("splatoon3api");
const Splatoon3 = new splatoon3api.Client("en");
```
You can exchange the `en` for any other language in the list below:
- `en` - English
- `de` - German

Once you have done this, you can use all the following functions as you like.

#### Current Stages
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
  }
}
```
#### Next Stages
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
  }
}
```

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
  details: {
    '0': {
      start_time: '2022-10-01T16:00:00Z',
      end_time: '2022-10-03T08:00:00Z',
      stage: {
        name: 'Spawning Grounds',
        image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/high_resolution/be584c7c7f547b8cbac318617f646680541f88071bc71db73cd461eb3ea6326e_0.png'
      },
      weapons: [Object]
    },
    '1': {
      start_time: '2022-10-03T08:00:00Z',
      end_time: '2022-10-05T00:00:00Z',
      stage: {
        name: 'Sockeye Station',
        image: 'https://splatoon3.ink/assets/splatnet/stage_img/icon/high_resolution/3418d2d89ef84288c78915b9acb63b4ad48df7bfcb48c27d6597920787e147ec_0.png'
      },
      weapons: [Object]
    }
  },
  next: {
    '0': {
      start_time: '2022-10-01T16:00:00Z',
      end_time: '2022-10-03T08:00:00Z'
    },
    '1': {
      start_time: '2022-10-03T08:00:00Z',
      end_time: '2022-10-05T00:00:00Z'
    },
    '2': {
      start_time: '2022-10-05T00:00:00Z',
      end_time: '2022-10-06T16:00:00Z'
    },
    '3': {
      start_time: '2022-10-06T16:00:00Z',
      end_time: '2022-10-08T08:00:00Z'
    },
    '4': {
      start_time: '2022-10-08T08:00:00Z',
      end_time: '2022-10-10T00:00:00Z'
    }
  }
}
```
weapons: [Object]
```js
{
    '0': {
      name: 'Random',
      image: 'https://splatoon3.ink/assets/splatnet/ui_img/473fffb2442075078d8bb7125744905abdeae651b6a5b7453ae295582e45f7d1_0.png'     
    },
    '1': {
      name: 'Random',
      image: 'https://splatoon3.ink/assets/splatnet/ui_img/473fffb2442075078d8bb7125744905abdeae651b6a5b7453ae295582e45f7d1_0.png'     
    },
    '2': {
      name: 'Random',
      image: 'https://splatoon3.ink/assets/splatnet/ui_img/473fffb2442075078d8bb7125744905abdeae651b6a5b7453ae295582e45f7d1_0.png'     
    },
    '3': {
      name: 'Random',
      image: 'https://splatoon3.ink/assets/splatnet/ui_img/473fffb2442075078d8bb7125744905abdeae651b6a5b7453ae295582e45f7d1_0.png'     
    }
}
```



