'use strict'

const Service = require('egg').Service
const { uuid } = require('../utils/hash')

class TaskService extends Service {
  async create(detail) {
    const { ctx } = this
    const id = uuid()

    const { name = 'scan' } = detail

    const insert = {
      id,
      name,
      detail,
      count: 0,
      startTime: Date.now(),
      status: 1
    }

    await ctx.model.UcTasks.create(insert)

    return insert
  }

  async stopById(id) {
    const { ctx } = this

    await ctx.model.UcTasks.update(
      {
        id
      },
      {
        $set: {
          status: 0,
          endTime: Date.now()
        }
      }
    )
  }

  async updateById(id, count = 0) {
    const { ctx } = this
    await ctx.model.UcTasks.update(
      {
        id
      },
      {
        $set: {
          utime: Date.now(),
          endTime: Date.now()
        },
        $inc: {
          count: count
        }
      }
    )
  }

  async list(find = {}) {
    const { ctx } = this

    const data = await ctx.model.UcTasks.find(find)
    return data
  }

  async getById(id) {
    const { ctx } = this

    const data = await ctx.model.UcTasks.findOne({
      id
    }, {
      _id: 0,
      __v: 0
    })
    return data
  }

  async getStatusById(id) {
    const data = await this.getById(id)
    return data.status
  }
}

module.exports = TaskService
