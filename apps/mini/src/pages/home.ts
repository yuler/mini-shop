import qs from 'qs'
import type { IApp } from '../app'
import enchangePage from '../enchange-page'

const $app = getApp<IApp>()

enchangePage({
  data: {
    products: [],
  },

  async onLoad() {
    const query = qs.stringify(
      {
        populate: {
          poster: {
            fields: ['url'],
          },
        },
      },
      {
        encode: false,
      },
    )
    const { data } = await $app.$api({
      url: `api/products?${query}`,
      method: 'GET',
    })
    this.setData({ products: data })
  },

  onShareAppMessage() {},

  gotoProduct(event: MP.Touch) {
    const { id } = event.currentTarget.dataset
    $app.$goto(`/pages/product/id?id=${id}`)
  },
})
