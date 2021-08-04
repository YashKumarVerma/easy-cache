import Package from './index'

const pkg = new Package({
  defaultTTL: 5,
  redisHost: '127.0.0.1',
  redisPort: 6379,
  redisPassword: '',
  debug: false,
})

console.log(pkg)
