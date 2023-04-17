/**
 * order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::order.order',
  ({ strapi }) => ({
    async create(ctx) {
      const { id } = ctx.state.user
      const body = {
        data: {
          ...ctx.request.body.data,
          userId: id,
        },
      }
      return strapi.service('api::order.order').create(body)
    },
    async find(ctx) {
      const { id } = ctx.state.user
      return strapi.service('api::order.order').find({
        filters: {
          userId: id,
        },
      })
    },
  }),
)
