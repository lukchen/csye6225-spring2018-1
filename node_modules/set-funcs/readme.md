# set-funcs

> A very limited subset of set-* functions I use every day

## Install

```bash
npm i set-funcs
```

Package [on npm](https://www.npmjs.com/package/set-funcs)

## API

* [setBoolean](#setbooleandata-fallback)
* [setNumber](#setnumberdata-fallback-min-max)
* [setString](#setstringdata-fallback-allowed)

#### setBoolean(data, [fallback])

Check if `data` is a **Boolean**

If yes, return `data` otherwise return `fallback`

| Argument | Action |
| :------ | :------- |
| **data** | the tested `data` |
| **fallback** | optional `fallback`, default to `false` |

```js
const setBoolean = require('set-funcs/set-boolean')

function test(opts) {
  opts = opts || {}

  // option silent will be `true` if not defined
  opts.silent = setBoolean(opts.silent, true)
}
```

---

#### setNumber(data, [fallback], [min], [max])

Check if `data` is a **Number**

If yes, return `data` otherwise return `fallback`

`data` can be clamped between `min` and `max`

| Argument | Action |
| :------ | :------- |
| **data** | the tested `data` |
| **fallback** | optional `fallback`, default to `0` |
| **min** | optional `min`. If defined, `data` will be clamped to it |
| **max** | optional `max`. If defined, `data` will be clamped to it |

```js
const setNumber = require('is-funcs/set-number')

function test(opts) {
  opts = opts || {}

  // option `delay` will be `50` if not defined
  opts.delay = setNumber(opts.delay, 50)

  // option `time` will be 25 min
  opts.time = setNumber(opts.time, 50, 25)
}
```

---

#### setString(data, [fallback], [allowed])

Check if `data` is a **String**

If yes, return `data` otherwise return `fallback`

`allowed` can be a string or an array of accepted values. If `data` is not found in `allowed`, the `fallback` is returned

| Argument | Action |
| :------ | :------- |
| **data** | the tested `data` |
| **fallback** | optional `fallback`, default to `''` |
| **allowed** | optional `allowed`. **String** or **Array** of accepted values |

```js
const setString = require('is-funcs/set-string')

function test(opts) {
  opts = opts || {}

  // option `ignore` can be 'resize' or 'scroll', fallback to 'resize'
  opts.ignore = setString(opts.ignore, 'resize', 'resize scroll')

  // using the array form
  opts.ignore = setString(opts.ignore, 'resize', ['resize', 'scroll'])
}
```

## License

MIT
