<template>
  <div ref="wrapper" class="scroll-wrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    click: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.initBscroll()
  },
  methods: {
    initBscroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 是否派发滚动的事件以及确定滚动的类型
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        // 当click为false时，这意味着content里面非button的按钮都不能进行点击事件的正常监听(即使设置了监听，也不能
        //实现监听功能, 此处设置为true后，就可以对非button的元素实现正常的监听了)
        click: this.click
      })

      // 绑定事件,在滚动的时候，触发
      this.scroll.on('scroll', (position) => {
        // console.log(this.probeType)
        // console.log(position)
        this.$emit('scroll', position.y)
      })

      // 如果pullUpLoas为false的话，写了pullingUp的监听的话，它就会报错，所以要这么处理
      if (this.pullUpLoad) {
        // 绑定上拉加载更多的事件
        this.scroll.on('pullingUp', () => {
          // 当触发上拉加载更多的事件之后，不方便在这个里面去请求数据，因此，需要把事件传递出去，在Home.vue里面去处理
          this.$emit('pullingUp')
        })
      }
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo(x, y, time = 1000) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style lang='scss' scoped>
.scroll-wrapper {
  /* background-color: red; */
}
</style>
