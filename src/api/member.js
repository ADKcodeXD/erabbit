import request from '@/utils/request';

/**
 * 获取收藏的商品
 * @param {*} param0 
 * @returns 
 */
export const findCollect=({page=1,pageSize=10,collectType=1})=>{
    return request('/member/collect','get',{page,pageSize,collectType})
}