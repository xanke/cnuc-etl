module.exports = app => {
  const mongoose = app.mongoose
  const UcCompaniesSchema = new mongoose.Schema({
    id: {
      type: String
    },
    name: {
      type: String // 公司真名
    },
    title: {
      type: String // 公司推广名
    },
    desc: {
      type: String // 公司短简介
    },
    picUrl: {
      type: String // 公司图标
    },
    address: {
      type: String // 公司地址
    },
    addresses: {
      type: Array // 公司地址集合
    },
    origins: {
      type: Array // 原始集合
    },
    utime: {
      type: Date
    },
    isLock: {
      type: Boolean // 是否锁定
    }
  })

  UcCompaniesSchema.index({ id: 1 })
  UcCompaniesSchema.index({ name: 1 })
  return mongoose.model('UcCompanies', UcCompaniesSchema, 'uc_companies')
}
