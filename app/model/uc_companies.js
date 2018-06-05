module.exports = app => {
  const mongoose = app.mongoose
  const UcCompaniesSchema = new mongoose.Schema({
    name: {
      type: String, // 公司真名
    },
    title: {
      type: String, // 公司推广名
    },
    desc: {
      type: String, // 公司短简介
    },
    picUrl: {
      type: String, // 公司图标
    },
    address: {
      type: Array, // 公司地址
    },
    origin: {
      type: Array, // 原始资料
    },
    utime: {
      type: Date
    },
    isLock: {
      type: Boolean // 是否锁定
    }
  })
  return mongoose.model('UcCompanies', UcCompaniesSchema, 'uc_companies')
}
