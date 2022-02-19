<template>
  <div class="goods-count">
    <span class="decrease-count" @click="decreaseClick">-</span>
    <span class="real-count">{{ goodsCount }}</span>
    <span class="add-count" @click="addClick">+</span>
  </div>
</template>

<script>
export default {
  name: 'GoodsCount',
  props: {
    goodsCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
    addClick() {
      this.$emit('addGoodsCount')
    },
    decreaseClick() {
      this.$emit('decreaseGoodsCount')
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-count {
  text-align: center;
  border: 1px solid #cccc;
  border-radius: 15px;
  .add-count,
  .real-count,
  .decrease-count {
    font-size: 17px;
    display: inline-block;
  }
  .add-count,
  .decrease-count {
    padding: 0px 6px;
  }
  .real-count {
    width: 34px;
    border: 1px solid #ccc;
    border-top: none;
    border-bottom: none;
  }
}
</style>
