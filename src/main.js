// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'viewerjs/dist/viewer.css'
import './styles/index.scss'
import App from './App'
import router from './router'
import store from "./store";
import VueLazyload from 'vue-lazyload'
const loadimage = require('./assets/loading-spin.svg')
const errorimage = require('./assets/404.jpg')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: errorimage,
  loading: loadimage,
  attempt: 1
})
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})




