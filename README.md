> A modern NodeJS package to cache any function with just a **single line of code** - @easy-cache

![EasyCache](https://github.com/YashKumarVerma/easy-cache/blob/master/assets/banner.png?raw=true)

[![Ensure Package Builds](https://github.com/YashKumarVerma/easy-cache/actions/workflows/build.yml/badge.svg)](https://github.com/YashKumarVerma/easy-cache/actions/workflows/build.yml)
[![Tests](https://github.com/YashKumarVerma/easy-cache/actions/workflows/test.yml/badge.svg)](https://github.com/YashKumarVerma/easy-cache/actions/workflows/test.yml)

# EasyCache

## 🤔 What is EasyCache v1.0?

@easy-cache is a NodeJS module available on NPM to cache any function with just a single line of code. It helps you to boost your application in the cleanest way possible. Allows setting global as well as local cache options. Supports TypeScript as well as JavaScript.

Primary features of @easy-cache are:

- Global configuration options to configure entire application at one place.
- Local configuration option to configure any function as required, overriding the global configs.
- Custom TTL (Time to Live) to customize cache invalidation.
- Built in support for Redis as cache server. (_Others coming in v2.0_)
- Support for javaScript and TypeScript in a single package.
- Single line implementation even in JS where decorators do not exist.
- brutally tested and production ready.

# Usage

The package can be directly used in any nodejs (TypeScript / JavaScript) based backend.

**Step 1**: Install the package

```
npm install @easy-cache/core

# or

yarn add @easy-cache/core
```

> Note: In v1.0, the default cache engine i.e. `redis` is used, and therefore the `redis` package is also installed by default. From v2.0 onwards, there would be 0 dependencies in the core package.

**Step 2**: Initialize the cache system

```javascript
/** Initializing the cache system */
import EasyCache from '@easy-cache/core'

const cacheInstance = new EasyCache({
  // TTL Value in seconds
  defaultTTL: 10,

  // redis connection details
  redisHost: '127.0.0.1',
  redisPassword: '',
  redisPort: 6379,

  // whether to show verbose logs
  debug: false,

  // completely disable the cache globally
  disable: false,
})

/** the function that you want to cache **/
function fullName(fistName, lastName) {
  return `${firstName} ${lastName}`
}

/** To cache the function, just pass it into the provider with configs..
 *
 * Configurations can be passed into the provider to change the behavior.
 * disable: to turn of cache for given funtion
 * expireAfter: to set a custom expire time for given function
 * debug: to show verbose logs for given function
 */
const cachedFullName = cacheInstance.provider({ debug: true }, fullName)
```

### Using with classes

Since v1.0, EasyCache supports classes as well, using a unique method called decorators.
Simply adding `@EasyCache.Cache({configs})` will cache the following function.

**Example**:

```ts
class MyClass {
  @EasyCacheInstance.Cache({ defaultTTL: 30 })
  public static thisMethodWillBeCached() {
    // some code
    return true
  }
}
```

The above function would cache with a ttl of 30 seconds.

# Tests

Tests are a vital component of any software project. In @easy-cache,

- the unit tests are written in TypeScript using Mocha and Chai.
- the end to end tests are being written in JavaScript using Mocha and Chai.

A detailed analysis about the above is [posted here](https://medium.com/@yk.verma2000/tdd-design-choices-src-or-dist-7261c7c81cb0).

# Roadmap

### Version 1

- @cache decorator to implement caching for class methods.
- provider to cache orphan functions (without decorators).
- Support for javascript and typescript.
- Redis as a default provider for caching.
- Robust test suite.

### Version 2

- Support for plugins to add any generic provider.
- Support for Postgres, Memcached, etc. as providers on rolling basis.
- Plugins
