<template>
  <div class="goods-list">
    <goods-list-item v-for="goodsItem in goodsList" :goods-item="goodsItem">
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: 'GoodsList',
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  },
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px 7px;
}
</style>
