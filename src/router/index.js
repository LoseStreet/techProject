import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

// 引用模板
const { pageLayout } = require("comPath/layout/page-layout/page-layout")

// 登录与忘记密码
const { login } = require("comPath/page/login/login")

// 企业
const { company } = require("comPath/page/company/company")
const { auditCompany } = require("comPath/page/company/audit-company")

// 餐馆
const { restaurant } = require("comPath/page/restaurant/restaurant")
const { auditRestaurant } = require("comPath/page/restaurant/audit-restaurant")

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "login"
      }
    },
    {
      path: "/login",
      name: "login",
      meta: {title: "一企网"},
      component: login
    },
    {
      path: "/page",
      name: "page",
      component: pageLayout,
      children: [
        {
          path: "company",
          name: "company",
          meta: {title: "企业列表"},
          component: company
        },
        {
          path: "auditCompany",
          name: "auditCompany",
          meta: {title: "企业认领"},
          component: auditCompany
        },
        {
          path: "restaurant",
          name: "restaurant",
          meta: {title: "餐馆列表"},
          component: restaurant
        },
        {
          path: "auditRestaurant",
          name: "auditRestaurant",
          meta: {title: "餐馆认领"},
          component: auditRestaurant
        }
      ]
    },
    {
      path: "*",
      redirect: {
        name: "login"
      }
    }
  ]
})
