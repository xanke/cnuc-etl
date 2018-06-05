const crypto = require('crypto')


exports.md5 = function md5(origin) {
  return crypto.createHash('md5').update(JSON.stringify(origin)).digest('hex')
}

exports.uuid = function uuid(a) {
  return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)
}