// import * as types from './mutation-types'
// export const setToken = ({ dispatch }, token) => {
//   dispatch(types.SET_TOKEN, token)
// }

// 常量声明规则引入
const { SET_ASIDE } = require("../mutation/mutation-types")

export const setAside = ({ commit }, args) => {
  return commit(SET_ASIDE, args)
}
// ...args表示额外的参数
