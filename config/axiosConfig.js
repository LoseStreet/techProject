import Promise from "es6-promise"
Promise.polyfill()
import axios from "axios"
import Vue from "vue"
import qs from "qs"

import { Message, Loading } from "element-ui"  // 加载提示

// 设置baseURL
axios.defaults.baseURL = "https://weixin.yiqigogo.com"
// axios.defaults.headers['platformType'] = '2'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

// 请求拦截器
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(function (config) {
  if(config.method  === "post"){
    // config.data = qs.stringify(config.data)
    // console.log(config.data)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function(response) {
  // 移除加载显示
  if (typeof(response.data) === "object") {
    if(response.data.code === 0){

      return response.data
    } else if (response.data.code === 2) {

      $(".el-loading-mask").remove()
      location.href = "/#/"
    } else if (response.data.code === 1) {
      // 错误信息
      Message({message: response.data.message, type: "error"})
      return false
    } else {
      debugger
      return false
    }
  } else {
    return response.data
  }
}, function(responseError) {
  return Promise.reject(responseError)
})
