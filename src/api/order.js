import request from "@/utils/request";

/**
 * 结算页面的生成订单接口
 * @returns 
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get');
}



// 添加收货地址
export const addAddress = (form) => {
  return request('/member/address', 'post', form);
}


// 修改收货地址
export const updateAddress = (form) => {
  return request(`/member/address/${form.id}`, 'put', form);
}
/**
 * 提交订单的接口
 * @param {*} reqParams 
 * @returns 
 */
export const submitOrder = (reqParams) => {
  return request('/member/order', 'post', reqParams);
}
/**
 * 查询订单详情
 * @param {*} orderId 
 * @returns 
 */
export const findOrderDetails = (orderId) => {
  return request(`/member/order/${orderId}`, 'get');
}
/**
 * 获取我的订单  state为每个状态
 * @param {*} reqParams 
 * @returns 
 */
export const findMyOrder = ({page=1,pageSize=10,orderState=0}) => {
  return request('/member/order', 'get', {page,pageSize,orderState});
}
