require("./login.scss")
const template = require("./login.tpl")
const Md5 = require("md5")  // 密码加密
const { Message, Loading } = require("element-ui")  // 加载提示

// 引入api.json文件
const apiPath = require("apiPath/api.json")

// 引用公用文件
const common = require("srcPath/utils/common")
const $ = require("jquery")

export const login = {
  name: "login",

  template,

  data() {
    return {
      successCodeFlag: false, // 成功获取验证码的标记
      successCode: "", // 成功获取的验证码
      countDown: 120, // 倒计时
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
  },

  methods: {
    getcode() {
      // 验证手机号码
      if (!common.telReg.test(this.userName)) {
        Message({message: "请输入正确的手机号码", type: "warning"})
        return false
      }

      let dataUrl = common.getDataToUrl({"mobile": this.userName})

      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "get",
        headers: {"platformType": 2},
        url: `${apiPath.user.getcode}?${dataUrl}`
      }).then(response => {
        loadTips.close()
        if (response) {
          this.successCodeFlag = true
          this.successCode = response.data
          Message({message: "验证码已发送至手机上,请查收", type: "success"})

          let countInterval = setInterval(function() {
            this.countDown--

            if (this.countDown <= 0) {
              this.successCode = false
              clearInterval(countInterval)
            }
          }.bind(this), 1000)
        }
      })
    },
    toLogin() {
      // 验证手机号码
      if (!common.telReg.test(this.userName)) {
        Message({message: "请输入正确的手机号码", type: "warning"})
        return false
      }

      // 验证码
      if (this.password === "") {
        Message({message: "验证码不但能为空", type: "warning"})
        return false
      }
      if (this.password === !this.successCode) {
        Message({message: "验证码有误", type: "warning"})
        return false
      }

      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "post",
        url: `${apiPath.user.login}`,
        headers: {"platformType": 2, "Content-Type": "text/html; charset=utf-8"},
        data: {
          "mobile": this.userName,
          "code": this.password,
          "platformType": 2
        }
      }).then(response => {
        loadTips.close()
        if (response) {
          let dataInfo = response.data
          let token = dataInfo.token // token
          let password = dataInfo.password // password
          let avatarUrl = dataInfo.avatarUrl // 头像
          let isAdmin = dataInfo.isAdmin // 是否管理员
          let isOwner = dataInfo.isOwner // 是否业主
          let isMember = dataInfo.isMember // 是否企业成员
          let id = dataInfo.id // 用户id

          // 记录用户信息
          common.loginOkCallBack(token, password, avatarUrl, isAdmin, isOwner, isMember, id)

          // 事件广播
          this.$root.$emit("loginData", {isLogin: true}) // data是要传递的数据

          // 跳转至企业页面
          this.$router.push({name: "company"})
        }
      })
    }
  }
}
