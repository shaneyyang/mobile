import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const USER_KEY = 'hm-toutiao-m-user'

export default new Vuex.Store({
  state: {
    // 用户的数据状态信息：{token:xx,refresh_token:xxx}
    user: JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  mutations: {
    // 修改用户信息
    updateUser (state, data) {
      // 修改user
      state.user = data
      // 修改localStorage
      localStorage.setItem(USER_KEY, JSON.stringify(data))
    },
    // 清除用户信息
    clearUser (state) {
      state.user = {}
      localStorage.removeItem(USER_KEY)
    }
  },
  actions: {
  },
  modules: {
  }
})
