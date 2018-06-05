module.exports = app => {
  const mongoose = app.mongoose
  const UcTasksSchema = new mongoose.Schema({
    id: {
      type: String
    },
    name: {
      type: String
    },
    count: {
      type: Number // 完成统计
    },
    startTime: {
      type: Date // 开始时间
    },
    endTime: {
      type: Date // 结束时间
    },
    status: {
      type: Number // 1 运行 0 结束 2 异常
    },
    detail: {
      type: Object // 详情
    },
    utime: {
      type: Date
    }
  })

  UcTasksSchema.index({ id: 1 })
  UcTasksSchema.index({ name: 1 })
  return mongoose.model('UcTasks', UcTasksSchema, 'uc_tasks')
}
