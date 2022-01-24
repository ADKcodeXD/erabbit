<template>
  <div class='xtx-carousel' @mouseenter="stop" @mouseleave="start">
    <!-- 图片容器 -->
    <ul class="carousel-body" >
      <li class="carousel-item" :class="{fade:index===i}" v-for="slide,i in sliders" :key="i">
        <RouterLink to="/">
          <img :src="slide.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <!-- 切换按钮 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-back"></i></a>
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-more"></i></a>
    <div class="carousel-indicator">
      <span @click="index= i" v-for="item,i in sliders" :key="i" :class="{active:index===i}"></span>
    </div>
  </div>
</template>

<script>
import {
  onUnmounted,
  ref,
  watch
} from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    //  间隔时间
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    //   显示图片的索引
    const index = ref(0)
    let timmer = null
    //   自动播放的逻辑
    const autoPlayfn = () => {
      // 防止定时器重复触发
      clearInterval(timmer)
      //   自动播放定时器
      timmer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    //   监听sliders数据的变化
    watch(() => props.sliders, (newValue) => {
      if (newValue.length && props.autoplay) {
        autoPlayfn()
      }
    }, {
      immediate: true
    })
    // 鼠标进入暂停
    const stop = () => {
      if (timmer) clearInterval(timmer)
    }
    // 开始
    const start = () => {
      if (props.sliders.length && props.autoplay) {
        autoPlayfn()
      }
    }
    // 切换
    const toggle = (step) => {
      // 将要改变的索引
      const newIndex = index.value + step
      if (newIndex > (props.sliders.length - 1)) {
        index.value = 0
        return
      }
      if (newIndex < 0) {
        index.value = props.sliders.length - 1
      }
      index.value = newIndex
    }
    onUnmounted(() => {
      clearInterval(timmer)
    })
    return {
      index,
      stop,
      start,
      toggle
    }
  }
}

</script>
<style scoped lang="less">
  .xtx-carousel {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    position: relative;

    .carousel {
      &-body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -99;
      }

      &-item {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: opacity 0.5s linear;

        &.fade {
          opacity: 1;
          z-index: 1;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .active {
        background-color: white;
      }

      &-indicator {
        position: absolute;
        left: 0;
        bottom: 20px;
        z-index: 2;
        width: 100%;
        text-align: center;

        span {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          cursor: pointer;

          ~span {
            margin-left: 12px;
          }

          &.active {
            background: #fff;
          }
        }
      }

      &-btn {
        width: 44px;
        height: 44px;
        background: rgba(0, 0, 0, .2);
        color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 228px;
        z-index: 2;
        text-align: center;
        line-height: 44px;
        opacity: 0;
        transition: all 0.5s;

        &.prev {
          left: 20px;
        }

        &.next {
          right: 20px;
        }
      }
    }

    &:hover {
      .carousel-btn {
        opacity: 1;
      }
    }
  }

</style>
