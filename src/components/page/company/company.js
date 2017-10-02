require("./company.scss")

const template = require("./company.tpl")

// 引用公用文件
const common = require("srcPath/utils/common")

const $ = require("jquery")
const { Message, MessageBox, Loading } = require("element-ui")

// 引入api.json文件
const apiPath = require("apiPath/api.json")

export const company = {
  name: "company",

  template,

  data() {
    return {
      status: {
        1: "待审核",
        2: "已上线",
        4: "已拒绝",
        7: "全部"
      },
      selectStatus: 2,
      companyList: [], // 企业列表
      keyword: "", // 搜索关键词
      page: 1 // 请求的页码
    }
  },

  mounted() {
    $(".header .selectTitle .title").html(this.$route.meta.title)

    // 加载公司列表
    this.getCompanyList()
  },

  methods: {
    // 选择公状态
    changeStatus(status) {
      this.keyword = ""
      this.selectStatus = status
      // 刷新lieb
      this.getCompanyList()
    },

    // 加载公司列表
    getCompanyList(keyword) {
       const data = {
         "platformType": 2,
         "page": this.page,
         "status": this.selectStatus
       }
       keyword ? data.keyword = keyword : ""
       let dataUrl = common.getDataToUrl(data)

       // 加载提示
       const loadTips = Loading.service()
       this.$ajax({
         method: "get",
         headers: {"platformType": 2},
         url: `${apiPath.company.companys}?` + dataUrl
       }).then(res => {
         this.companyList = []
         loadTips.close()

         if (res && res.data && res.data.list) {
           this.companyList = res.data.list
         }
       })
    },

    // 审核弹框提示
    openMsgBox(companyId, status) {
      let tip = ""
      if (status === 2) {
        tip = "通过"
      } else {
        tip = "不通过"
      }

      this.$confirm(`此操作将审核${tip}所选企业,是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.acceptrestaurant(companyId, status)
      }).catch(() => {})
    },

    // 审核公司
    acceptCompany(companyId, status) {
      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "post",
        headers: {"platformType": 2},
        url: `${apiPath.company.accept}`,
        data: {
          "companyId": companyId,
          "status": status,
          "platformType": 2
        }
      }).then(response => {
        loadTips.close()
        if (response) {
          Message({message: "企业审核成功", type: "success"})
          // 刷新企业列表
          this.getCompanyList()
        }
      })
    },

    // 点击搜索框
    handleIconClick() {
      this.getCompanyList(this.keyword)
    }
  },

  watch: {},

  filters: {
    // 过滤是否为空
    isEmptyVal(val) {
      return common.isEmptyVal(val)
    },

    // 格式化日期
    formatYMD(val) {
      return common.formatDate2(val)
    }
  }
}
