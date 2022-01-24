<template>
  <div class="top-cotainer">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBread>
          <XtxBreadItem :to="{path:'/'}">首页</XtxBreadItem>
          <XtxBreadItem to="/category/1005001">电器</XtxBreadItem>
          <XtxBreadItem>空调</XtxBreadItem>
        </XtxBread>
      </XtxBread>
      <!-- 轮播图 -->
      <!-- 全部分类 -->
      <!-- 各个分类推荐 -->
    </div>
  </div>
</template>

<script>
import XtxBread from '@/components/library/xtx-bread.vue'
export default {
  name: 'TopCagtegory',
  components: {
    XtxBread
  }
}

</script>

<style>

</style>
