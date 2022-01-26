import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {Number} id
 * @returns
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}


/**
 * 猜你喜欢模块api
 * @param {String} id 
 * @param {Number} limit 
 * @returns 
 */
export const findRelevantGoods = ({id,limit=16}) => {
  return request('/goods/relevant', 'get', { id ,limit})
}