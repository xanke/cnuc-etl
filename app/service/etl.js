'use strict'

const Service = require('egg').Service
const NEtl = require('../netl')
const Companies = require('../list/companies')
const { md5 } = require('../utils/hash')

class EtlService extends Service {
  async start() {
    const { ctx } = this

    const count = await this.etlStart()

    if (count > 0) {
      await this.start()
    }
  }

  async etlStart() {
    const { ctx } = this
    let count = 0

    const data = await ctx.model.Companies.find(
      {
        // origin: 'cyzone',
        etl: null
      },
      {
        __v: 0,
        utime: 0
      }
    ).limit(20)

    count = data.length

    const list = []
    const onlyList = new Set()

    const _idList = data.map(_ => _._id)

    for (let item of data) {
      let oid = md5(item)

      // 过滤重复
      if (onlyList.has(oid)) continue
      onlyList.add(oid)

      const { origin } = item
      let name
      if (origin === 'cyzone') {
        name = item.body.longtitle
      }

      if (origin === '51job') {
        const name = item.name
      }

      list.push({
        oid,
        name,
        title: item.name,
        picUrl: item.picUrl,
        origin: item
      })
    }

    // 通知输入管道
    await ctx.service.pipline.insert(list)

    await ctx.service.pipline.finish(_idList)

    return count
  }
}

module.exports = EtlService
