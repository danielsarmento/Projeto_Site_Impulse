const { randomBytes } = require('crypto');

const token = randomBytes(10).toString('hex');

const now = new Date()
console.log("Data Atual: ", now)
now.setHours(now.getHours() +1)

console.log(typeof token)
console.log("Data Alterada: ", now)