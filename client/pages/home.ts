import type {IApp} from '../app'
import enchangePage from '../enchange-page'

const $app = getApp<IApp>()

enchangePage({
  data: {
    products: [],
  },
  async onLoad() {
    const {data} = await $app.$api({
      url: 'products',
      method: 'GET',
    })
    this.setData({products: data})
  },
  gotoProduct(event: MP.Touch) {
    const {id} = event.currentTarget.dataset
    $app.$goto(`/pages/product/id?id=${id}`)
  },
})
