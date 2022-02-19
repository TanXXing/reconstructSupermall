<template>
  <div class="cart-item">
    <div class="left">
      <check-button
        :is-checked="item.isChecked"
        @click.native="checkClick(index)"
      ></check-button>
    </div>
    <div class="center">
      <img :src="item.image" alt="" />
    </div>
    <div class="right-info">
      <div class="info-title">{{ item.title }}</div>
      <div class="info-desc">商品描述：{{ item.desc }}</div>
      <div class="info-buy">
        <div class="goods-price">¥{{ item.price }}</div>
        <div class="goods-count">
          <goods-count
            :goods-count="item.count"
            @addGoodsCount="addGoodsCount(index)"
            @decreaseGoodsCount="decreaseGoodsCount(index)"
          ></goods-count>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/context/checkButton/CheckButton.vue'
import GoodsCount from 'components/context/goodsCount/GoodsCount.vue'
import {
  BTN_ADD_ONE_COUNT,
  BTN_DECREASE_ONE_COUNT,
  changeIsChecked
} from 'store/mutations-types'

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  components: {
    CheckButton,
    GoodsCount
  },
  data() {
    return {}
  },
  methods: {
    addGoodsCount(index) {
      // this.$set(this.item, 'count', this.item.count++)
      // console.log('执行加一的操作了吗？')

      this.$store.commit(BTN_ADD_ONE_COUNT, index)
      // 不要在这里直接修改count的值
      // this.item.count++
    },
    decreaseGoodsCount(index) {
      // console.log('执行减一的操作了吗？')
      // this.$set(this.item, 'count', this.item.count--)
      this.$store.commit(BTN_DECREASE_ONE_COUNT, index)
      //不要在这里直接去修改count的值
      // this.item.count--
    },
    checkClick(index) {
      // console.log('check点击了')
      // 现在要改变vuex中cartGoodsList中每一项的isChecked的状态
      this.$store.commit(changeIsChecked, index)
    }
  }
}
</script>
<style lang="scss" scoped>
.cart-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #ccc;
  font-size: 17px;
  .left {
    display: flex;
    align-items: center;
    // 这个地方的是可以选中CheckButton.vue里面的.check-button对应的div元素的？
    .check-button {
      width: 18px;
      height: 18px;
      border-radius: 16px;
      border: 1px solid #aaa;
    }
  }
  .center {
    padding: 0px 5px;
    img {
      width: 80px;
      height: 100px;
      border-radius: 7px;
    }
  }
  .right-info {
    // 这个改成了margin: 0px 10px; 就可以解决那个给info-buy设置width:100%,宽度太大的问题
    // padding: 0px 10px;
    position: relative;
    margin: 0px 10px;
    overflow: hidden;
    .info-title,
    .info-desc {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .info-title {
      color: #333;
    }
    .info-desc {
      margin-top: 19px;
      font-size: 14px;
      color: #666;
    }
    .info-buy {
      display: flex;
      position: absolute;
      // 给.info-buy设置完width: 100%之后，可以解决给它设置position: absolute带来的宽度缩减的问题
      width: 100%;
      bottom: 5px;
      justify-content: space-between;
      .goods-price {
        color: orangered;
      }
      .goods-count {
        .add-count,
        .decrease-count {
          padding: 5px;
        }
      }
    }
  }
}
</style>
