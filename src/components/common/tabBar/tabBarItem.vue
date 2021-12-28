<template>
  <div class="tab-bar-item" @click="tabBarItemClick">
    <div v-if="!isActive" class="icon"><slot name="checked-icon"></slot></div>
    <div v-else class="icon"><slot name="actived-icon"></slot></div>
    <!-- <div class="text" v-bind:class="{ active: isActive }">
      <slot name="text"></slot>
    </div> -->
    <div class="text" :style="activeStyle">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabBarItem',
  props: {
    path: {
      type: String,
      required: true
    },
    activeColor: {
      type: String,
      default: '#ff5777'
    }
  },
  data() {
    return {}
  },
  computed: {
    isActive() {
      /* 这样写其实不合适，因为，当涉及到一些嵌套路由的时候，这个就会出问题(后面再处理)*/
      return this.$route.path === this.path
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    tabBarItemClick() {
      // 进行路由的跳转(路由从哪获取呢？)
      this.$router.push({ path: this.path })
    }
  }
}
</script>

<style lang='scss' scoped>
$width: 24px;
.tab-bar-item {
  flex: 1;
  text-align: center;
  margin: 3px 0px 0px 0px;
  .icon {
    img {
      width: $width;
      height: $width;
    }
  }
  .text {
    font-size: 14px;
  }

  /* 要想对这个组件封装的很好，这里的动态绑定class属性不合适，我们
  希望，这个颜色可以选择，通过外界传递过来的
  1. 使用css自定义属性(变量)：可以，但是不太好，因为，有的人不使用css的自定义属性
  */

  /*  .active {
    color: red;
  } */
}
</style>
