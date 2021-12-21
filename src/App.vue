<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
//导入子组件
import MainTabBar from 'components/context/mainTabBar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style lang='scss' scoped>
// 导入样式
@import 'assets/css/base.css';
</style>
