<template>
  <div class="xtx-checkbox" @click="change()">
    <i v-if="checked" class="iconfont icon-selected"></i>
    <i v-else class="iconfont icon-close"></i>
    <span v-if="$slots.default">
      <slot />
    </span>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = useVModel(props, 'modelValue', emit)
    const change = () => {
      const newValue = !checked.value
      checked.value = newValue
    }
    return { checked, change }
  }
}

</script>
<style scoped lang="less">
  .xtx-checkbox {
    display: inline-block;
    margin-right: 2px;

    .icon-checked {
      color: @xtxColor;

      ~span {
        color: @xtxColor;
      }
    }

    i {
      position: relative;
      top: 1px;
    }

    span {
      margin-left: 2px;
    }
  }

</style>
