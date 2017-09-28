// const state = require("../state/common")
// const mutations = require("../mutation/common")
// 常量声明规则引入
import { SET_ASIDE } from "../mutation/mutation-types"

const state = {
  asideArr: []
}

const mutations = {
  [SET_ASIDE](state, asideArr) {
    state.asideArr = asideArr
  }
}

export default {
  state,
  mutations
}
