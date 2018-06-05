'use strict'

const Controller = require('egg').Controller

class EtlController extends Controller {
  async start() {
    const { ctx } = this

    const detail = {
      name: 'companies'
    }
    const data = await ctx.service.task.create(detail)
    ctx.body = data

    ctx.service.etl.start(data)
  }

  async status() {
    const { ctx } = this

    const { id } = ctx.params

    const data = await ctx.service.task.getById(id)
    ctx.body = data
  }
}

module.exports = EtlController
