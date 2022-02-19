<template>
  <div class="detail-bottom-bar">
    <div class="left">
      <div class="service left-item">
        <i class="icon service-icon"></i>
        <div class="text service-text">客服</div>
      </div>
      <div class="shop left-item">
        <i class="icon shop-icon"></i>
        <div class="text shop-text">店铺</div>
      </div>
      <div class="collect left-item">
        <i class="icon collect-icon"></i>
        <div class="text collect-text">收藏</div>
      </div>
    </div>
    <div class="right">
      <div class="add-cart right-item" @click="cartClick">
        <div class="cart-text">加入购物车</div>
      </div>
      <div class="buy right-item">
        <div class="buy-text">购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  components: {},
  data() {
    return {}
  },
  methods: {
    cartClick() {
      this.$emit('cartClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-bottom-bar {
  display: flex;
  position: relative;
  z-index: 9;
  height: 58px;
  background-color: #fff;
  text-align: center;
  .left {
    flex: 1;
    display: flex;
    font-size: 13px;
    .left-item {
      flex: 1;
      .icon {
        display: block;
        width: 22px;
        height: 22px;
        //background-image: url('../../../assets/img/detail/detail_bottom.png');
        background-image: url('~assets/img/detail/detail_bottom.png');
        background-repeat: no-repeat;
        background-origin: content-box;
        background-position: 0px -52px;
        background-size: 22px auto;
        margin: 10px auto 5px;
      }
      .shop-icon {
        background-position: 0px -96px;
      }
      .collect-icon {
        background-position: 0px -25px;
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    line-height: 58px;
    font-size: 15px;
    .right-item {
      flex: 1;
      text-align: center;
    }

    .add-cart {
      background-color: #ffe817;
    }
    .buy {
      background-color: #f69;
      color: #fff;
    }
  }
}
</style>
