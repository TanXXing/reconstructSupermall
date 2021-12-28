<template>
  <div id="home">
    <home-nav-bar></home-nav-bar>
    <home-tab-control
      :tab-list="tabList"
      class="tabControl1"
      ref="tabControl1"
      v-show="isFixedTop"
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

// 通过辅助函数，将store中的getters映射为Home.vue中的局部计算属性
import { mapGetters } from 'vuex'

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
      // 定义TabControl中当前的类型
      currentType: 'pop',

      // 定义防抖函数中频繁触发的操作，注意不是频繁的操作，这二者是有区别的
      refresh: null,

      /* 最开始是妄想通过这个数据的改变，也就是MVVM中的model层的数据的改变，但是model层数据的改变是需要通过methods等事件监听
      中的操作来改变这个Model(模型层)中的数据，但是，我这里却使用了View(视图层)里面的数据根据model里面的数据变化的方式，来对
      model里面的数据进行改变，这肯定是不对的
      */
      // canTabOffsetTop: this.getThreeHomeImgLoaded

      // tabcontrol2
      // 判断何时获取tabControl2的offsetTop
      validImgLoadCount: 0,

      // tabControl2的高度是多少
      tabControl2OffsetTop: 0,

      // tabControl是否吸顶
      isFixedTop: false,

      // 记录离开Home.vue时，滚动的位置(因为使用keep-alive时，如果里面包括滚动的话，在返回该界面时，是无法保持滚动位置的)
      saveY: 0,

      scrollDis: 0
    }
  },
  computed: {
    ...mapGetters(['getThreeHomeImgLoaded'])
  },
  watch: {
    validImgLoadCount() {
      if (this.validImgLoadCount === 3) {
        // 获取TabControl的offsetTop
        this.tabControl2OffsetTop = this.$refs.tabControl2.$el.offsetTop

        //console.log(this.tabControl2OffsetTop)
      }
    }
  },
  created() {
    // console.log('Home.vue组件被创建')

    // 这里的做法是不想让created里面有太多的逻辑，所以，又将封装好的getHomeMultidata做了进一步地封装
    this._getHomeMultidata()

    //初始化goods里面的数据
    this._initGetHomeGoods()

    // 通过监听判断是否可以获取tabControl2的offsetTop
    this.canGetTab2OffsetTop()
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500)

    // 利用事件总线实现对goodsItem.vue中的img的load事件进行监听
    this.$bus.$on('goodsItemLoading', () => {
      // console.log('refresh了吗？')
      this.refresh()
    })
  },
  destroyed() {
    // console.log('Home组件被销毁')
  },
  activated() {
    console.log(this.$refs.scroll.scrollTo)
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    console.log(this.saveY)
    this.$refs.scroll.refresh()
    console.log('Home.vue被激活')
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY)
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
        //console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++

        // 进行刷新，防止卡顿现象出现(coderWhy为什么不在那个这个地方refresh呢？，感觉在这个地方refresh效果也挺好的)
        this.$refs.scroll.refresh()

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
      // 产生吸顶效果时，修改另外一个tabcontrol的currentIndex
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    // 上拉加载更多
    pullingUp() {
      //console.log('上拉加载更多')
      const currentType = this.currentType
      const page = this.goods[currentType].page
      // 再次请求数据
      this._getHomeGoods(currentType, page)
    },

    // 实时检测纵向滚动的距离
    scroll(positionY) {
      this.scrollDis = positionY
      // backTop是否回到顶部
      this.$refs.backTop.isShow = -positionY > 1500
      // 是否吸顶
      this.isFixedTop = -positionY >= 614
    },
    // backTop被点击
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },

    canGetTab2OffsetTop() {
      this.$bus.$on('featureImgLoad', () => {
        this.validImgLoadCount = this.getThreeHomeImgLoaded
      })

      this.$bus.$on('swiperAndRecommendImgLoad', () => {
        this.validImgLoadCount = this.getThreeHomeImgLoaded
      })
    }
  }
}
</script>

<style lang='scss' scoped>
#home {
  .tabControl1 {
    position: absolute;
    z-index: 9;
    background-color: #fff;
  }
  .scroll-wrapper {
    height: calc(100vh - 93px);
  }
}
</style>
