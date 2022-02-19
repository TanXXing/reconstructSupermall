<template>
  <div class="cart-total">
    <div class="left">
      <div class="check-all">
        <check-button
          class="check-button"
          :is-checked="getCheckAllState"
          @click.native="checkAllClick"
        ></check-button>
      </div>
      <span>全选</span>
    </div>
    <div class="center">
      <span>合计: ¥{{ totalPrice }}</span>
    </div>
    <div class="right">
      <div>去计算({{ getCartLength }})</div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/context/checkButton/CheckButton.vue'
import { changeAllCheckState } from 'store/mutations-types'
import { mapGetters } from 'vuex'

export default {
  name: 'CartTotal',
  components: {
    CheckButton
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getCheckAllState', 'getCartLength', 'getCartList']),
    totalPrice() {
      return this.getCartList
        .filter((item) => item.isChecked)
        .reduce((acc, cur) => acc + cur.count * cur.price, 0)
        .toFixed(2)
    }
  },
  methods: {
    checkAllClick() {
      // console.log('全选按钮点击了')

      // 改变全选按钮的状态
      this.$store.dispatch(changeAllCheckState)
    }
  }
}
</script>
<style lang="scss" scoped>
.cart-total {
  display: flex;
  position: relative;
  z-index: 9;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: #eee;
  font-size: 16px;
  .left,
  .right {
    width: 100px;
  }
  .left {
    display: flex;
    align-items: center;
    .check-all {
      .check-button {
        width: 20px;
        height: 20px;
        margin: 0px 5px 0px 15px;
        border: 1px solid #ccc;
        border-radius: 16px;
        // 这里重置行高，是为了防止图片所在的父元素的高度确定了，由于line-height的继承，导致图片继续下移，图片虽然也会继承行高，但是，确定行框的大小时，图片的line-height不会参与其中
        line-height: 1;
      }
    }
  }
  .center {
    flex: 1;
  }
  .right {
    background-color: #ff4500;
    color: #fff;
  }
}
</style>
