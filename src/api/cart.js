// 购物车相关的api
import request  from "@/utils/request";
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