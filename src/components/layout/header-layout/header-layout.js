require("./header-layout.scss")
const template = require("./header-layout.tpl")
const arImg = require("../../../images/common/default.jpg")  // 默认头像
// 引用公用文件
const common = require("srcPath/utils/common")

const $ = require("jquery")
const { Message, Loading } = require("element-ui")

// 接口环境
const apiUrl = require("../../../../config/host")

module.exports = {
  template,
  props: {},
  data() {
    return {
      arImg: arImg,  // 用户头像
      arName: "",
      isLogin: false  // 是否已登录  默认为没登录
    }
  },

  // 监事变化
  watch: {
    isLogin(newObj, oldObj) {
      this.arName = common.getCookie("arUName") ? common.getCookie("arUName") : ""
      this.arImg = common.getCookie("arImg") ? apiUrl.apiUrl + common.getCookie("arImg") : arImg  // 用户头像
    }
  },

  // 初始化
  mounted() {
    // 先检测是否已登录
    if (common.isLogin()) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }

    // 监听页面的数据传递
    this.$root.$on("loginData", (obj) => {
      let getObj = obj
      this.isLogin = getObj.isLogin
      this.arName = common.getCookie("arUName") ? common.getCookie("arUName") : ""
      this.arImg = common.getCookie("arImg") ? apiUrl.apiUrl + common.getCookie("arImg") : arImg  // 用户头像
    })
  },

  // 方法
  methods: {

    // 退出登录
    loginout() {
      // 请求参数
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId")
      }
      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "post",
        url: "/logout",
        data: data
      }).then(response => {
        loadTips.close()
        if (response && response.status === 0) {
          this.isLogin = false
          location.href = "/#/"
        }
      })
    }
  }
}
