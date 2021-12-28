<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" :probe-type="3" @scroll="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-base-info="goodsBaseInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info
        :goods-info="goodsInfo"
        @goodsImgLoad="goodsImgLoad"
      ></detail-goods-info>
      <detail-params-info :goods-params="goodsParams"></detail-params-info>
      <detail-rate-info :rate-info="rateInfo"></detail-rate-info>
      <goods-list :goods-list="goodsList"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <detail-back-top
      v-show="isShowBackTop"
      @click.native="backTopClick"
    ></detail-back-top>
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar.vue'
import DetailSwiper from 'views/detail/childComps/DetailSwiper.vue'
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo.vue'
import DetailShopInfo from 'views/detail/childComps/DetailShopInfo.vue'
import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo.vue'
import DetailParamsInfo from 'views/detail/childComps/DetailParamsInfo.vue'
import DetailRateInfo from 'views/detail/childComps/DetailRateInfo.vue'
import DetailBottomBar from 'views/detail/childComps/DetailBottomBar.vue'
import DetailBackTop from 'views/detail/childComps/DetailBackTop.vue'

import Scroll from 'components/common/scroll/Scroll.vue'

import GoodsList from 'components/context/goods/GoodsList.vue'

import {
  getDetail,
  getRecommend,
  GoodsBaseInfo,
  GoodsParams
} from 'network/detail'

import { debounce } from 'common/utils'

export default {
  name: 'Detail',
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailRateInfo,
    DetailBottomBar,
    DetailBackTop,
    GoodsList
  },
  data() {
    return {
      topImages: [],
      goodsBaseInfo: {},
      shopInfo: {},
      goodsInfo: {},
      goodsParams: {},
      rateInfo: [],
      goodsList: [],
      // 定义一个频繁触发的函数
      refresh: null,
      isShowBackTop: false
    }
  },
  created() {
    getDetail(this.$route.params.iid).then((res) => {
      const data = res.result
      console.log(data)

      // 1. 获取轮播图数据
      this.topImages = data.itemInfo.topImages

      // 2. 获取基本信息
      this.goodsBaseInfo = new GoodsBaseInfo(
        data.columns,
        data.shopInfo,
        data.itemInfo
      )

      // 3. 获取商家(店铺)信息
      this.shopInfo = data.shopInfo

      // 4. 获取商品的详情信息
      this.goodsInfo = data.detailInfo

      // 5. 获取商品参数信息
      const itemParams = data.itemParams
      this.goodsParams = new GoodsParams(itemParams.info, itemParams.rule)

      // 6. 获取用户评价信息
      this.rateInfo = data.rate.list

      // 7. 获取推荐信息
      getRecommend().then((res) => {
        console.log(res.data.list)
        this.goodsList = res.data.list
      })
    })
  },
  mounted() {
    // 定义一个频繁触发的函数，为DetailGoodsInfo.vue里面的图片加载后refresh做准备
    this.refresh = debounce(this.$refs.scroll.refresh, 300)
  },
  methods: {
    goodsImgLoad() {
      // 对DetailGoodsInfo.vue里面的图片refresh做防抖
      this.refresh()
    },
    // 回到顶部
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    scroll(positionY) {
      // 监听detailScroll中的滚动距离
      this.isShowBackTop = -positionY > 1500
    }
  }
}
</script>

<style lang='scss' scoped>
#detail {
  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-scroll {
    height: calc(100vh - 102px);
  }
}
</style>
