<template>
  <back-top class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </back-top>
</template>

<script>
import BackTop from 'components/context/backTop/BackTop.vue'
export default {
  name: 'DetailBackTop',
  components: {
    BackTop
  },
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.back-top {
  position: absolute;
  bottom: 93px;
  right: 8px;
  width: 43px;
  height: 43px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
