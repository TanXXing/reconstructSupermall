// 1. 导入
import Vue from 'vue';
import Vuex from 'vuex';

// 2. 安装插件vuex
Vue.use(Vuex)

// 3. 创建vuex的store对象
const store = new Vuex.Store({
  state: {
    threeHomeImgLoaded: 0
  },
  mutations: {
    countImgLoaded(state) {
      state.threeHomeImgLoaded++
    }
  },
  getters: {
    getThreeHomeImgLoaded(state) {
      return state.threeHomeImgLoaded
    }
  },
  actions: {

  },
  modules: {

  }
})

// 4.导出store对象
export default store
