// vuex/store.js
import Vue from "vue"
import Vuex from "vuex"

import * as actions from "./action/aside"
import * as getters from "./getters/aside"

// 导入各个模块的初始状态和 mutations
import common from "./module/aside"

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    common
  }
})
