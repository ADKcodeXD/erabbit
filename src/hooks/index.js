// 提供复用逻辑函数
import {useIntersectionObserver} from '@vueuse/core'
import {ref,onUnmounted} from 'vue'
import dayjs from 'dayjs';
import {useIntervalFn} from '@vueuse/shared';
/**
 * 数据懒加载函数
 * @param {Element} target  dom对象
 * @param {Function} apiFn  api函数
 */
export const useLazyData = (apiFn) => {
  const target = ref(null)
  const result = ref([])
  // stop 是停止观察是否进入或移出可视区域的行为
  const {stop} = useIntersectionObserver(
    // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
    target,
    // isIntersecting 是否进入可视区域，true是进入 false是移出
    // observerElement 被观察的dom
      ([{isIntersecting}], observerElement) => {
      // 在此处可根据isIntersecting来判断，然后做业务
      if (isIntersecting) {
        stop()
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置选项 只要相交的比例大于1即触发
    {
      threshold: 0
    }
  )
  return {
    target,
    result
  }
}


// 参数：一个倒计时的时间

export const usePayTime = () => {
  // 倒计时逻辑
  const time = ref(0);
  const timeText = ref('');
  const {
    pause,
    resume
  } = useIntervalFn(() => {
    if (time.value <= 0) {
      pause()
    }
    time.value--;
    timeText.value = dayjs.unix(time.value).format('mm分ss秒');
  }, 1000, false);

  onUnmounted(() => {
    pause();
  })

  const start = (countdown) => {
    time.value = countdown;
    timeText.value = dayjs.unix(time.value).format('mm分ss秒');
    resume();
  }
  

  return {
    start,
    timeText
  }
}
