require("./user-page-layout.scss")
const template = require("./user-page-layout.tpl")
const headerLayout = require("../header-layout/header-layout")

module.exports = {
  name: "user-page-layout",

  template,

  data() {
    return {}
  },

  components: {
    "header-layout": headerLayout
  },

  watch: {},

  route: {},

  methods: {},

  ready() {},
  events: {}
}
