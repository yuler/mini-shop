import type {IApp} from '../../app'
import enchangePage from '../../enchange-page'

const $app = getApp<IApp>()

enchangePage({
  data: {
    id: '',
  },
  onLoad(event: any) {
    const {id} = event
    this.setData({id})
  },
  gotoConfirm() {
    const {id} = this.data
    $app.$goto(`/pages/product/confirm?id=${id}`)
  },
})
