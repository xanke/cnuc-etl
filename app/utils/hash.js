const crypto = require('crypto')


exports.md5 = function md5(origin) {
  return crypto.createHash('md5').update(JSON.stringify(origin)).digest('hex')
}