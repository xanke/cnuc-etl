'use strict'

const Controller = require('egg').Controller

class DataController extends Controller {
  async list() {
    const { ctx } = this
    const { id } = ctx.params

  }
}

module.exports = DataController
