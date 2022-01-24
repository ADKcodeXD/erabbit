import request from '@/utils/request'

/**
 * 获取品牌信息
 * @param {*} limit
 * @returns
 */
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}
/**
 * 获取banner的轮播图
 * @returns
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}
/**
 * 获取新鲜好物
 * @returns
 */
export const findNew = () => {
  return request('/home/new', 'get')
}

/**
 * 获取人气推荐
 * @returns
 */
export const findHot = () => {
  return request('/home/hot', 'get')
}

/**
 * 获取商品板块
 * @returns
 */
export const findProduct = () => {
  return request('/home/goods', 'get')
}
/**
 * 获取最新的专题
 * @returns
 */
export const findSpecial = () => {
  return request('/home/special', 'get')
}
