// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from "vue"
import App from "./app/app"
import router from "./router"

// 使用ElementUI组件
import ElementUI from "element-ui"
import "element-ui/lib/theme-default/index.css"
import locale from "element-ui/lib/locale"
import enLocale from "element-ui/lib/locale/lang/en"
// 设置语言
locale.use(enLocale)
Vue.use(ElementUI)

// 使用axios请求数
import axios from "axios"
import axiosConfig from "rootPath/config/axiosConfig"
Vue.prototype.$ajax = axios

import $ from "jquery"
const common = require("./utils/common")

/* 自定义样式 */
import "./assets/style.css"

Vue.config.productionTip = false


// 路由跳转前的处理
router.beforeEach((to, from, next) => {
  // 跳转前先检测打开的页面链接是否不是登录页，且没有token值，跳转到登录页
  let token = common.getCookie("gotoken")
  // if (!token && to.path.search(/page/) >= 0) {
  //   router.go({
  //     name: "login"
  //   })
  // }

  to && to.meta && to.meta.title ? document.title = to.meta.title : ""
  next()
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
})
