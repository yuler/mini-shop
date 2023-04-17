import qs from 'qs'
import type { IApp } from '../../app'
import enchangePage from '../../enchange-page'

const $app = getApp<IApp>()

enchangePage({
  data: {
    id: '',
    product: null,
    quantity: 1,
    remark: '',
    address: null as {
      // 省市区
      province: string
      city: string
      district: string
      // 邮编
      postalCode: string
      // 详细地址
      detail: string
      // 收货人姓名
      name: string
      // 收货人手机号
      mobile: string
    } | null,
  },
  async onLoad(options: any) {
    const { id } = options
    this.setData({ id })

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
      url: `api/products/${id}?${query}`,
      method: 'GET',
    })
    this.setData({ product: data })
  },

  // Methods
  async onChooseAddress() {
    const {
      provinceName,
      cityName,
      countyName,
      detailInfo,
      postalCode,
      userName,
      telNumber,
    } = await wx.chooseAddress()
    this.setData({
      address: {
        province: provinceName,
        city: cityName,
        district: countyName,
        postalCode,
        detail: detailInfo,
        name: userName,
        mobile: telNumber,
      },
    })
  },
  onPlus() {
    this.setData({ quantity: this.data.quantity + 1 })
  },
  onMinus() {
    if (this.data.quantity === 1) {
      return $app.$toast('❌  不能再少了 ~')
    }
    this.setData({ quantity: this.data.quantity - 1 })
  },
  async onSubmit() {
    if (!this.data.address) {
      return $app.$toast('❌  请先选择收货地址 ~')
    }
    const { id, quantity, remark, address } = this.data

    const _address = `${address.province} ${address.city} ${address.district} ${address.detail}`
    const { id: orderId } = await $app.$api({
      url: 'api/orders',
      method: 'POST',
      data: {
        data: {
          productId: id,
          quantity,
          remark,
          address: _address,
          mobile: address.mobile,
          name: address.name,
          postalCode: address.postalCode,
        },
      },
    })
    $app.$toast('✅  下单成功 ~')
    $app.$goto(`/pages/profile/order/${orderId}`)
  },
})
