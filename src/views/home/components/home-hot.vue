<template>
  <HomePannel ref="target" title="人气推荐" subTitle="人气爆款 不容错过">
    <template #right>
      <xtx-more path="/"></xtx-more>
    </template>
    <!-- 面板内容 -->
    <transition name="fade">
      <ul v-if="goods.length" ref="pannel" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <p class="name">{{item.title}}</p>
            <p class="desc">{{item.alt}}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else bg="#f0f9f4" />
    </transition>
  </HomePannel>
</template>

<script>
import HomePannel from './home-pannel.vue'
import HomeSkeleton from './home-skeleton.vue'
import {
  findHot
} from '@/api/home'

import {
  useLazyData
} from '@/hooks'
export default {
  components: {
    HomePannel,
    HomeSkeleton
  },
  name: 'HomeHot',
  setup () {
    // findHot().then((data) => {
    //     goods.value=data.result
    // })
    const { target, result } = useLazyData(findHot)
    return {
      goods: result,
      target
    }
  }
}

</script>

<style lang="less" scoped>
  .goods-list {
    display: flex;
    justify-content: space-between;
    height: 426px;

    li {
      width: 306px;
      height: 406px;
      .hoverShadow();

      img {
        width: 306px;
        height: 306px;
      }

      p {
        font-size: 22px;
        padding-top: 12px;
        text-align: center;
      }

      .desc {
        color: #999;
        font-size: 18px;
      }
    }
  }

</style>
