<template>
  <div class="detail-goods-info" v-if="Object.keys(goodsInfo).length">
    <div class="info-desc">
      <div class="start"></div>
      <p class="title">{{ goodsInfo.desc }}</p>
      <div class="end"></div>
    </div>
    <div class="info-show">
      <div class="info-key">{{ goodsInfo.detailImage[0].key }}</div>
      <div class="info-list">
        <div class="img-list" v-for="item in goodsInfo.detailImage[0].list">
          <img class="img" :src="item" alt="" @load="goodsImgLoad" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    goodsImgLoad() {
      this.$emit('goodsImgLoad')
    }
  }
}
</script>

<style lang='scss' scoped>
@mixin get-black-square {
  position: relative;
  width: 5px;
  height: 5px;
  background-color: #333;
}

@mixin get-black-underline {
  content: '';
  position: absolute;
  width: 90px;
  height: 1px;
  background-color: #333;
}

.detail-goods-info {
  padding-bottom: 20px;
  border-bottom: 5px solid #f2f5f8;
  .info-desc {
    margin: 20px 0px;
    .start,
    .end {
      @include get-black-square;
      &::before {
        @include get-black-underline;
      }
    }
    .start {
      left: 15px;
      &::after {
        top: 5px;
      }
    }
    .title {
      padding: 15px;
      font-size: 14px;
    }
    .end {
      left: 355px;
      &::before {
        top: 5px;
        right: 0px;
      }
    }
  }
  .info-show {
    font-size: 15px;
    .info-key {
      margin: 10px 0px 10px 15px;
    }
    .info-list {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
