// 扩展vue原有的功能 全局组件，自定义指令
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue';
// import XtxMore from './xtx-more.vue';
// import XtxBread from './xtx-bread.vue';
// import XtxBreadItem from './xtx-bread-item.vue';
import defaultImage from '@/assets/images/200.png'
import Message from './Message'

const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // 在app上进行扩展 app提供
    // app.component(XtxSkeleton.name, XtxSkeleton);
    // app.component(XtxCarousel.name, XtxCarousel);
    // app.component(XtxMore.name, XtxMore);
    // app.component(XtxBread.name, XtxBread);
    // app.component(XtxBreadItem.name, XtxBreadItem);
    // 定义指令
    importFn.keys().forEach(path => {
      // 导入组件
      const component = importFn(path).default
      // 进行组件注册
      app.component(component.name, component)
    })
    defineDirective(app)

    // 定义一个原型
    app.config.globalProperties.$message = Message
  }
}

// 定义自定义指令的地方
const defineDirective = (app) => {
  // 图片懒加载指令
  app.directive('lazy', {
    mounted (el, binding) {
      // 定义一个图片懒加载的观察函数
      const observe = new IntersectionObserver(([{
        isIntersecting
      }]) => {
        if (isIntersecting) {
          // 进入可视区域了 所以停止观察
          observe.unobserve(el)
          // 把指令的值设置给el的属性
          el.src = binding.value
          // 图片加载失败
          el.onerror = () => {
            el.src = defaultImage
          }
        }
      }, {
        threshold: 0
      })
      observe.observe(el)
    }
  })
}
