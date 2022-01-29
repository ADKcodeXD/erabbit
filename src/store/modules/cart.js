import {
  getNewCartGoods
} from "@/api/cart";

// 购物车模块
export default {
  namespaced: true,
  state() {
    return {
      list: []
    }
  },
  mutations: {
    // 插入购物车
    insertCart(state, payload) {
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId);
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count;
        payload.count += count;
        // 删除原来的
        state.list.splice(sameIndex, 1);
      }
      // 追加新的
      state.list.unshift(payload)
    },
    // 修改购物车
    updateCart(state, goods) {
      // goods 商品信息 
      const updateGoods = state.list.find(item => item.skuId === goods.skuId);
      console.log(goods);
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key];
        }
      }

    },
    // 删除购物车商品
    deleteCart(state, skuId) {
      const index = state.list.find(item => item.skuId === skuId)
      state.list.splice(index, 1);
    }
  },
  getters: {
    // get有效的商品
    validList(state) {
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective);

    },
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0);
    },
    validAmount(state, getters) {
      return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    },


    // 无效商品列表
    inValidList(state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective);
    },
    // 已选商品列表
    selectedList(state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 已选商品件数
    selectedListTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0);
    },
    // 已选商品总金额
    selectedListAmount(state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100 * c.count), 0) / 100
    },
    // 是否全选
    isCheckAll(state, getters) {
      return getters.validList.length !== 0 && getters.validList.length === getters.selectedList.length;
    }
  },
  actions: {
    insertCart(context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 登录

        } else {
          context.commit('insertCart', payload);
          resolve();
        }
      })
    },
    // 获取商品列表
    findCart(context) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          // 同时发送请求 使用promise.all来进行判断所有的请求是否发送成功
          const promiseArr = context.state.list.map(goods => {
            return getNewCartGoods(goods.skuId)
          })
          Promise.all(promiseArr).then(results => {
            results.forEach((data, i) => {
              context.commit('updateCart', {
                skuId: context.state.list[i].skuId,
                ...data.result
              })
            })
            resolve();
          })
        }
      })
    },
    // 删除购物车
    deleteCart(context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          context.commit('deleteCart', payload);
          resolve();
        }
      })
    },
    // 修改购物车
    updateCart(context, payload) {
      // payload 
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          context.commit('updateCart', payload);
          resolve();
        }
      })
    },
    // 全选操作 本地
    checkAllCart(context, selected) {
      // payload 
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          context.getters.validList.forEach(goods => {
            context.commit('updateCart', {
              skuId: goods.skuId,
              selected
            });
          })
          resolve();
        }
      })
    },
    // 批量删除
    batchDeleteCart(context, isClear) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          context.getters[isClear ? 'inValidList' : 'selectedList'].forEach(item => {
            context.commit('deleteCart', item.skuId);
          })
          resolve();
        }
      })
    },
    // 修改规格信息
    updateCartSku(context,{oldSkuId,newSku}){
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          // 合并商品规格信息
          const oldGoods=context.state.list.find(item=>item.skuId===oldSkuId);
          context.commit('deleteCart',oldSkuId);
          const {id:skuId,price:nowPrice,oldPrice,specsText:attrsText,inventory:stock}=newSku;
          const newGoods={...oldGoods,skuId,nowPrice,oldPrice,attrsText,stock}
          context.commit('insertCart',newGoods);
          resolve();
        }
      })
    }
  }
}
