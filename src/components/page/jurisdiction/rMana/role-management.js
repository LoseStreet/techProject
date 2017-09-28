require("./role-management.scss")

const template = require("./role-management.tpl")

// 引用公用文件
const common = require("srcPath/utils/common")

const $ = require("jquery")
const { Message, MessageBox, Loading } = require("element-ui")

// 引入api.json文件
const apiPath = require("apiPath/api.json")

module.exports = {
  name: "role-management",

  template,

  data() {
    return {
      roleStatus: [
        {value: "", label: "All"},
        {value: 0, label: "Disabled"},
        {value: 1, label: "Enabled"}
      ], // 角色状态
      roleStatus1: {
        0: "Disabled",
        1: "Enabled"
      }, // 角色状态
      roleStatusSel: "", // 角色状态选择
      roleList: "", // 角色列表
      currentPage: 1, // 当前页
      searchVal: "", // 搜索的关键词
      checkedArr: [], // 所有复选框对象
      checkedAll: false, // 全选或全不选
      tooltipDelay: 700
    }
  },

  mounted() {
    document.title = "Role management"

    // 加载角色列表
    this.getRoleList()
  },

  methods: {
    // 重置页数
     resetPageNum() {
       this.currentPage = 1
     },
    // 加载角色列表
    getRoleList(fromSearch) {
      // 先清空复选框
      this.checkedArr = []
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        pageSize: 10,
        pageNum: this.currentPage
      }
      if (fromSearch) {
        data = $.extend({}, data, {search: this.searchVal})
      } else {
        this.roleStatusSel !== "" ? data = $.extend({}, data, {isEnabled: this.roleStatusSel}) : ""
      }
      let dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: "get",
        url: `${apiPath.rMana.rolesList}?` + dataUrl

      }).then(res => {
        // 去除加载
        loadTips.close()
        this.roleList = res
        // 初始化复选框状态
        if (res && res.data.length > 0) {
          $.each(res.data, (i, v) => {
            let obj = {}
            obj.roleId = v.roleId
            obj.checked = false
            this.checkedArr.push(obj)
          })
        }
      })
    },

    // 点击搜索图标进行搜索
    handleIconClick() {
      // 重置页数
      this.resetPageNum()
      // 加载列表
      this.getRoleList(true)
      // 将搜索状态重置
      this.roleStatusSel = ""
    },

    // 改变角色状态
    changeRoleStatus(val) {
      // 重置页数
      this.resetPageNum()
      // 加载页码
      this.getRoleList()
      // 将搜索栏重置
      // this.searchVal = ""
    },

    // 点击改变页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getRoleList()
    },

    // 打开启用禁用确认弹出框
    openMsgBox(status, roleId) {
      status === 0 ? status = 1 : status = 0

      this.$confirm(`This will be ${this.roleStatus1[status]} the role, whether to continue?`, "prompt", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"

      }).then(() => {
        this.isEnabledRoles(status, roleId, () => {
          this.$message({
            type: "success",
            message: `${this.roleStatus1[status]} success`
          })

          // 刷新列表
          this.getRoleList()
          // 重置复选框
          this.resetChecked()
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "Cancelled"
        })
      })
    },

    // 重置复选框
    resetChecked() {
      $.each(this.checkedArr, (i, v) => {
        v.checked = false
      })
      this.checkedAll = false
    },

    // 启用禁用该角色
    isEnabledRoles(status, roleIds, cb) {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        isEnabled: status,
        roleIds: roleIds
      }

      const loadTips = Loading.service()
      this.$ajax({
        method: "put",
        url: `${apiPath.rMana.enabledRole}`,
        data: data
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0) {
          cb && cb()
        }
      })
    },

    // 批量启用
    batchEnabledRoles(status) {
      let roleIds = []
      $.each(this.checkedArr, (i, v) => {
        if (v.checked === true) {
          roleIds.push(v.roleId)
        }
      })
      if (roleIds.length === 0) {
        Message({
          type: "warning",
          message: "Please select the role to be enabled"
        })
        return false
      }
      this.openMsgBox(status, roleIds)
    },

    // 批量禁用
    batchdisabledRoles(status) {
      let roleIds = []
      $.each(this.checkedArr, (i, v) => {
        if (v.checked === true) {
          roleIds.push(v.roleId)
        }
      })
      if (roleIds.length === 0) {
        Message({
          type: "warning",
          message: "Please select the role you want to disable"
        })
        return false
      }
      this.openMsgBox(status, roleIds)
    },

    // 处理用户数量
    dealCount(userNames) {
      if (userNames) {
        let userCount = userNames.split(",").length
        return userCount
      } else {
        return 0
      }
    }
  },

  watch: {
    // 监听复选框的变化
    checkedArr: {
      handler: (newVal, oldVal) => {},
      deep: true // 启用深度检测，检测数组对象里面的变化
    },

    // 监听全选全不选状态
    checkedAll(newVal, oldVal) {
      $.each(this.checkedArr, (i, v) => {
        if (newVal === true) {
          v.checked = true
        } else {
          v.checked = false
        }
      })
    }
  },

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
