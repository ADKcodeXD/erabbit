import {
  createStore
} from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    user,
    category
  },
  plugins: [createPersistedstate({
    // 配置
    key: 'earbbit-store',
    // 需要存储的 模块
    paths: ['user', 'cart']
  })]
})
