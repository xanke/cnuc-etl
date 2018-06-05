'use strict'

const Service = require('egg').Service
const ObjectId = require('mongodb').ObjectID

class PiplineService extends Service {
  getByName(name) {
    const { ctx } = this

    return ctx.model.UcCompanies.find(
      {
        name: { $in: name }
      },
      {
        _id: 0,
        __v: 0
      }
    )
  }

  async insert(list) {
    const { ctx } = this

    // 设定查询器
    const nameList = list.map(item => item.name)

    // 查询数据
    const findData = await this.getByName(nameList)

    // 查询的原始链 ID 汇总
    let oidList = []

    for (let item of findData) {
      if (item.origins && item.origins.length === 0) continue

      const origins = item.origins.map(item => item.oid)
      oidList = oidList.concat(origins)
    }

    for (let item of list) {
      // 判断原始链是否重复
      if (oidList.includes(item.oid)) continue

      const { name, title, picUrl } = item

      // 更新数据
      await ctx.model.UcCompanies.update(
        { name },
        {
          $set: {
            name,
            title,
            picUrl
          },
          $push: {
            origins: item
          }
        },
        {
          upsert: true
        }
      )
    }
    // item.utime = Date.now()
  }

  async finish(list) {
    const { ctx, app } = this

    for (let id of list) {
      await ctx.model.Companies.update(
        {
          _id: ObjectId(id)
        },
        {
          $set: {
            etl: true
          }
        }
      )
    }
    console.log(list)
  }
}

module.exports = PiplineService
