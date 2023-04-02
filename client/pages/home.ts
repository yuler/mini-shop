import type {IApp} from '../app'
import enchangePage from '../enchange-page'

const $app = getApp<IApp>()

enchangePage({
  data: {
    time: new Date().toLocaleString(),
  },
  onLoad() {
    /**
     * Event come from `app`
     * @example events
     */
    $app.$on('app:tick', () => {
      this.setData({
        time: new Date().toLocaleString(),
      })
    })
  },
  gotoProduct(event: MP.Touch) {
    const {id} = event.currentTarget.dataset
    $app.$goto(`/pages/product/id?id=${id}`)
  },
})
