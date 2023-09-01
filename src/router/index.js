import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Module from '@/views/Module'

Vue.use(Router)

// 解决重复跳转路由控制台抛异常问题
const originPush = Router.prototype.push
Router.prototype.push = function (location) {
  return originPush.call(this, location).catch(err => err)
}

const router = new Router({
  // mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: "Home",
      component: Home,
      desc: '首页导航'
    },
    {
      path: '/module',
      name: "Module",
      component: Module,
      desc: 'Vuex模块化，Vuex-persistencestate持久化，secure-ls加密处理'
    },
  ]
});

export default router
