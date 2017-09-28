require("./left-nav.scss")
const template = require("./left-nav.tpl")

// jq
const $ = require("jquery")

// 引用公用文件
const common = require("srcPath/utils/common")
const asideData = require("apiPath/aside.json")

// 引入vuex store
const { mapState } = require("vuex")
// mapState 辅助函数可获取多个状态
// mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性，且不可操作
// const { mapGetters } = require("vuex")

export const leftNav = {
  template,

  computed: {
    ...mapState({
      listMenu: (state) => {
        // 为避免刷新页面vuex state重置的情况，将数据缓存在本地备份
        const asideData = window.JSON.parse(common.getLocalStorage("arListMenu"))
        if (state.common.asideArr.length > 0) {
          return state.common.asideArr
        } else {
          return asideData
        }
      }
    })
  },

  data() {
    return {
      showMana: true,
      showMana1: true,
      asideData: asideData,
      menuData: []
    }
  },

  created() {
    $.each(this.listMenu, function(i, v) {
      if (v.parentMenuId === 1 && v.menuLevel === 2) {
        this.menuData.push({menuId: v.menuId, menuName: v.menuName, menuUrl: v.menuUrl})
      }
    }.bind(this))
  },

  mounted() {
    const routerName = this.$route.name
    // $(".dl_left_sub_nav dt").removeClass("focus")
    let routerFlag = false
    $.each(this.asideData, (i, v) => {
      if (v.router === routerName) {
        $(".dl_left_sub_nav dt").each((i, v) => {
          if ($(v).attr("data-router") === routerName) {
            routerFlag = true
            $(v).addClass("focus")
          }
        })
        return false
      }
    })

    if (!routerFlag) {
      this.$router.go(-1)
    }
  },

  methods: {
    toggle: function(e) {
      // if (e.type === "mouseenter") {
      //   this.showMana = true
      // } else {
      //   this.showMana = false
      // }
    },

    toggle1: function(e) {
      // if (e.type === "mouseenter") {
      //   this.showMana1 = true
      // } else {
      //   this.showMana1 = false
      // }
    },

    focusNav(e, type) {
      // type 为0 表示点击， 1表示监听路由传递的对象
      $(".dl_left_nav").find("dt").removeClass("focus")
      if (type === 0) {
        $(e.target).parent("dt").addClass("focus")
        // if ($(e.target).parent("dt").parents("dt").hasClass("hasSubNav")) {
        //   $(e.target).parent("dt").parents("dt").addClass("hasFocus")
        // }
      } else {
        $(e).addClass("focus")
        // if ($(e).parents("dt").hasClass("hasSubNav")) {
        //   $(e).parents("dt").addClass("hasFocus")
        // }
      }
    }
  },
  events: {}
}
