'use strict'

const Service = require('egg').Service
const NEtl = require('../netl')
const Companies = require('../list/companies')
const { md5 } = require('../utils/hash')

class EtlService extends Service {
  async start() {
    const { ctx } = this

    const data = await ctx.model.Companies.find(
      {
        origin: 'cyzone'
      },
      {
        _id: 0
      }
    ).limit(10)

    const list = []
    const onlyList = new Set()

    for (let item of data) {
      let mid = md5(item)

      if (onlyList.has(mid)) continue
      onlyList.add(mid)
      
      list.push({
        mid,
        name: item.body.longtitle,
        title: item.name,
        picUrl: item.picUrl,
        body: item.body,
        utime: Date.now()
      })
    }

    ctx.service.pipline.insert(list)
    // new NEtl(Companies)
  }
}

module.exports = EtlService
