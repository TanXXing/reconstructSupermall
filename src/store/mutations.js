import getters from './getters';
import {
  ADD_ONE_COUNT,
  ADD_ONE_KIND,
  BTN_ADD_ONE_COUNT,
  BTN_DECREASE_ONE_COUNT,
  changeIsChecked
} from './mutations-types'

export default {
  countImgLoaded(state) {
    state.threeHomeImgLoaded++
  },
  // 购物车商品数量加一
  [ADD_ONE_COUNT](state, oldProduct) {
    oldProduct.count++
  },
  // 购物车商品种类加一
  [ADD_ONE_KIND](state, goodsItem) {
    // 加入购物车的商品，此时默认的是选中的
    goodsItem.isChecked = true;
    state.cartGoodsList.push(goodsItem)

    /* 解决购物车界面，当添加完购物车之后，出现不能滚动的问题，其实，写在
    这里也不对，因为，此时，只能证明数据改变了，但是，dom可能并没有更新，
    那我是否可以去检测它的数据是否发生了变化，如果发生了变化，再利用nextTick在这个
    异步回调里面进行refresh呢？但是，这里有一个问题时，这个数据在vuex里面，
    难道把这个数据映射到某个组件里面，然后，在监听这个数据是否变化，如果
    发生了变化的话，就refresh吗？可以试试
    */
    // this.$refs.scroll.refresh()
  },

  // 通过按钮使得商品数量加一
  [BTN_ADD_ONE_COUNT](state, index) {
    state.cartGoodsList[index].count++
  },

  //通过按钮使得商品数量减一
  [BTN_DECREASE_ONE_COUNT](state, index) {
    state.cartGoodsList[index].count--
  },

  // 改变商品的选中状态
  [changeIsChecked](state, index) {
    state.cartGoodsList[index].isChecked = !state.cartGoodsList[index].isChecked
  },

  // 将全选按钮的状态从非全选变为全选
  checkAll(state, getters) {
    for (const goodsItem of state.cartGoodsList) {
      if (!goodsItem.isChecked) goodsItem.isChecked = true;
    }
  },

  // 将全选按钮的状态从全选变为非全选
  notCheckAll(state) {
    for (const goodsItem of state.cartGoodsList) {
      goodsItem.isChecked = false;
    }
  }
}
