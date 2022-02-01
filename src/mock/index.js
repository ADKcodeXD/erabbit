import Mock from 'mockjs';

import qs from 'qs';


// 配置mock
Mock.setup({
  timeout: '500-1000'
})

// 拦截接口
// 1、接口地址路径规则
// 2、请求方式
// 3、放回数据的函数
Mock.mock(/\/member\/collect/, 'get', (config) => {
  console.log(config);
  const queryString = config.url.split('?')[1];
  //   获取查询对象
  const queryObject = qs.parse(queryString);
  const items = []
  for (let i = 0; i < queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(4,10)',
      price: '@float(100,200,2,2)',
      picture: '@image(160*160)'
    }))
  }

  return {
    msg: '获取数据成功',
    result:{
        counts: 35,
        pageSize: +queryObject.pageSize,
        page: +queryObject.page,
        items
    }
  }
});
