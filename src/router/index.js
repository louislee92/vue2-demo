import Vue from 'vue'
import Router from 'vue-router'
import RouterConf from "./RouterConf";

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
    {path: '/', component: () => import('../views/Index.vue'),
      redirect:'/home',
      children: [{path: '/error',  component: () => import('../views/Error.vue')}].concat(RouterConf.router)},
    {path: '*', redirect:'/error'},
  ]
});

export default router
