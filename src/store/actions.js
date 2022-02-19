import {
  ADD_CART,
  ADD_ONE_COUNT,
  ADD_ONE_KIND,
  changeAllCheckState
} from './mutations-types'

export default {
  // actions里面的第一个参数如果不是使用解构赋值的话，那么它的第一个参数就是context
  [ADD_CART](context, goodsItem) {
    // 定义一个标志位，用于判断是需要数量加一还是种类加一
    // 默认是种类加一
    let oldProduct = null
    // 在添加goodsItem之前，先判断是种类加一还是数量加一

    for (let cartItem of context.state.cartGoodsList) {
      (cartItem.iid === goodsItem.iid) && (oldProduct = cartItem)
    }

    // 商品数量加一
    if (oldProduct) {
      context.commit(ADD_ONE_COUNT, oldProduct)

    } else {
      // 商品种类加一
      goodsItem.count = 1;
      context.commit(ADD_ONE_KIND, goodsItem)
    }
  },
  [changeAllCheckState]({
    commit,
    rootGetters
  }) {
    // 判断全选按钮点击时，如果此时全选按钮的状态为true时，则将所有的isChecked变为false;
    if (rootGetters.getCheckAllState) {
      // 将全选变为非全选
      commit('notCheckAll')
    } else {
      // 将非全选，变为全选
      // 如果此时全选按钮的状态为false, 则此时，将每一项isChecked变为true
      commit('checkAll')
    }
  }


}
