// 常量声明规则引入
import { SET_ASIDE } from "./mutation-types"

export const mutations = {
  // 设置侧边栏权限
  [SET_ASIDE](state, asideArr) {
    state.asideArr = asideArr
  }
}
