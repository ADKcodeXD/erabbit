<template>
    <!-- 顶部烂 -->
    <app-navbar></app-navbar>

    <!-- 吸顶头部 -->
    <AppHeaderSticky/>
    <!-- 顶部烂 -->
    <app-header></app-header>

    <!-- 主要内容 -->
    <section class="main">
        <!-- router -->
        <router-view/>
    </section>

    <!-- 底部布局 -->
    <app-footer></app-footer>
</template>

<script>
import { useStore } from 'vuex'
import AppFooter from '../components/app-footer.vue'
import AppHeaderSticky from '../components/app-header-sticky.vue'
import AppHeader from '../components/app-header.vue'
import appNavbar from '../components/app-navbar.vue'
export default {
  components: { appNavbar, AppHeader, AppFooter, AppHeaderSticky },
  name: 'Layout',
  setup () {
    const store = useStore()
    store.dispatch('category/getCategoryList')
  }
}
</script>

<style scoped lang="less">

</style>
