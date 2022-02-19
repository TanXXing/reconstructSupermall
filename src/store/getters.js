export default {
  getThreeHomeImgLoaded(state) {
    return state.threeHomeImgLoaded
  },
  getCartList(state) {
    return state.cartGoodsList
  },
  getCartLength(state, getters) {
    return getters.getCartList.length
  },
  getCheckAllState(state, getters) {
    // 首先，判断cartGoodsList中是否有商品，没有，则返回false
    if (!getters.getCartLength) return false

    // 全选按钮的状态默认为true
    let allCheckedFlag = true
    for (const goodsItem of getters.getCartList) {
      // 如果发现有一个goodsItem.isChecked为false，那么全选状态就是false
      if (!goodsItem.isChecked) allCheckedFlag = false
    }
    return allCheckedFlag
  }
}
