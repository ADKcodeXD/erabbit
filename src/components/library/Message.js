// 提供一个toast 能够进行轻提示
// 使用方式
// import Message from 'Message.js' Message({type:'error',text:'文字'})
import {
  createVNode
} from 'vue';
import XtxMessage from './xtx-message.vue';
import {
  render
} from 'vue'

const div = document.createElement('div');
div.setAttribute('class', 'xtx-message-cotainer');
// 给div一个标识
document.body.appendChild(div);

// 定时器
let timmer = null;

export default ({
  type,
  text
}) => {
  // 渲染组件
  // 把组件编译成dom节点的函数createVNode
  const vnode = createVNode(XtxMessage, {
    type,
    text
  });
  // 此时vnode就是解析过后的dom节点了
  // 将vnode放入上面创建好的div里面
  // render函数 渲染虚拟节点
 
  render(vnode, div);
  // 过一段时间 把这个节点销毁
  // 
  clearTimeout(timmer)
  timmer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
