# bracket-enum

If you're using Typescript, you will realize that the enum type under typescript is not so useful, so I created this repository to handle the enum type.

<img alt="npm (scoped)" src="https://img.shields.io/npm/v/bracket-enum?style=for-the-badge" style='display:inline-block' >
<img alt="npm bundle size (scoped)" style='display:inline-block' src="https://img.shields.io/bundlephobia/minzip/bracket-enum?style=for-the-badge">

![Peek 2021-03-01 15-16.gif](https://i.loli.net/2021/03/01/9SjxY5QD7nqTZzp.gif)

If you wanta see what you defined bofore, just move you mouse hovering it.

![image.png](https://i.loli.net/2021/03/01/Lam54Zhub8PXRBH.png)

## How to use it

**Install**

```
yarn add bracket-enum
```

**Define a BracketEnum**

```ts
import { BracketEnum } from 'bracket-enum';
const STATUS = BracketEnum.of([
  // [CODE, [VALUE, DESC, EXTR]]
  ['AUDIT_WAIT', [1, 'pass', 'extra1']],
  ['AUDIT_PASS', [2, 'reject', 'extra2']],
]);

// --- or

const STATUS_2 = new BracketEnum([
  // [CODE, [VALUE, DESC, EXTR]]
  ['AUDIT_WAIT', [1, 'pass', 'extra1']],
  ['AUDIT_PASS', [2, 'reject', 'extra2']],
]);
```

> I recommand you use `BracketEnum.of` instead of `new` for I often lost `new` in my code.

**Basic Use**

```ts
STATUS.getValueByCode('AUDIT_PASS'); // 2

STATUS.getDescByCode('AUDIT_WAIT'); // 'pass'

STATUS.getDescByValue(2); // 'pass'

STATUS.getAllValues(); // [1, 2]

// -- detect a value is match code
const currentState = 2;
STATUS.checkValueByCode('AUDIT_PASS', currentState); // true
```

**Extend it by youself**

Because I use `class` to create BracketEnum, so you can just extends it

```ts
// extend
class myEnums extends Dtnums {
  // ---
}
new myEnums([]);
myEnums.of([]);
```

e.g.

I use `antd` more often, so I add a function names `toFormOption` build in that could create the `Options` structure needed to generate `Select` in `antd`. If you need to define it, you can follow like below.

```ts
class myEnums extends Dtnums {
  // build in funtion aready, name toFormOptions
  toMyFormOptions(hasAll: boolean = false): any[] {
    const allOption = {
      key: null,
      value: null,
      label: '全部',
      extra: null,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = this.configList.map(([code, [value, desc, extra]]) => {
      return {
        key: value,
        value,
        label: desc,
        extra,
      };
    });

    if (hasAll) {
      return [allOption, ...result];
    }
    return result;
  }
}
new myEnums([]);
myEnums.of([]);
```

**Build in function**

- `of()`: create BracketEnum
- `getValueByCode([code])`
- `getDescByCode([code])`
- `getExtraByCode([code])`
- `getExtraByValue([code])`
- `getDescByValue([value])`
- `getAllValues()`

* `toFormOptions([hasAll:Boolean])`: ganerate `antd` 's `options` structure
* `toFormValueEnum` : ganerate `antd pro table`'s ValueEnum

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

### 0.0.1

- publish test
