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

/**
 * 获取热销榜
 * @param {Object} param
 * @returns 
 */
export const findHotGoods = ({id,limit=3,type=1}) => {
  return request('/goods/hot', 'get', { id ,limit,type})
}

/**
 * 获取评论
 * @param {Object} param0 
 * @returns 
 */
export const findGoodsComment = (id) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}
/**
 * 获取评论列表 byparams
 * https: //mock.boxuegu.com/mock/1175/goods/${id}/evaluate
 * @param {*} id 
 * @param {*} params 
 * @returns 
 */
export const findGoodsCommentByParams = (id,params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get',params)
}