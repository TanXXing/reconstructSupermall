

// 定义一个混入对象
export const homeImgLoadToTabOffsetTop = {
  data() {
    return {
      imgIsLoad: false
    }
  },
  methods: {
    imgLoad() {
      if (!this.imgIsLoad) {
        this.imgIsLoad = true
        this.$store.commit('countImgLoaded')
        this.$bus.$emit('swiperAndRecommendImgLoad')
      }
    }
  }
}


