# Decorated Cache 

Decorated cache is a method of caching a function just by adding a decorator on top of it. This enables minimal changes in the codebase and adds a lot of flexibility. Each and every function can be configured indenpendently.


# Usage
The package is written in typescript and generates the type descriptions using the typescript compiler. It can be directly used in any nodejs based backend by importing the package.

```
npm install --save decorated-cache

# or

yarn add decorated-cache
```


# Roadmap

### Version 1
- @cache decorator to implement caching.
- Support for redis as a provider for caching.

### Version 2
- Support for plugins to add any generic provider.

