require("./forgot-password.scss")
const template = require("./forgot-password.tpl")
const { Message, Loading } = require("element-ui")  // 加载提示

// 引入api.json文件
const apiPath = require("apiPath/api.json")

// 引用公用文件
const common = require("srcPath/utils/common")

module.exports = {
  name: "forgot-password",
  data() {
    return {
      userName: ""
    }
  },
  ready() {},

  methods: {
    send() {
      // 验证用户名
      let getLName = this.userName
      if (getLName === "") {
        Message({message: "User ID can not be empty", type: "warning"})
        return false
      }

      let data = {
        userName: getLName
      }
      let dataUrl = common.getDataToUrl(data)

      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "get",
        url: `${apiPath.user.forgotPassword}?${dataUrl}`
      }).then(response => {
        loadTips.close()
        if (response && response.status === 0) {
          Message({message: "Password has been sent to your mailbox, please check!", type: "success"})
          this.userName = ""
        }
      })
    }
  },
  template,

  route: {},
  vuex: {}
}
