<template>
  <back-top class="back-top" v-show="isShow" @click.native="bacKTopClick">
    <img src="~assets/img/common/top.png" alt="" />
  </back-top>
</template>

<script>
import BackTop from 'components/context/backTop/BackTop'
export default {
  name: 'HomeBackTop',
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    bacKTopClick() {
      this.$emit('backTopClick')
    }
  }
}
</script>

<style lang='scss' scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
  z-index: 9;

  img {
    width: 45px;
    height: 45px;
  }
}
</style>
