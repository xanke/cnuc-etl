'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  router.get('/etl', controller.etl.start)
  router.get('/etl/:id', controller.etl.status)
  router.put('/etl/:id', controller.etl.update)
}
