<template>
  <div class="container">
    <!-- 首页入口 -->
    <div class="home-entry">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
    </div>
  </div>
</template>

<script>
import HomeCategory from './components/home-category.vue'
export default {
  components: { HomeCategory },
  name: 'home'

}
</script>

<style lang="less" scoped>

</style>
