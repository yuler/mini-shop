import type { IApp } from '../app'
import enchangePage from '../enchange-page'

const $app = getApp<IApp>()

enchangePage({
  data: {
    orders: [],
    pagination: null as any,
  },
  async onLoad() {
    const { results, pagination } = await $app.$api({
      url: 'api/orders',
      method: 'GET',
    })
    this.setData({ orders: results, pagination })
  },
})
