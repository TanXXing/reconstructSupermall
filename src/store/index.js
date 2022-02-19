// 1. 导入
import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// 2. 安装插件vuex
Vue.use(Vuex)

// 3. 创建vuex的store对象
const store = new Vuex.Store({
  state: {
    threeHomeImgLoaded: 0,
    cartGoodsList: []
  },
  mutations,
  getters,
  actions
})

// 4.导出store对象
export default store
