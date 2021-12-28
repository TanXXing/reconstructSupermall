import request from './index'

// 为什么这里需要对request做进一步的封装呢? 因为，Home.vue里面可能存在很多的请求，如果全部放到Home.vue里面的created这个
//生命周期函数里面的话，会造成，主页面有太多的不必要的逻辑
//另外，需要特别注意的是，这里只是对请求做进一步地疯转，并没有在这里去处理数据，我们还是希望在主页里面去处理数据的
//而且，注意，这个函数里面是可以不需要参数的，当调用这个函数的时候，直接把参数传递给request
export function getHomeMultidata() {
  const method = 'get';
  const url = '/home/multidata'
  return request({
    method,
    url
  })
}

// 获取goodsItem的数据
export function getHomeGoods(type, page) {
  return request({
    method: 'get',
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

// 进行数据的整合
/* class Recommend {
  constructor() {
    this.
  }
} */
