<template>
  <div class="cart-list">
    <cart-item
      v-for="(item, index) in cartList"
      :item="item"
      :index="index"
      class="cart-item"
      >{{ typeof index }}</cart-item
    >
  </div>
</template>

<script>
import CartItem from 'views/cart/childComps/CartItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    CartItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      cartList: 'getCartList'
    })
  }
}
</script>
<style lang="scss" scoped></style>
