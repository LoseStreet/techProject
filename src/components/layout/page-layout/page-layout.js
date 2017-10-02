const { leftNav } = require("../left-nav/left-nav")
const { headerLayout } = require("../header-layout/header-layout")

require("./page-layout.scss")
const template = require("./page-layout.tpl")

export const pageLayout = {
  name: "page-layout",

  template,

  data() {
    return {}
  },

  components: {
    "left-nav": leftNav,
    "header-layout": headerLayout
  },

  watch: {},

  methods: {},

  ready() {},

  mounted() {
    // console.log($(".dl_form"))
  }
}
