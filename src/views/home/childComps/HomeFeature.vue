<template>
  <div class="home-feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="imgLoad" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'HomeFeature',
  data() {
    return {}
  },
  methods: {
    imgLoad() {
      this.$store.commit('countImgLoaded')
      this.$bus.$emit('featureImgLoad')
    }
  }
}
</script>

<style lang='scss' scoped>
.home-feature {
  img {
    width: 100%;
    height: 270px;
  }
}
</style>
