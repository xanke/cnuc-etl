'use strict'

const Service = require('egg').Service

class PiplineService extends Service {
  async insert(list) {
    const { ctx } = this
    ctx.model.UcCompanies.insert(list)
  }
}

module.exports = PiplineService
