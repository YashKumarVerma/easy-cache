import Package from './index'

const pkg = new Package({
  defaultTTL: 5,
  redisHost: 'localhost',
  redisPassword: '12345',
  redisPort: 3000,
})

console.log(pkg)
