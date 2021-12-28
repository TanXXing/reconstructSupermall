<template>
  <nav-bar class="home-nav">
    <span slot="center">购物街</span>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar.vue'

export default {
  name: 'HomeNavBar',
  components: {
    NavBar
  },
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.home-nav {
  position: relative;
  z-index: 9;
  background-color: var(--color-tint);
}
</style>
