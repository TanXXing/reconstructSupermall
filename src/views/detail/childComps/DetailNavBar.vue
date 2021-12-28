<template>
  <nav-bar class="detail-nav-bar">
    <img
      src="~assets/img/common/back.svg"
      alt=""
      slot="left"
      @click="backClick"
    />
    <div slot="center" class="center">
      <span>商品</span>
      <span>参数</span>
      <span>评论</span>
      <span>推荐</span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar.vue'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {}
  },
  methods: {
    backClick() {
      console.log('backClick')
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.detail-nav-bar {
  background-color: #fff;
  img {
    vertical-align: middle;
  }
  .center {
    display: flex;
    span {
      flex: 1;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
