<template>
  <div class="tabs-pannel" v-show="activeName===name">
    <slot />
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  name: "XtxTabsPannel",
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const activeName = inject('activeName');
    console.log(props.name,activeName);
    return { activeName };
  },
};
</script>

<style lang="less" scoped>
</style>