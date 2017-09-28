const { leftNav } = require("../left-nav/left-nav")

require("./page-layout.scss")
const template = require("./page-layout.tpl")

module.exports = {
  name: "page-layout",

  template,

  data() {
    return {}
  },

  components: {
    "left-nav": leftNav
  },

  watch: {},

  route: {},

  methods: {},

  ready() {},
  events: {},
  mounted() {
    // console.log($(".dl_form"))
  }
}
