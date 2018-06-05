module.exports = appInfo => {
  const config = (exports = {})
  config.keys = appInfo.name + '_1517557438743_8898'

  config.mongoose = {
    url:
      'mongodb://shsdr:SHzhysdr!!804@xk-sh2.xanke.net:17033/cnuc-scan?authSource=admin'
  }

  config.security = {
    csrf: {
      enable: false
    }
  }
  
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  return config
}
