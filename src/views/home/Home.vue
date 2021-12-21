<template>
  <div id="Home">
    <home-nav-bar></home-nav-bar>
    <home-tab-control
      :tab-list="tabList"
      ref="tabControl1"
      v-show="false"
      @tabItemClick="tabItemClick"
    />
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      @scroll="scroll"
      @pullingUp="pullingUp"
      :probe-type="3"
      :pull-up-load="true"
      :click="true"
    >
      <home-swiper :banner="banner"></home-swiper>
      <home-recommend :recommed="recommend"></home-recommend>
      <home-feature />
      <home-tab-control
        :tab-list="tabList"
        ref="tabControl2"
        @tabItemClick="tabItemClick"
      />
      <goods-list :goods-list="this.goods[currentType].list"></goods-list>
    </scroll>
    <home-back-top ref="backTop" @backTopClick="backTopClick"></home-back-top>
  </div>
</template>

<script>
import HomeNavBar from 'views/home/childComps/HomeNavBar'
import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
import HomeRecommend from 'views/home/childComps/HomeRecommend.vue'
import HomeFeature from 'views/home/childComps/HomeFeature.vue'
import HomeTabControl from 'views/home/childComps/HomeTabControl.vue'
import HomeBackTop from 'views/home/childComps/HomeBackTop.vue'

import Scroll from 'components/common/scroll/Scroll.vue'

import GoodsList from 'components/context/goods/GoodsList.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home.js'

import { debounce } from 'common/utils'

export default {
  name: 'Home',
  components: {
    HomeNavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    HomeTabControl,
    HomeBackTop,
    GoodsList,
    Scroll
  },
  data() {
    return {
      banner: [],
      recommend: [],
      tabList: ['流行', '新款', '精选'],
      // 定义如何存储数据
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: 'pop',

      refresh: null
    }
  },
  created() {
    // console.log('Home.vue组件被创建')

    // 这里的做法是不想让created里面有太多的逻辑，所以，又将封装好的getHomeMultidata做了进一步地封装
    this._getHomeMultidata()

    //初始化goods里面的数据
    this._initGetHomeGoods()
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500)

    // 利用事件总线实现对goodsItem.vue中的img的load事件进行监听
    this.$bus.$on('goodsItemImgLoading', () => {
      console.log('refresh了吗？')
      this.refresh()
    })
  },
  destroyed() {
    // console.log('Home组件被销毁')
  },
  activated() {
    // console.log('Home.vue被激活')
  },
  deactivated() {
    // console.log('Home.vue失活')
  },
  methods: {
    // 获取swiper以及recommend中的数据
    _getHomeMultidata() {
      getHomeMultidata().then((res) => {
        const data = res.data
        // 处理swiper中的图片数据
        this.banner = data.banner.list

        // 处理recommend中的图片数据
        this.recommend = data.recommend.list
      })
    },

    // 初始化goods里面的数据
    _initGetHomeGoods() {
      this._getHomeGoods('pop', 1)
      this._getHomeGoods('new', 1)
      this._getHomeGoods('sell', 1)
    },
    // 获取goods中的数据
    _getHomeGoods(type, page) {
      getHomeGoods(type, page).then((res) => {
        // 打印数据看看
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++

        // 进行刷新，防止卡顿现象出现(coderWhy为什么不在那个这个地方refresh呢？，感觉在这个地方refresh效果也挺好的)
        // this.$refs.scroll.refresh()

        // 调用finishPullUp,为下一次上拉加载更多做准备
        this.$refs.scroll.finishPullUp()
      })
    },

    // 选项卡被点击
    tabItemClick(index) {
      // 通过点击tabControlItem来获取当前点击的index，进而改变传递的数据
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    // 上拉加载更多
    pullingUp() {
      //console.log('上拉加载更多')
      const currentType = this.currentType
      const page = this.goods[currentType].page
      // 再次请求数据
      this._getHomeGoods(currentType, page)
    },

    // backTop是否回到顶部
    scroll(positionY) {
      this.$refs.backTop.isShow = -positionY > 1500 ? true : false
    },
    // backTop被点击
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  height: calc(100vh - 93px);
}
</style>
