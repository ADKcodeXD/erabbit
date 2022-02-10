import request from "@/utils/request";



/**
 * 登录接口
 * @param {*} param0 
 * @returns 
 */
export const userAccountLogin=({account,password})=>{
    return request('/login', 'post', { account, password })
}

/**
 * 获取手机验证码
 * @param {*} param0 
 * @returns 
 */
export const userMessageLogin=(mobile)=>{
    return request('/login/code', 'get', {mobile})
}

/**
 * 短信验证码登录 （默认code为123456）
 * @param {*} param0 
 * @returns 
 */
export const userMobileLogin=({mobile,code})=>{
    return request('/login/code', 'post', {mobile,code})
}

/**
 * 使用qq登录的api
 * @param {*} param0 
 * @returns 
 */
export const userQQLogin=({unionId,source=1})=>{
    return request('/login/social', 'post', {unionId,source})
}


// /login/social/bind

export const userQQBind=({unionId,mobile,source=1})=>{
    return request('/login/social/bind', 'post', {unionId,source})
}
/**
 * 发送短信验证
 * @param {*} mobile 
 * @returns 
 */
export const userQQBindSms=(mobile)=>{
    return request('/login/social/code', 'get', {mobile})
}
/**
 * qq登录绑定
 * @param {*} mobile 
 * @returns 
 */
export const userQQBindSubmit=({unionId,mobile,code})=>{
    return request('/login/social/bind', 'post', {unionId,mobile,code})
}
/**
 * 校验用户名是否唯一
 * @param {*} account 
 * @returns 
 */
export const userAccountOnly=(account)=>{
    return request('/register/check', 'get', {account})
}

/**
 * 使用qq登录 注册获取验证码
 * @param {*} account 
 * @returns 
 */
export const userQQPatchCode=(mobile)=>{
    return request('/register/code', 'get', {mobile})
}

/**
 * qq登录注册完善信息
 * @param {*} mobile 
 * @returns 
 */
 export const userQQRegister=({unionId,account,mobile,code,password})=>{
    return request(`/login/social/${unionId}/complement`, 'post',{unionId,account,mobile,code,password})
}


/**
 * /register/code 注册获取手机验证码
 * @param {*} mobile 
 * @returns 
 */
export const userRegisterCode=(mobile)=>{
    return request(`/register/code?mobile=${mobile}`, 'get')
}

/**
 * pc注册接口
 * @param {*} param0 
 * @returns 
 */
export const userRegister=({account,mobile,code,password})=>{
    return request('/register', 'post',{account,mobile,code,password})
}

