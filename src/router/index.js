import Vue from "vue";
import VueRouter from "vue-router";


// 导入路由组件
import Home from 'views/home/Home.vue';
import Category from 'views/category/Category.vue';
import Cart from 'views/cart/Cart.vue';
import Profile from 'views/profile/Profile.vue';


// 安装插件
Vue.use(VueRouter)

// 进行路由的配置
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};


const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err);
}

export default router;
