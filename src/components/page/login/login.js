require("./login.scss")
const template = require("./login.tpl")
const Md5 = require("md5")  // 密码加密
const { Message, Loading } = require("element-ui")  // 加载提示

// 引入api.json文件
const apiPath = require("apiPath/api.json")

// 引用公用文件
const common = require("srcPath/utils/common")
const $ = require("jquery")

// 引入vuex store
import { mapActions } from "vuex"

export const login = {
  name: "login",
  data() {
    return {
      userName: common.getCookie("arLUName") ? common.getCookie("arLUName") : "",
      password: common.getCookie("arLPwd") ? common.getCookie("arLPwd") : "",
      checked: common.getCookie("arLPwd") !== "" // 在保存密码时会用到
    }
  },

  mounted() {
    // 清除用户信息
    common.loginExit()
    // 处理默认状态
    this.$root.$emit("loginData", {isLogin: false})
    document.title = "BANK OF CHINA - NEW YORK BRANCH"
  },

  methods: {
    ...mapActions([
      "setAside"
    ]),
    toLogin: function() {
      // 验证用户ID
      let getLName = this.userName
      if (getLName === "") {
        Message({message: "User Name can not be empty", type: "warning"})
        return false
      }

      // 验证用户密码
      let getLPwd = this.password
      if (getLPwd === "") {
        Message({message: "The user password can not be empty", type: "warning"})
        return false
      }

      // 用户昵称处理
      let setLName = getLName
      const getCLName = common.getCookie("arLUName")  // 获得cookie中的用户昵称
      if (getCLName && setLName === getCLName) {
        setLName = getLName
      }

      // 用户密码处理
      let setLPwd = Md5(getLPwd)
      const getCLPwd = common.getCookie("arLPwd")  // 获得cookie中的用户密码
      if (getCLPwd && getLPwd === getCLPwd) {
        setLPwd = getLPwd
      }

      // 如果勾选了记住密码
      if (this.checked) {
        common.setCookie("arLUName", setLName)  // 用户昵称
        common.setCookie("arLPwd", setLPwd)  // 用户加密后的密码
      } else {
        common.delCookie("arLUName")
        common.delCookie("arLPwd")
      }

      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "post",
        url: `${apiPath.user.login}`,
        data: {
          "userName": setLName,
          "password": setLPwd
        }
      }).then(response => {
        loadTips.close()
        if (response) {
          let dataInfo = response.data
          let arImg = dataInfo.user.profileImageUrl // 用户头像
          let arUCode = dataInfo.user.userCode // 用户编号
          let arUId = dataInfo.user.userId // 用户ID
          let arUName = dataInfo.user.userName // 用户昵称
          let arTk = dataInfo.user.token // 用户昵称
          let listMenu = window.JSON.stringify(dataInfo.listMenu)  // 权限菜单
          // 设置vuex store
          this.setAside(dataInfo.listMenu)

          // 设置想着用户信息
          common.loginOkCallBack(arImg, arUCode, arUId, arUName, arTk, listMenu)
          // common.loginOkCallBack(arImg, arUCode, arUId, arUName, arTk)
          // 事件广播
          this.$root.$emit("loginData", {isLogin: true}) // data是要传递的数据
          // 是否高级管理员或普通管理员(listMenu为0时为普通,普通时,只有用户中心页面)
          // 跳转页面
          if (dataInfo.listMenu.length > 0) {
            let hasRoleMana = false
            $.each(dataInfo.listMenu, (i, v) => {
              if (v.menuLevel === 2) {
                if (v.menuUrl.split(",")[0] === "roleMana") {
                  hasRoleMana = true
                  this.$router.push({name: "roleMana"})
                  return false
                }
              }
            })

            // 如果没有 roleMana 这个路由
            if (!hasRoleMana) {
              $.each(dataInfo.listMenu, (i, v) => {
                if (v.menuLevel === 2) {
                  this.$router.push({name: v.menuUrl.split(",")[0]})
                  return false
                }
              })
            }
          } else {
            // 如果没有管理员的权限,進入user頁面
            this.$router.push({name: "user"})

            // 如果不要上面的路由跳转(this.$router.push({name: "user"})),则可以用以下的URL跳转方法,相关参数可从上面获得
            // location.href = "https://www.google.com.hk?userId=AA&userName=TT&permission=B1,B2,B3"
          }
        }
      })
    }
  },
  template
}
