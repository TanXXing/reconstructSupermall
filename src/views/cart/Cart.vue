<template>
  <div>
    <h2>这是Cart</h2>
    <goods-list></goods-list>
  </div>
</template>

<script>
import GoodsList from 'components/context/goods/GoodsList.vue'
export default {
  name: 'Cart',
  components: {
    GoodsList
  },
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
</style>
