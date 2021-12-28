<template>
  <div class="base-info" v-if="Object.keys(goodsBaseInfo).length">
    <div class="info-title">{{ goodsBaseInfo.title }}</div>
    <div class="info-price">
      <span>{{ goodsBaseInfo.newPrice }}</span>
      <span>{{ goodsBaseInfo.oldPrice }}</span>
      <span>{{ goodsBaseInfo.discount }}</span>
    </div>
    <div class="info-columns">
      <span v-for="index in goodsBaseInfo.columns.length - 1">
        {{ goodsBaseInfo.columns[index - 1] }}
      </span>
      <span>
        {{
          goodsBaseInfo.services[goodsBaseInfo.services.length - 1].name
        }}</span
      >
    </div>
    <div class="info-services">
      <div v-for="index in goodsBaseInfo.services.length - 1">
        <img :src="goodsBaseInfo.services[index - 1].icon" alt="" />
        <span>{{ goodsBaseInfo.services[index - 1].name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goodsBaseInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
@mixin flex {
  display: flex;
  justify-content: space-between;
}

.base-info {
  padding: 10px 8px 0px;
  font-size: 13px;
  border-bottom: 5px solid #f2f5f8;
  .info-title {
    font-size: 16px;
    color: #222;
  }
  .info-price {
    line-height: 27px;
    margin-top: 10px;
    span:nth-child(1) {
      font-size: 24px;
      color: var(--color-high-text);
    }

    span:nth-child(2) {
      color: #999;
      margin: 0px 3px;
      text-decoration-line: line-through;
    }
    span:nth-child(3) {
      position: absolute;
      line-height: 1.1;
      padding: 2px 5px;
      color: #fff;
      background-color: var(--color-high-text);
      border-radius: 9px/7px;
    }
  }
  .info-columns {
    @include flex;
    line-height: 30px;
    margin-top: 15px;
    color: #999;
    border-bottom: 1px solid #efefef;
  }
  .info-services {
    @include flex;
    line-height: 61px;
    color: #333;
    img {
      position: relative;
      top: 2px;
      width: 14px;
      height: 14px;
    }
  }
}
</style>
