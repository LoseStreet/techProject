require("./conlog.scss")

const template = require("./conlog.tpl")

// 引用公用文件
const common = require("srcPath/utils/common")

const $ = require("jquery")
const { Message, Loading } = require("element-ui")

// 引入api.json文件
const apiPath = require("apiPath/api.json")

module.exports = {
  name: "conlog",

  template,

  data() {
    return {
      userName: "", // 用户名关键词
      logList: [], // 日志内容
      dataList: [], // 日志列表
      startTime: "", // 开始时间
      endTime: "", // 结束时间
      dateSelect: "",  // 查询时间范围
      currentPage: 1, // 当前页数
      tooltipDelay: 700
    }
  },

  mounted() {
    document.title = "Log list"

    // 加载日志列表
    this.getUserLogList()
  },

  methods: {
    // 重置页数
     resetPageNum() {
       this.currentPage = 1
     },
    // 加载日志列表
    getUserLogList(fromSearch) {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        pageSize: 10,
        pageNum: this.currentPage
      }

      if (fromSearch) {
        this.userName ? data = $.extend({}, data, {user: this.userName}) : ""
      } else {
        this.startTime ? data = $.extend({}, data, {createTimeStart: common.formatDate2(this.startTime)}) : ""
        this.endTime ? data = $.extend({}, data, {createTimeEnd: common.formatDate2(this.endTime)}) : ""
      }
      let dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: "get",
        url: `${apiPath.conLog.logList}?` + dataUrl
      }).then(res => {
        // 去除加载
        loadTips.close()
        this.logList = res

        if (res && res.data) {
          // 将数组倒序排列
          this.dataList = res.data
        }
      })
    },

    // 导出表格
    downloadUserLogExcel() {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId")
      }

      // 请求导出表格方法
      common.downloadExcel(data, `${apiPath.conLog.downloadLog}`)
    },

    // 点击搜索按钮 搜索列表
    handleIconClick(ev) {
      this.getUserLogList(true)
    },

    // 点击分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserLogList()
    }
  },

  watch: {
    // 监听图表查询时间
    dateSelect(newVal, oldVal) {
      this.startTime = newVal[0]
      this.endTime = newVal[1]
      // 重置页数
      this.resetPageNum()
      // 重新加载日志列表
      this.getUserLogList()
    }
  },

  filters: {
    // 过滤是否为空数据
    isEmptyVal(val) {
      return common.isEmptyVal(val)
    },

    // 格式化日期
    formatYMD(val) {
      return common.formatDate2(val)
    },

    // 格式化时间
    formatHMS(val) {
      return common.formatHMS(val)
    },

    // 倒序排列数组
    reverse(arr) {
      return arr.reverse()
    }
  },

  events: {}
}
