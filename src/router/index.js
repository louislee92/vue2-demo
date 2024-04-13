import Vue from 'vue'
import Router from 'vue-router'
import Module from '@/views/Module'
import PdfPreview from "../views/PdfPreview";
import PdfPreview2 from "../views/PdfPreview2";
import PdfDemo from "../views/PdfDemo.vue";

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
      path: '/module',
      name: "Module",
      component: Module,
      desc: 'Vuex模块化，Vuex-persistencestate持久化，secure-ls加密处理'
    },
    {
      path: '/pdf-preview',
      name: "PdfPreview",
      component: PdfPreview,
      desc: 'vue-pdf预览pdf文件流'
    },
    {
      path: '/pdf-preview2',
      name: "PdfPreview2",
      component: PdfPreview2,
      desc: 'vue-pdf预览pdf文件流2'
    },
    {
      path: '/PdfDemo',
      name: "PdfDemo",
      component: PdfDemo,
      desc: 'PdfDemo预览pdf'
    },


  ]
});

export default router
