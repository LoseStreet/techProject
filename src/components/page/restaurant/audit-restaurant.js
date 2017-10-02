require("./audit-restaurant.scss")

const template = require("./audit-restaurant.tpl")

// 引用公用文件
const common = require("srcPath/utils/common")

const $ = require("jquery")
const { Message, MessageBox, Loading } = require("element-ui")

// 引入api.json文件
const apiPath = require("apiPath/api.json")

export const auditRestaurant = {
  name: "audit-restaurant",

  template,

  data() {
    return {
      mobile: "",
      code: "",
      successCodeFlag: false, // 成功获取验证码的标记
      successCode: "", // 成功获取的验证码
      countDown: 120 // 倒计时
    }
  },

  created() {
    $(".header .selectTitle .title").html(this.$route.meta.title)
    this.restaurantId = parseInt(this.$route.query.restaurantId)
  },

  methods: {
    getcode() {
      // 验证手机号码
      if (!common.telReg.test(this.mobile)) {
        Message({message: "请输入正确的手机号码", type: "warning"})
        return false
      }

      let dataUrl = common.getDataToUrl({"mobile": this.mobile, "platformType": 2})

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

    // 转让企业
    acceptRestaurant() {
      // 验证手机号码
      if (!common.telReg.test(this.mobile)) {
        Message({message: "请输入正确的手机号码", type: "warning"})
        return false
      }

      // 验证码
      if (this.code === "") {
        Message({message: "验证码不但能为空", type: "warning"})
        return false
      }
      if (this.code === !this.successCode) {
        Message({message: "验证码有误", type: "warning"})
        return false
      }

      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "post",
        url: `${apiPath.restaurant.transfer}`,
        data: {
          "restaurantId": this.restaurantId,
          "mobile": this.mobile,
          "code": this.code,
          "platformType": 2
        }
      }).then(response => {
        loadTips.close()
        if (response) {
          Message({message: "餐馆转让成功", type: "success"})
          // 返回前一页
          this.$router.push({name: "restaurant"})
        }
      })
    }
  },

  filters: {
    // 过滤是否为空
    isEmptyVal(val) {
      return common.isEmptyVal(val)
    }
  }
}
