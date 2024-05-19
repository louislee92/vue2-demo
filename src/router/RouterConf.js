export default {
  router:  [
    {path: '/home', label: '首页', component: () => import('../views/Home.vue')},
    {path: '/demo-vuex-module', label: 'vuex模块化', component: () => import('../views/DemoVuexModule.vue')},
    {path: '/demo-font', label: '字体测试', component: () => import('../views/DemoFont.vue')},
    {path: '/demo-pdf', label: 'PDF.js预览', component: () => import('../views/DemoPdf.vue')},
    {path: '/demo-pdf-viewer', label: 'PDF官方预览', component: () => import('../views/DemoPdfViewer.vue')}
  ]
}
