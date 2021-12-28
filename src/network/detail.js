import request from './index'

// 获取Detail.vue中的数据
export function getDetail(iid) {
  return request({
    method: 'get',
    url: '/detail',
    params: {
      iid,
    }
  })
}


// 获取推荐信息
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 进行数据的整合

// 对基本信息进行整合
export class GoodsBaseInfo{
  constructor(columns, shopInfo, itemInfo) {
    // columns[2] = shopInfo.services[4].name;
    this.columns = columns;
    this.services = shopInfo.services;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.nowPrice = itemInfo.highNowPrice;
    this.lowPrice = itemInfo.lowPrice;
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.discount = itemInfo.discountDesc;
  }
}



// 对商品参数信息进行整合
export class GoodsParams {
  constructor(info, rule) {
    this.product = info.set
    this.size = rule.tables[0]
  }
}


