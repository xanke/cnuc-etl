module.exports = app => {
  const mongoose = app.mongoose
  const CompaniesSchema = new mongoose.Schema({
    name: {
      type: String
    },
    city: {
      type: String
    },
    desc: {
      type: String
    },
    address: {
      type: Array
    },
    picUrl: {
      type: String
    },
    business: {
      type: Object
    },
    body: {
      type: Object
    },
    utime: {
      type: Date
    },
    origin: {
      type: String
    },
    url: {
      type: String
    },
    etl: {
      type: Boolean
    }
  })
  return mongoose.model('Companies', CompaniesSchema, 'companies')
}
