// 定义首页需要的接口函数
import request from '@/utils/request'

/**
 * 获取首页头部分类数据
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
/**
 * 查看顶级分类的信息
 * @returns
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/**
 * 获取筛选区的数据
 * @param {number} id
 * @returns
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}
/**
 *  获取二级分类下的商品
 * @param {Object} params
 * @returns
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
