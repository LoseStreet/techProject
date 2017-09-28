require("./conlog-details.scss")

const template = require("./conlog-details.tpl")

// 引用公用文件
const common = require("srcPath/utils/common")

// const $ = require("jquery")
const { Message, Loading } = require("element-ui")

// 引入api.json文件
const apiPath = require("apiPath/api.json")

module.exports = {
  name: "conlog-details",

  template,

  data() {
    return {
      userName: "", // 用户名
      detailList: [] // 详情列表
    }
  },

  mounted() {
    document.title = "Log details"

    this.userName = this.$route.query.token
    if (this.userName) {
      // 加载日志列表
      this.getLogDetail(this.userName)
    } else {
      Message({message: "User does not exist"})
    }
  },

  route: {},

  methods: {
    // 加载日志详情
    getLogDetail(user) {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId")
      }

      let dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: "get",
        url: `${apiPath.conLog.logDetail}/${user}?` + dataUrl
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.status === 0) {
          this.detailList = res.data
        }
      })
    },

    // 导出
   downloadUserLogExcel() {
     let data = {
       token: common.getCookie("arTk"),
       userId: common.getCookie("arUId"),
       queryToken: this.userName
     }

     // 请求导出表格方法
     common.downloadExcel(data, `${apiPath.conLog.downloadUserExcel}`)
   }
  },

  filters: {
    // 过滤是否为空数据
    isEmptyVal(val) {
      return common.isEmptyVal(val)
    },

    // 格式化时间
    formatHMS(val) {
      return common.formatHMS(val)
    }
  },

  events: {}
}
