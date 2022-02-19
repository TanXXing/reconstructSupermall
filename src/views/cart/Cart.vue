<template>
  <div class="cart">
    <cart-nav-bar class="cart-nav-bar"></cart-nav-bar>
    <scroll :probe-type="3" :click="true" class="scroll" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-total></cart-total>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import CartNavBar from 'views/cart/childComps/CartNavBar'
import CartList from 'views/cart/childComps/CartList'
import CartTotal from 'views/cart/childComps/CartTotal'
export default {
  name: 'Cart',
  components: {
    CartNavBar,
    CartList,
    Scroll,
    CartTotal
  },
  data() {
    return {}
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style lang="scss" scoped>
.cart {
  .cart-nav-bar {
    position: relative;
    z-index: 9;
    background-color: var(--color-tint);
  }

  .scroll {
    height: calc(100vh - 133px);
  }
}
</style>
