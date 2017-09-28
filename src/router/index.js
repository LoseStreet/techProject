import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

// 引用模板
const app = require("srcPath/app/app")
const pageLayout = require("comPath/layout/page-layout/page-layout")
const layout = require("comPath/layout/layout/layout")
const userPageLayout = require("comPath/layout/user-page-layout/user-page-layout")

// 登录与忘记密码
const {login} = require("comPath/page/login/login")
const forgotPwd = require("comPath/page/login/forgot-password")

// 用户中心
const userCenter = require("comPath/page/user/user-center")

// 权限管理-角色管理
const roleLayout = require("comPath/page/jurisdiction/rMana/role-layout")
const roleManaAdd = require("comPath/page/jurisdiction/rMana/role-management-add-modify")
const roleMana = require("comPath/page/jurisdiction/rMana/role-management")

// 权限管理-权限管理
const functionMana = require("comPath/page/jurisdiction/fMana/function-management")
// 权限管理-日志列表
const conlogLayout = require("comPath/page/jurisdiction/conlog/conlog-layout")
const conlog = require("comPath/page/jurisdiction/conlog/conlog")
const conlogDetails = require("comPath/page/jurisdiction/conlog/conlog-details")

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      component: layout,
      children: [
        {
          path: "",
          name: "login",
          component: login
        },
        {
          path: "forgotPwd",
          name: "forgotPwd",
          component: forgotPwd
        },
        {
          path: "userPageLayout",
          component: userPageLayout,
          children: [
            {
              path: "user",
              name: "user",
              component: userCenter
            },
            {
              path: "page",
              component: pageLayout,
              children: [
                {
                  path: "rMana",
                  name: "rMana",
                  component: roleLayout,
                  children: [
                    {
                      path: "roleMana",
                      name: "roleMana",
                      component: roleMana
                    },
                    {
                      path: "roleManaAdd",
                      name: "roleManaAdd",
                      component: roleManaAdd
                    }
                  ]
                },
                {
                  path: "fMana",
                  name: "fMana",
                  component: functionMana
                },
                {
                  path: "conlog",
                  name: "conlog",
                  component: conlogLayout,
                  children: [
                    {
                      path: "conlogList",
                      name: "conlogList",
                      component: conlog
                    },
                    {
                      path: "conlogDetails",
                      name: "conlogDetails",
                      component: conlogDetails
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
