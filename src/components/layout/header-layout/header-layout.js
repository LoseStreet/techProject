require("./header-layout.scss")
const template = require("./header-layout.tpl")

const arImg = require("../../../images/default.jpg")  // 默认头像
// 引用公用文件
const common = require("srcPath/utils/common")

const $ = require("jquery")
const { Message, Loading } = require("element-ui")

export const headerLayout = {
  name: "header-layout",

  template,

  data() {
    return {
      isLogin: false  // 是否已登录  默认为没登录
    }
  },

  // 初始化
  mounted() {
    // 先检测是否已登录
    // if (common.isLogin()) {
    //   this.isLogin = true
    // } else {
    //   this.isLogin = false
    // }

    // 监听页面的数据传递
    // this.$root.$on("loginData", (obj) => {})
  },

  // 方法
  methods: {

    // 退出登录
    loginout() {}
  }
}
