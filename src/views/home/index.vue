<template>
  <div class="container">
    <!-- 首页入口 -->
    <div class="home-entry">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
    <!-- 新鲜好物 -->
    <home-new></home-new>

    <!-- 面板2 -->
    <home-hot></home-hot>

    <!-- 品牌组件 -->
    <HomeBrand/>

    <HomeProduct/>

    <home-speial></home-speial>
  </div>
</template>

<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
import HomeProduct from './components/home-product.vue'
import HomeSpeial from './components/home-special.vue'
export default {
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpeial
  },
  name: 'home'
}

</script>

<style lang="less" scoped>

</style>
