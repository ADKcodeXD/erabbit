import request from "@/utils/request";

/**
 * 结算页面的生成订单接口
 * @returns 
 */
export const createOrder=()=>{
    return request('/member/order/pre','get');
}



// 添加收货地址
export const addAddress=(form)=>{
    return request('/member/address','post',form);
}