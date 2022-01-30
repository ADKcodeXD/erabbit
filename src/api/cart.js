// 购物车相关的api
import request from "@/utils/request";
/**
 * 更新购物车中的商品信息
 * @param {*} skuId 
 * @returns 
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取自己商品的sku信息
 * @param {*} skuId 
 * @returns 
 */
export const getNewGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}
/**
 * 合并购物车
 * /member/cart/merge
 * @param {Array} cartList 
 * @returns 
 */
export const mergeList = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}
/**
 * 获取用户的购物车
 * @returns 
 */
export const memberCart = () => {
  return request('/member/cart', 'get')
}
/**
 * 插入购物车   
 * @returns 
 */
export const insertCart = ({
  skuId,
  count
}) => {
  return request('/member/cart', 'post', {
    skuId,
    count
  })
}

/**
 * 删除和批量删除的接口
 * @param {id} ids 
 * @returns 
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', {
    ids
  })
}


/**
 * 修改购物车状态
 * @param {*} param0 
 * @returns 
 */
export const updateCart = ({skuId,selected,count}) => {
    return request(`/member/cart/${skuId}`, 'put',{selected,count})
}
/**
 * 全选和反选
 * @param {*} param0 
 * @returns 
 */
export const checkAllCart = ({ selected, ids }) => {
    return request('/member/cart/selected', 'put', { selected, ids })
  }