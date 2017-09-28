require("./app.scss")
const template = require("./app.tpl")

// 引入vuex store
const store = require("srcPath/vuex/store").default

const $ = require("jquery")

module.exports = {
  template,

  name: "app",

  store,

  vuex: {},

  data() {
    return {}
  },

  methods: {
    todo() {}
  },

  mounted() {}
}
