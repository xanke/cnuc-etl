'use strict'
const pkg = require('../../package.json')
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { name, version } = pkg
    ctx.body = { name, version }
  }
}

module.exports = HomeController
