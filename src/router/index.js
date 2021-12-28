import Vue from "vue";
import VueRouter from "vue-router";


// 导入路由组件
// 思考，什么是路由懒加载？为什么要使用路由懒加载？

// 下面是未进行路由懒加载时导入路由对应的组件的方式
/* import Home from 'views/home/Home.vue';
import Category from 'views/category/Category.vue';
import Cart from 'views/cart/Cart.vue';
import Profile from 'views/profile/Profile.vue';
import Detail from 'views/detail/Detail.vue' */


// 路由懒加载
const Home = () => import('views/home/Home.vue');
const Category = () => import('views/category/Category.vue')
const Cart = () => import('views/cart/Cart.vue');
const Profile = () => import('views/profile/Profile.vue')
const Detail = () => import('views/detail/Detail.vue')


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
  },
  {
    path: '/detail/:iid',
    name: 'detail',
    component: Detail
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
