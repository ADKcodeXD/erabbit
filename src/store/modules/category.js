import {
  findAllCategory
} from '@/api/category'
import {
  topCategory
} from '@/api/constants'
// 分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 分类数据 依赖categoryapi接口获取到的数据 保证初始化就要数据 就可以解决白屏
      list: topCategory.map(item => ({
        name: item
      }))
    }
  },
  mutations: {
    setCategoryList (state, payload) {
      state.list = payload
    },
    // 定义show和hide函数
    show (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  actions: {
    async getCategoryList ({
      commit
    }) {
      const data = await findAllCategory()
      // 给每个分类加上一个open的数据
      data.result.forEach(top => {
        top.open = false
      })
      commit('setCategoryList', data.result)
    }
  }
}
