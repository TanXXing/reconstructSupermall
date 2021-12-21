<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="checked-icon" src="~assets/img/tabbar/home.svg" alt="" />
      <img slot="actived-icon" src="~assets/img/tabbar/home_active.svg" alt="" />
      <span slot="text">首页</span>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="checked-icon" src="~assets/img/tabbar/category.svg" alt="" />
      <img slot="actived-icon" src="~assets/img/tabbar/category_active.svg" alt="" />
      <span slot="text">分类</span>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="checked-icon" src="~assets/img/tabbar/shopcart.svg" alt="" />
      <img slot="actived-icon" src="~assets/img/tabbar/shopcart_active.svg" alt="" />
      <span slot="text">购物车</span>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="checked-icon" src="~assets/img/tabbar/profile.svg" alt="" />
      <img slot="actived-icon" src="~assets/img/tabbar/profile_active.svg" alt="" />
      <span slot="text">我的</span>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// 导入子组件
import TabBar from 'components/common/tabBar/TabBar.vue'
import TabBarItem from 'components/common/tabBar/tabBarItem.vue'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
</style>
