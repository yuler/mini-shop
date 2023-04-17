import type { IApp } from '../app'
import enchangePage from '../enchange-page'

const $app = getApp<IApp>()

enchangePage({
  async onLoad() {
    const { data } = await $app.$api({
      url: 'api/orders',
      method: 'GET',
    })
    console.log(data)
  },
})
