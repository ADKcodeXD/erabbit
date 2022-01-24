<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot/></RouterLink>
    <span v-else><slot/></span>
  </div>

</template>

<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}

</script>

<style scoped lang="less">
.xtx-bread-item{
    display: inline;
}
</style>
