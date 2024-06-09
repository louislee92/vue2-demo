export default {
  router:  [
    {path: '/home', label: '首页', component: () => import('../views/Home.vue')},
    {path: '/demo-vuex-module', label: 'vuex模块化', component: () => import('../views/DemoVuexModule.vue')},
    {path: '/demo-font', label: '字体测试', component: () => import('../views/DemoFont.vue')},
    {path: '/demo-pdf', label: 'PDF.js预览', component: () => import('../views/DemoPdf.vue')},
    {path: '/demo-pdf-viewer', label: 'PDF官方预览', component: () => import('../views/DemoPdfViewer.vue')},
    {path: '/demo-drag', label: '拖拽示例', component: () => import('../views/DemoDrag.vue')},
    {path: '/demo-ctp-form', label: '表单组件', component: () => import('../views/DemoCtpForm.vue')},
    {path: '/demo-maxbox', label: 'Mapbbox', component: () => import('../views/DemoMapbox.vue')},
    {path: '/demo-antv-x6', label: 'AntvX6', component: () => import('../views/DemoX6.vue')}
  ]
}
