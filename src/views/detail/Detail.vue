<template>
  <div id="detail">
    <detail-nav-bar
      :current-index="currentIndex"
      class="detail-nav-bar"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" :probe-type="3" @scroll="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-base-info="goodsBaseInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info
        :goods-info="goodsInfo"
        @goodsImgLoad="goodsImgLoad"
      ></detail-goods-info>
      <detail-params-info
        :goods-params="goodsParams"
        ref="params"
      ></detail-params-info>
      <detail-rate-info :rate-info="rateInfo" ref="rate"></detail-rate-info>
      <goods-list :goods-list="goodsList" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @cartClick="cartClick"></detail-bottom-bar>
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
  GoodsParams,
  CartGoodsInfo
} from 'network/detail'

import { debounce } from 'common/utils'

import { ADD_CART } from 'store/mutations-types'

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
      getOffsetTop: null,
      isShowBackTop: false,

      // 定义一个存储NavBar中每一项offsetTop的数组
      topThemeY: [],

      currentIndex: 0,

      // 存储itemInfo的信息，为点击加入购物车后，整合信息做准备
      itemInfo: {},

      // 获取每一项的iid
      iid: null
    }
  },
  created() {
    // 发起请求，获取数据
    this._getDetail()

    /*  1.这里获取offsetTop是不对的，因为，此时子组件的模板还未挂载，得到的
    this.$refs.params等为undefined*/
    /* console.log(this.$refs.params)
    this.topThemeY.push(0)
    this.topThemeY.push(this.$refs.params.$el.offsetTop)
    this.topThemeY.push(this.$refs.rate.$el.offsetTop)
    this.topThemeY.push(this.$refs.recommend.$el.offsetTop)
    console.log(this.topThemeY) */
  },
  mounted() {
    // 定义一个频繁触发的函数，为DetailGoodsInfo.vue里面的图片加载后refresh做准备
    this.getOffsetTop = debounce(() => {
      this.$refs.scroll.refresh()
      this.topThemeY = []
      this.topThemeY.push(0)
      this.topThemeY.push(this.$refs.params.$el.offsetTop)
      this.topThemeY.push(this.$refs.rate.$el.offsetTop)
      this.topThemeY.push(this.$refs.recommend.$el.offsetTop)
      this.topThemeY.push(Number.MAX_VALUE)
    }, 100)

    /* 2. 这个地方获取到的数据也不对，是因为由于rate.vue里面用到了v-if，于是，
   此时在父组件的mounted里面，是拿不到子组件的组件对象的，此时，更拿不到组件对象的根元素的(DOM)*/
    /* this.topThemeY.push(0)
    this.topThemeY.push(this.$refs.params.$el.offsetTop)
    this.topThemeY.push(this.$refs.rate.$el.offsetTop)
    this.topThemeY.push(this.$refs.recommend.$el.offsetTop)
    console.log(this.topThemeY) */
  },
  updated() {
    // 每次更新前topThemeY之前，将topThemeY进行清空
    /* 3.这个地方也可以拿到数据，但是，发现，有时候拿到的数据并不对 */
    /*
    (4) [0, 1622, 2349, 2538, __ob__: Observer]
    (4) [0, 4709, 5435, 5624, __ob__: Observer]
    (4) [0, 10906, 11632, 11821, __ob__: Observer]
     */
    /*
     那么，我该如何保证，即可以拿到数据，又如何保证，我拿到的数据是正确的呢？
      */
    /* 这说明，update里面执行时，意味着DOM更新了，但是，并不意味着它里面的图片等完全加载到了DOM里面*/
    /* this.topThemeY = []
    this.topThemeY.push(0)
    this.topThemeY.push(this.$refs.params.$el.offsetTop)
    this.topThemeY.push(this.$refs.rate.$el.offsetTop)
    this.topThemeY.push(this.$refs.recommend.$el.offsetTop)
    console.log(this.topThemeY) */
    // 利用nextTick()拿到的数据也可能不对
    /* this.$nextTick(() => {
      this.topThemeY = []
      this.topThemeY.push(0)
      this.topThemeY.push(this.$refs.params.$el.offsetTop)
      this.topThemeY.push(this.$refs.rate.$el.offsetTop)
      this.topThemeY.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.topThemeY)
    }) */
  },
  methods: {
    goodsImgLoad() {
      // 对DetailGoodsInfo.vue里面的图片refresh做防抖
      this.getOffsetTop()

      /* 首先，将获取topThemeY的操作放到imgload事件里面有两个不好的地方
      1. 此时，操作太频繁，需要进行防抖处理
      2. 这样，可能获取到多组topThemeY的数据，那么可不可能出现，
      这样的情况，比如：其中某些组的数据还不对，我已经点击了其中的某一项，这导致了
      跳转的位置不对，这个不大可能，因为，程序运行很快，而且，点击也是一个事件，在
      事件循环时，它可能还轮不到点击事件的处理时，topThemeY已经是最新的数据了
       */
    },
    // 回到顶部
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    scroll(positionY) {
      // 监听detailScroll中的滚动距离
      const absPositionY = -positionY
      this.isShowBackTop = absPositionY > 1500

      // 实现滚动的联动效果(对于一个数组使用，for...in...得到的index为字符串类型)
      const length = this.topThemeY.length
      const topThemeY = this.topThemeY
      /* for (let index = 0; index < length - 1; index++) {
        if (
          this.currentIndex !== index &&
          absPositionY < topThemeY[index + 1] &&
          absPositionY >= topThemeY[index]
        ) {
          console.log('------')
          this.currentIndex = index
        }
      }
      if (
        this.currentIndex !== length - 1 &&
        absPositionY >= topThemeY[length - 1]
      ) {
        console.log('-------')
        this.currentIndex = length - 1
      } */
      for (let index = 0; index < length - 1; index++) {
        if (
          // this.currentIndex !== index可以确保，减少下面的赋值语句，this.currentIndex = index
          this.currentIndex !== index &&
          absPositionY < topThemeY[index + 1] &&
          absPositionY >= topThemeY[index]
        ) {
          this.currentIndex = index
        }
      }
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.topThemeY[index], 500)
    },
    _getDetail() {
      getDetail(this.$route.params.iid).then((res) => {
        console.log(res)

        const data = res.result

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
          this.goodsList = res.data.list
        })

        // 8. 获取itemInfo,为后面的点击加入购物车，整合信息做准备
        this.itemInfo = data.itemInfo

        // 9. 获取每一项的iid
        this.iid = res.iid
        /*
        4. 这个地方，this.topThemeY里面的数据是改变了，但是，由于vue在更新DOM时，是异步更新的
        ，因此，尽管，此时this.topThemeY的数据，是改变了，但是this.$refs.params.$el的DOM并未更新
        ，因此，拿到的数据是不准确的
         */
        /* this.topThemeY.push(0)
        this.topThemeY.push(this.$refs.params.$el.offsetTop)
        this.topThemeY.push(this.$refs.rate.$el.offsetTop)
        this.topThemeY.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.topThemeY) */

        /*
        5. 这个地方使用了nextTick也是获取不到正确的数据，所以，这说明，DOM更新不等于图片
        已经在完全加载完了，因此，如何保证，获取到的数据完全是正确的呢？
        目前，有两种方案：
        1. 利用图片的load事件，这样，我们可能获取到最新的offsetTop,此时，可以结合防抖事件来处理
        2. offsetTop之所以不对，是因为，图片并没有完全加载，如果我们知道图片已经完全加载完了的话，那么，此时再去求offsetTop，不是可以了吗？
        第二种，方案的话，也可以，

         */
        /* this.$nextTick(() => {
          this.topThemeY.push(0)
          this.topThemeY.push(this.$refs.params.$el.offsetTop)
          this.topThemeY.push(this.$refs.rate.$el.offsetTop)
          this.topThemeY.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.topThemeY)
        }) */
      })
    },
    cartClick() {
      // 加入购物车点击后，需要获取并整理数据(我怎么知道获取的是不是点击的那个商品的数据呢？)
      // 1. 对获取到的商品信息进行整合
      const cartGoods = new CartGoodsInfo(this.itemInfo, this.iid)

      // 2. 对整合的信息, 进行存储，为了在购物车界面也可以使用(vuex进行状态管理)
      this.$store.dispatch(ADD_CART, cartGoods)

      // 解决滚动卡顿问题(这个refresh不能写在这里，这里不能保证是在商品加入购物车之后，才refresh的)
      // this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
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
