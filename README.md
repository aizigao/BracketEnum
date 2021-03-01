# @aizigao/uni-select

build you own select usually like React Native Platform.select

<img alt="npm (scoped)" src="https://img.shields.io/npm/v/@aizigao/uni-select?style=for-the-badge" style='display:inline-block' >
<img alt="npm bundle size (scoped)" style='display:inline-block' src="https://img.shields.io/bundlephobia/minzip/@aizigao/uni-select?style=for-the-badge">

## WHAT AND HOW

just see src/UniSelect/index.test.ts

You can use it to create a Platform.Select util like ReactNative

```ts
import createSelector from '@aizigao/uni-select';

// image below val is always Truely
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const PlatformO = createSelector({
  ios: true,
  android: false,
});
const Platform = { ...PlatformO, OS: PlatformO.current };

Platform.select({
  ios: "I'm IOS",
}); // Return "I'm IOS"
Platform.OS; // ios
```

**extends original React Native's `Platform` for more possible**

> detect more android special manufacturer

> detect iphoneX

```ts
import createSelector from '@aizigao/uni-select';
import { Platform as PlatformRN } from 'react-native';

// TIP: You need  set conditions by youself
const androidXiaomi = false;
const androidSamsung = true;
const isIphoneX = false; // detect it can use [react-native-iphone-x-helper](https://www.npmjs.com/package/react-native-iphone-x-helper)

const PlatformO = createSelector({
  iosGeneral: PlatformRN.OS === 'ios' && !isIphoneX,
  iosIphoneX: PlatformRN.OS === 'ios' && isIphoneX,
  androidSamsung: PlatformRN.OS === 'android' && androidSamsung,
  androidXiaomi: PlatformRN.OS === 'android' && androidXiaomi,
  androidGeneral:
    PlatformRN.OS === 'android' && !androidSamsung && !androidXiaomi,
});

// use OS instead of current property
const Platform = { ...PlatformO, OS: PlatformO.current };

const spMsgForPlatfrom = Platform.select({
  androidSamsung: "I'm smasung devices",
  androidXiaomi: "I'm Xiaomi devices",
}); //"I'm smasung devices"

const currentVerson = Platform.OS; // androidSamsung
const currentVersonSame = Platform.current; // androidSamsung
```

**other test cases**

```ts
import createSelector from '@aizigao/uni-select';

test('normal', () => {
  const selector = createSelector({
    isIOS: true,
    isAndroid: false,
  });

  const rst = selector.select({
    isIOS: "I'm use safari browser now",
    isAndroid: "I'm use android browser now",
  });

  expect(rst).toEqual("I'm use safari browser now");
});

test("can't has multi match value", () => {
  expect(() => {
    createSelector({
      isIOS: true,
      isAndroid: true,
    });
  }).toThrow('[UniSelect]: conditions must be unique');
});

test('no match value', () => {
  const selector = createSelector({
    isIOS: true,
    isAndroid: false,
  });

  expect(
    selector.select({
      isAndroid: 'yyy',
      // isIOS: 'yyy',
    }),
  ).toBeNull();

  expect(selector.current).toEqual('isIOS');
});

test('fallback if not match config', () => {
  const selector = createSelector({
    isIOS: false,
    isAndroid: false,
  });

  expect(
    selector.select({
      default: "I'm fall back",
    }),
  ).toEqual("I'm fall back");

  expect(selector.current).toBeNull();
});
```

## Install

```bash
npm i bracketEnum
```

## Development

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ npm start
```

Build documentation,

```bash
$ npm run docs:build
```

Build library via `father-build`,

```bash
$ npm run build
```

## CHANGELOG

### 1.0.0

- first version
