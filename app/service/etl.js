'use strict'

const Service = require('egg').Service
const NEtl = require('../netl')
const Companies = require('../list/companies')
const { md5 } = require('../utils/hash')

class EtlService extends Service {
  async start(task) {
    const { ctx } = this
    const { id } = task

    // 启动任务
    const count = await this.etlStart(task)

    // 更新状态
    await ctx.service.task.updateById(id, count)

    console.log(id, count)

    if (count > 0) {
      const status = await ctx.service.task.getStatusById(id)
      if ( status === 1) {
        return this.start(task)
      } else {
        console.log(id, 'stop')
      }
    }
  }

  async etlStart(task) {
    const { id } = task
    console.log(id, 'start')

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
    ).limit(10)

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
        name = item.title
      }

      if (!name) {
        console.log(oid, 'no-name')
        continue
      }

      list.push({
        oid,
        name,
        title: item.name,
        picUrl: item.picUrl,
        origin: item
      })
    }

    if (list.length === 0) {
      return 0
    } 

    // 通知输入管道
    await ctx.service.pipline.insert(list)

    // 插入完成数据标记
    await ctx.service.pipline.finish(_idList)

    return count
  }
}

module.exports = EtlService
