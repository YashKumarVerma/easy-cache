import Package from './index'

const pkg = new Package({
  defaultTTL: 5,
  redisHost: 'localhost',
  redisPassword: '',
  redisPort: 6379,
  debug: true,
})

console.log(pkg)
