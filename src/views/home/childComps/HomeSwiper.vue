<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index'

export default {
  name: 'HomeSwiper',
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      imgIsLoad: false
    }
  },
  methods: {
    /* swiperImgLoad() {
      this.imgIsLoad = true
      console.log('swiperImg加载了')
    } */
  }
  /* watch: {
    imgIsLoad() {
      console.log('imgIsLoad的值发生改变了')
    }
  } */
}
</script>

<style lang='scss' scoped>
</style>
