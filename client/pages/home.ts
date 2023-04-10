import qs from 'qs'
import type {IApp} from '../app'
import enchangePage from '../enchange-page'

const $app = getApp<IApp>()

enchangePage({
  data: {
    products: [],
  },
  async onLoad() {
    const requestTask = wx.request({
      url: 'https://openai-proxy.yuler.dev/v1/chat/completions',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Authorization: `Bearer xxx`,
      },
      dataType: 'json',
      // responseType: 'arraybuffer',
      enableChunked: true,
      data: {
        model: 'gpt-3.5-turbo',
        frequency_penalty: 0,
        stream: true,
        presence_penalty: 0,
        max_tokens: 1024,
        n: 1,
        temperature: 0.5,
        messages: [{role: 'user', content: '用英文打个招呼'}],
        stop: ['<|im_end|>'],
      },
    })

    setTimeout(() => {
      requestTask.abort()
    }, 2000)
    requestTask.onChunkReceived(async (res: any) => {
      const decoder = new TextDecoder('utf-8')
      const values: string[] = decoder
        .decode(res.data)
        .split(/\n+/)
        .filter(Boolean)
        .map((str: string) => str.slice('data: '.length))
      values.map(value => {
        if (value === '[DONE]') return
        const chunk = JSON.parse(value)
        const content = chunk.choices[0].delta.content
        console.log(content)
      })
    })

    // const query = qs.stringify(
    //   {
    //     populate: {
    //       poster: {
    //         fields: ['url'],
    //       },
    //     },
    //   },
    //   {
    //     encode: false,
    //   },
    // )
    // const {data} = await $app.$api({
    //   url: `products?${query}`,
    //   method: 'GET',
    // })
    // this.setData({products: data})
  },
  gotoProduct(event: MP.Touch) {
    const {id} = event.currentTarget.dataset
    $app.$goto(`/pages/product/id?id=${id}`)
  },
})
