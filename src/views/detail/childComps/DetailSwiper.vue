<template>
  <swiper class="detail-swiper">
    <swiper-item class="swiper-item" v-for="item in topImages">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index'

export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
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
    return {}
  }
}
</script>

<style lang='scss' scoped>
.detail-swiper {
  .swiper-item {
    width: 100%;
    height: 300px;
  }
}
</style>
