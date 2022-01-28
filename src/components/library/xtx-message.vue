<template>
  <transition name="jinru">
    <div v-if="visable2" class="xtx-message" :style="style[type]">
      <!-- 上面绑定的是样式 -->
      <!-- 不同提示图标会变 -->
      <i class="iconfont" :class="[style[type].icon]"></i>
      <span class="text">{{text}}</span>
    </div>
  </transition>

</template>
<script>
  import {
    onMounted,
    onBeforeUnmount,
    toRefs,
    watch
  } from '@vue/runtime-core';
  import {
    ref
  } from 'vue'
  export default {
    name: 'XtxMessage',
    props: {
      text: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        // warn 警告  error 错误  success 成功
        default: 'warn'
      },
      visable: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
      const style = {
        warn: {
          icon: 'icon-warning',
          color: '#E6A23C',
          backgroundColor: 'rgb(253, 246, 236)',
          borderColor: 'rgb(250, 236, 216)'
        },
        error: {
          icon: 'icon-wrong',
          color: '#F56C6C',
          backgroundColor: 'rgb(254, 240, 240)',
          borderColor: 'rgb(253, 226, 226)'
        },
        success: {
          icon: 'icon-success',
          color: '#67C23A',
          backgroundColor: 'rgb(240, 249, 235)',
          borderColor: 'rgb(225, 243, 216)'
        }
      }
      let visable2 = ref(props.visable);
      onMounted(() => {
        visable2.value = true;
      })
      return {
        style,
        visable2
      }
    }
  }

</script>
<style scoped lang="less">
  .jinru-enter-to,
  .jinru-leave-from {
    transform: translateY(0);
  }

  .jinru-enter-active,
  .jinru-leave-active {
    transition: all 0.5s ease;
  }

  .jinru-enter-from,
  .jinru-leave-to {
    transform: translateY(-100%);
  }

  .xtx-message {
    width: 300px;
    height: 50px;
    position: fixed;
    z-index: 9999;
    left: 50%;
    margin-left: -150px;
    top: 25px;
    line-height: 50px;
    padding: 0 25px;
    border: 1px solid #e4e4e4;
    background: #f5f5f5;
    color: #999;
    border-radius: 4px;

    i {
      margin-right: 4px;
      vertical-align: middle;
    }

    .text {
      vertical-align: middle;
    }
  }

</style>
