'use strict'

const Controller = require('egg').Controller

class EtlController extends Controller {
  async start() {
    const { ctx } = this

    ctx.body = { ok: 'ok' }
    ctx.service.etl.start()
  }
}

module.exports = EtlController
