require("./left-nav.scss")
const template = require("./left-nav.tpl")

// jq
const $ = require("jquery")

// 引用公用文件
const common = require("srcPath/utils/common")

export const leftNav = {
  name: "left-nav",

  template,

  data() {
    return {
      select: 0
    }
  },

  mounted() {
    const routerName = this.$route.name
  },

  methods: {
    focusNav(selectType) {
      this.select = selectType
    }
  }
}
