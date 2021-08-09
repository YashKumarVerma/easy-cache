import EasyCache from './services/core'

async function worker() {
  const EasyCacheInstance = new EasyCache({
    defaultTTL: 10,
    redisHost: '127.0.0.1',
    redisPassword: '',
    redisPort: 6379,
    debug: false,
    disable: false,
  })

  @EasyCacheInstance.Cache({debug:true})
  function something(age: number) {
    console.log(`[something] : fx started`)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[something] : fx ended after 2 seconds`)
        resolve(age)
      }, 2 * 1000)
    })
  }

  const cachedSomething = EasyCacheInstance.provider(
    { debug: true, expireAfter: 10 },
    something,
  )

  const result1 = await something(10)
  console.log(`[worker] : result1: ${result1}`)

  const result2 = await something(20)
  console.log(`[worker] : result2: ${result2}`)

  const result3 = await cachedSomething(30)
  console.log(`[cached worker] : result3: ${result3}`)

  const result4 = await cachedSomething(40)
  console.log(`[cached worker] : result4: ${result4}`)

  const cachedResult3 = await cachedSomething(30)
  console.log(`[cached worker] : cachedResult3: ${cachedResult3}`)

  const cachedResult4 = await cachedSomething(40)
  console.log(`[cached worker] : cachedResult4: ${cachedResult4}`)
}

worker()
