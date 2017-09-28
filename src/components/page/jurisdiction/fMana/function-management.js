require("./function-management.scss")

const template = require("./function-management.tpl")

// 引用公用文件
const common = require("srcPath/utils/common")

// 引入api.json文件
const apiPath = require("apiPath/api.json")

const $ = require("jquery")
const { Message, MessageBox, Loading } = require("element-ui")

module.exports = {
  name: "function-management",

  template,

  data() {
    return {
      menuData: [] // 功能菜单
    }
  },

  mounted() {
    document.title = "Function Management"

    // 加载权限列表
    this.getAllMenu()
  },

  methods: {
    // 加载权限列表
    getAllMenu() {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId")
      }
      let dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: "get",
        url: `${apiPath.fMana.getAllMenu}?` + dataUrl

      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data && res.data.length > 0) {
          // 遍历第一次获取一级主菜单
          $.each(res.data, (i, v) => {
            if (v.parentMenuId === 0 && v.menuLevel === 1) {
              let obj = {}
              obj.subMenu = []
              obj.menuId = v.menuId
              obj.mainMenu = v.menuName
              this.menuData.push(obj)
            }
          })
          // 遍历第二次获取二级菜单
          $.each(res.data, (i, v) => {
            if (v.menuLevel === 2) {
              $.each(this.menuData, (subi, subv) => {
                if (subv.menuId === v.parentMenuId) {
                  subv.subMenu.push({menuName: v.menuName, menuId: v.menuId, thrMenu: []})
                }
              })
            }
          })
          // 遍历第三次获取三级菜单
          $.each(res.data, (i, v) => {
            if (v.menuLevel === 3) {
              $.each(this.menuData, (subi, subv) => {
                $.each(subv.subMenu, (thri, thrv) => {
                  if (thrv.menuId === v.parentMenuId) {
                    thrv.thrMenu.push({menuName: v.menuName, menuId: v.menuId})
                  }
                })
              })
            }
          })
        }
      })
    }
  },

  events: {}
}
