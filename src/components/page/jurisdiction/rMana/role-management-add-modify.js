require("./role-management-add-modify.scss")

const template = require("./role-management-add-modify.tpl")

// 引用公用文件
const common = require("srcPath/utils/common")

const $ = require("jquery")
const { Message, MessageBox, Loading } = require("element-ui")

// 引入api.json文件
const apiPath = require("apiPath/api.json")

module.exports = {
  name: "role-management-add-modify",

  template,

  data() {
    return {
      status: 0, // 菜单状态
      roleSelect: "", // 角色选择
      roleSelectArr: [], // 所有可选角色
      roleTags: [], // 已经选择角色的标签
      menuData: [], // 权限的数据
      isActionAdd: true, // 是否是新增
      roleId: "", // 角色id
      userList: [], // 用户列表
      userListInfo: "",
      checkedAll: false, // 全选用户
      checkedArr: [],
      showTransfer: false, // 是否显示新增用户的穿梭框
      userListData: [], // 添加用户的用户数组
      roleName: "", // 角色名称
      describe: "", // 角色描述
      menuIds: [], // 菜单id
      userListSelect: [],
      rolesMenuList: {}, // 选中的角色对应的权限
      sameRoleId: {}, // 要删除的角色与不删除角色的相同的权限id
      currentPage: 1, // 用户列表当前页
      tooltipDelay: 700
    }
  },

  created() {
    document.title = "Add role"

    // 加载角色列表
    this.getRoleList()

    // 加载权限列表
    this.getAllMenu(function() {
      if (this.$route.query.action === "modify") {
        this.isActionAdd = false
        setTimeout(function() {
          // 加载角色详情
          this.loadRoleInfo(this.roleId)
        }.bind(this), 10)

        setTimeout(function() {
          // 获取所有用户列表
          this.getAllUsersList()
        }.bind(this), 1000)
      }
    }.bind(this))

    let roleId = this.$route.query.roleId
    if (roleId) {
      this.roleId = roleId
      this.getRoleUsers(roleId)
    }
  },

  methods: {
    // 加载角色列表
    getRoleList(fromSearch) {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId")
      }
      let dataUrl = common.getDataToUrl(data)

      this.$ajax({
        method: "get",
        url: `${apiPath.rMana.rolesList}?` + dataUrl

      }).then(res => {
        this.roleList = res
        // 初始化复选框状态
        if (res && res.data && res.data.length > 0) {
          $.each(res.data, (i, v) => {
            if (v.isEnabled === 1) {
              let obj = {}
              obj.value = v.roleId
              obj.label = v.roleName
              this.roleSelectArr.push(obj)
            }
          })
        }
      })
    },

    // 加载角色详情
    loadRoleInfo(roleId) {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        roleId: roleId
      }
      let dataUrl = common.getDataToUrl(data)

      const loadTips = Loading.service()
      this.$ajax({
        method: "get",
        url: `${apiPath.rMana.rolesDetails}?${dataUrl}`,
        data: data
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res && res.data) {
          const dataInfo = res.data
          this.roleName = dataInfo.roleName
          this.describe = dataInfo.describe
          // 显示对应角色权限
          this.showRoleMenus(dataInfo.menuIds)
        }
      })
    },

    // 角色选择
    changeRoleSelect(val) {
      $.each(this.roleSelectArr, (i, v) => {
        if (v.value === val) {
          // 查询该角色下面的权限
          this.getRolesMenu(val)

          if (this.roleTags.length > 0) {
            let flag = true
            $.each(this.roleTags, (subi, subv) => {
              if (subv.name === v.label) {
                flag = false
                return false
              }
            })
            if (flag) {
              this.roleTags.push({name: v.label, roleId: val})
            }
          } else {
            this.roleTags.push({name: v.label, roleId: val})
          }
          return false
        }
      })
    },

    // 查询角色权限
    getRolesMenu(roleId) {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        roleId: roleId
      }
      let dataUrl = common.getDataToUrl(data)

      this.$ajax({
        method: "get",
        url: `${apiPath.rMana.roleMenuList}?${dataUrl}`

      }).then(res => {
        this.rolesMenuList[roleId] = res.data

        if (res && res.data.length > 0) {
          // 显示对应角色权限
          this.showRoleMenus(res.data)
        }
      })
    },

    // 加载权限列表
    getAllMenu(cb) {
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
              obj.checked = false
              obj.mainMenu = v.menuName
              this.menuData.push(obj)
            }
          })
          // 遍历第二次获取二级菜单
          $.each(res.data, (i, v) => {
            if (v.menuLevel === 2) {
              $.each(this.menuData, (subi, subv) => {
                if (subv.menuId === v.parentMenuId) {
                  subv.subMenu.push({menuName: v.menuName, checked: false, menuId: v.menuId, thrMenu: []})
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
                    thrv.thrMenu.push({menuName: v.menuName, menuId: v.menuId, checked: false})
                  }
                })
              })
            }
          })

          cb && cb()
        }
      })
    },

    // 如果是修改角色，请求角色下面的用户列表
    getRoleUsers() {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        pageSize: 10,
        pageNum: this.currentPage,
        roleId: this.roleId
      }
      let dataUrl = common.getDataToUrl(data)

      this.$ajax({
        method: "get",
        url: `${apiPath.rMana.rolesUserList}?` + dataUrl

      }).then(res => {
        this.userListInfo = res
        // 清空列表与复选框
        this.userList = []
        this.checkedArr = []

        if (res && res.data && res.data.length > 0) {
          $.each(res.data, (i, v) => {
            if (v) {
              this.userList.push(v)
              this.checkedArr.push({userId: v.userId, checked: false})
            }
          })
        }
      })
    },

    // 获取所有用户列表
    getAllUsersList() {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        pageSize: 1000000,
        pageNum: 1
      }
      let dataUrl = common.getDataToUrl(data)

      this.$ajax({
        method: "get",
        url: `${apiPath.uMana.usersList}?` + dataUrl

      }).then(res => {
        this.userListData = []
        this.userListSelect = []
        if (res && res.data && res.data.length > 0) {
          $.each(res.data, (i, v) => {
            let disabled = false

            $.each(this.userList, (useri, userv) => {
              if (v.userId === userv.userId) {
                disabled = true
                return false
              }
            })
            this.userListData.push({key: v.userId, label: v.userName, disabled: disabled})
          })
        }
      })
    },

    // 新增角色 与 保存角色
    saveRole() {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId")
      }
      // 判断角色名称
      if (this.roleName === "") {
        Message({
          type: "warning",
          message: "The role name can not be empty"
        })
        return false
      } else {
        data = $.extend({}, data, {roleName: this.roleName})
      }
      // 判断描述
      // if (this.describe === "") {
      //   Message({
      //     type: "warning",
      //     message: "描述不能为空"
      //   })
      //   return false
      // } else {
        data = $.extend({}, data, {describe: this.describe})
      // }
      // 判断角色权限
      if (this.menuIds.length === 0) {
        Message({
          type: "warning",
          message: "Please select the menu permissions"
        })
        return false
      } else {
        data = $.extend({}, data, {menuIds: this.menuIds})
      }

      const loadTips = Loading.service()
      // 如果存在角色id则为修改
      if (this.roleId !== "") {
        data = $.extend({}, data, {roleId: this.roleId})

        this.$ajax({
          method: "put",
          url: `${apiPath.rMana.roleUpdate}`,
          data: data
        }).then(res => {
          // 去除加载
          loadTips.close()
          if (res.status === 0) {
            Message({
              type: "success",
              message: "Successfully modified"
            })
            this.$router.push({ path: "roleMana" })
          }
        })
      } else {
        this.$ajax({
          method: "post",
          url: `${apiPath.rMana.roleAdd}`,
          data: data
        }).then(res => {
          // 去除加载
          loadTips.close()
          if (res.status === 0) {
            Message({
              type: "success",
              message: "Added successfully"
            })
            this.$router.push({ path: "roleMana" })
          }
        })
      }
    },

    // 移除用户
    removeUser(userIds, cb) {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        roleId: this.roleId,
        userIds: userIds
      }

      const loadTips = Loading.service()
      this.$ajax({
        method: "delete",
        url: `${apiPath.rMana.rolesDel}`,
        data: data
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0) {
          cb && cb()
        }
      })
    },

    // 打开启用禁用确认弹出框
    openMsgBox(userIds) {
      this.$confirm("This will remove the selected users, whether to continue?", "Prompt", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"

      }).then(() => {
        this.removeUser(userIds, () => {
          this.$message({
            type: "success",
            message: "Remove successfully"
          })

          // 刷新列表
          this.getRoleUsers()
          // 刷新所有用户列表
          this.getAllUsersList()

          // 将复选框全部重置
          $.each(this.checkedArr, (i, v) => {
            v.checked = false
          })
        })
      }).catch(() => {
        // this.$message({
        //   type: "info",
        //   message: "Cancelled"
        // })
      })
    },

    // 添加角色下面的用户
    addRoleusers() {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        roleId: this.roleId,
        userIds: this.userListSelect
      }

      const loadTips = Loading.service()
      this.$ajax({
        method: "post",
        url: `${apiPath.rMana.rolesAdd}`,
        data: data
      }).then(res => {
        // 去除加载
        loadTips.close()
        if (res.status === 0) {
          Message({
            type: "success",
            message: "Added successfully"
          })
          // 刷新列表
          this.getRoleUsers()
        }
      })
    },

    // 批量移除
    batchremoveUser() {
      // 遍历checkedArr 获取被勾选的用户
      let userIds = []
      $.each(this.checkedArr, (i, v) => {
        if (v.checked === true) {
          userIds.push(v.userId)
        }
      })
      if (userIds.length === 0) {
        Message({
          type: "warning",
          message: "Please select the user"
        })
        return false
      }
      this.openMsgBox(userIds)
    },

    // 关闭标签
    closeTags(tag) {
      // 关闭标签的同时，将角色权限去除
      this.removeRoleMenus(tag.roleId)
      $.each(this.roleTags, (i, v) => {
        if (v.name === tag.name) {
          this.roleTags.splice(i, 1)
          return false
        }
      })
      // 如果roleTags长度为零，重置sameRoleId
      this.sameRoleId = {}
    },

    // 移除角色对应的权限
    removeRoleMenus(roleId) {
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        roleId: roleId
      }
      let dataUrl = common.getDataToUrl(data)

      this.$ajax({
        method: "get",
        url: `${apiPath.rMana.roleMenuList}?${dataUrl}`

      }).then(res => {
        this.changeRolesMenuList(roleId, res.data)
        if (res.data.length > 0) {
          $.each(this.menuData, (i, v) => {
            // 遍历子级菜单subMenu
            $.each(v.subMenu, (subi, subv) => {
              $.each(res.data, (dataI, dataV) => {
                if (dataV === subv.menuId) {
                  this.$set(subv, "checked", false)
                  this.recoverSameRoleId(subv) // 恢复删除过多的权限

                  $.each(subv.thrMenu, (thri, thrv) => {
                      this.$set(thrv, "checked", false)
                      this.recoverSameRoleId(thrv) // 恢复删除过多的权限
                  })
                }

                // 遍历三级菜单thrMene
                $.each(subv.thrMenu, (thri, thrv) => {
                  if (dataV === thrv.menuId) {
                    this.$set(thrv, "checked", false)
                    this.recoverSameRoleId(thrv) // 恢复删除过多的权限
                  }
                })
              })
            })
          })

          // 再次检测menuData,如果二级菜单全部不选，一级菜单也不选
          $.each(this.menuData, (i, v) => {
            let flag = true
            // 遍历子级菜单subMenu
            $.each(v.subMenu, (subi, subv) => {
              if (subv.checked === true) {
                flag = false
                return false
              }
            })

            if (flag) {
              v.checked = false
            }
          })
        }
      })
    },

    // 根据菜单id显示角色权限,给角色权限勾选
    showRoleMenus(menuIds) {
      $.each(this.menuData, (i, v) => {
        // 遍历子级菜单subMenu
        $.each(v.subMenu, (subi, subv) => {
          $.each(menuIds, (dataI, dataV) => {
            if (dataV === subv.menuId) {
              this.$set(subv, "checked", true)
              this.$set(v, "checked", true)
            }
            // 遍历三级菜单thrMene
            $.each(subv.thrMenu, (thri, thrv) => {
              if (dataV === thrv.menuId) {
                this.$set(thrv, "checked", true)
                this.$set(subv, "checked", true)
                this.$set(v, "checked", true)
              }
            })
          })
        })
      })
    },

    // 遍历所选角色权限列表,如果有相同的权限id,则menuData中不去除, roleId:要移除的roleId,roleData:此roleId对应的权限
    changeRolesMenuList(roleId, roleData) {
      $.each(this.rolesMenuList, (i, v) => {
        if (Number(roleId) === Number(i)) {
          delete this.rolesMenuList[roleId]
        } else {
          // 找出没有删除角色与要删除角色相同的权限id
          $.each(roleData, (datai, datav) => {
            $.each(v, (suvi, subv) => {
              if (datav === subv) {
                this.sameRoleId[datav] = "true"
              }
            })
          })
        }
      })
    },

    // 移除角色时，与不移除的角色相同的权限恢复
    recoverSameRoleId(menu) {
      $.each(this.sameRoleId, (samei, samev) => {
        if (Number(samei) === menu.menuId) {
          this.$set(menu, "checked", true)
        }
      })
    },

    // 保存新增选择的用户
    saveUserSelect() {
      if (this.userListSelect.length === 0) {
        Message({
          type: "warning",
          message: "Please select the user"
        })
        return false
      }
      this.addRoleusers()
      this.showTransfer = false
    },

    // 点击切换标签
    tabTitClick(status) {
      this.status = status
    },

    // 显示新增用户弹出框
    showTransferFun() {
      this.showTransfer = true
    },

    // 关闭弹框
    closeTransfer() {
      this.showTransfer = false
    },

    // 主模块值改变时
    changeMainMenu(menuId, checked) {
      $.each(this.menuData, (i, v) => {
        $.each(v.subMenu, (subi, subv) => {
          if (subv.menuId === menuId) {
            $.each(subv.thrMenu, (thri, thrv) => {
              if (checked === false) {
                this.$set(thrv, "checked", false)
              } else {
                this.$set(thrv, "checked", true)
              }
            })
          }
        })
      })
    },

    // 子模块值改变时
    changeSubMenu(menuId, checked) {
      $.each(this.menuData, (i, v) => {
        $.each(v.subMenu, (subi, subv) => {
          let flag = false
          let hasChild = false
          $.each(subv.thrMenu, (thri, thrv) => {
            if (thrv.menuId === menuId && checked === true) {
              this.$set(subv, "checked", true)
            }
          })

          $.each(subv.thrMenu, (thri, thrv) => {
            hasChild = true
            if (thrv.checked === true) {
              flag = true
              return false
            }
          })

          if (!flag && hasChild) {
            subv.checked = false
          }
        })
      })
    },

    // 点击分页
    handleCurrentChange(val) {
      this.currentPage = val
      // 刷新列表
      this.getRoleUsers()
    }
  },

  watch: {
    // 监听复选框的变化
    checkedArr: {
      handler: (newVal, oldVal) => {
        // console.log(newVal)
      },
      deep: true // 启用深度检测，检测数组对象里面的变化
    },

    // 监听全选全不选状态
    checkedAll(newVal, oldVal) {
      if (newVal === true) {
        $.each(this.checkedArr, (i, v) => {
          v.checked = true
        })
      } else {
        $.each(this.checkedArr, (i, v) => {
          v.checked = false
        })
      }
    },

    // 监听菜单的变化
    menuData: {
      // 注意箭头函数绑定的是父级作用域上下文，this指向不了vue实例
      handler: function(newVal, oldVal) {
        // 先重置menuIds
        this.menuIds = []
        $.each(newVal, (i, v) => {
          if (v.checked === true) {
            this.menuIds.push(v.menuId)
          }
          // 遍历二级菜单
          $.each(v.subMenu, (subi, subv) => {
            if (subv.checked === true) {
              v.checked = true
              this.menuIds.push(subv.menuId)
            }

            // 遍历三级菜单
            $.each(subv.thrMenu, (thri, thrv) => {
              if (thrv.checked === true) {
                this.menuIds.push(thrv.menuId)
              }
            })
          })

          let flag = false
          $.each(v.subMenu, (subi, subv) => {
            if (subv.checked === true) {
              flag = true
              return false
            }
          })
          if (!flag) {
            v.checked = false
          }
        })
      },
      deep: true // 启用深度检测
    }
  },

  filters: {
    // 过滤是否为空
    isEmptyVal(val) {
      return common.isEmptyVal(val)
    },

    // 顿号拼接
    joinDayton(arr) {
      if (arr.length > 0) {
        return arr.join("、")
      } else {
         return "empty"
      }
    }
  }
}
