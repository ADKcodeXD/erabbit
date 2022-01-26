<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="bread-fade" mode="out-in">
          <XtxBreadItem :key="topCategroy.id">{{topCategroy.name}}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list" v-if="topCategroy.children">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategroy.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture">
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{sub.name}} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="goods in sub.goods" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XtxBread from '@/components/library/xtx-bread.vue'
import {
  findBanner
} from '@/api/home'
import {
  useStore
} from 'vuex'
import {
  computed,
  watch
} from '@vue/runtime-core'
import {
  useRoute
} from 'vue-router'
import {
  ref
} from 'vue'
import {
  findTopCategory
} from '@/api/category'
import GoodsItem from './components/goods-item.vue'
export default {
  name: 'TopCagtegory',
  components: {
    XtxBread,
    GoodsItem
  },
  setup () {
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })

    // 面包屑+所有子分类
    const store = useStore()
    const route = useRoute()
    const topCategroy = computed(() => {
      let cate = {}
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      if (item) cate = item
      return cate
    })

    // 获取各个子类目下的推荐商品
    const subList = ref([])
    // 监听 sublist的改变
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    watch(() => route.params.id, (newValue) => {
      if (newValue && `/category/${newValue}` === route.path) getSubList()
    }, {
      immediate: true
    })

    return {
      sliders,
      topCategroy,
      subList
    }
  }
}

</script>

<style scoped lang="less">
  .top-category {
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }

    .sub-list {
      margin-top: 20px;
      background-color: #fff;

      ul {
        display: flex;
        padding: 0 32px;
        flex-wrap: wrap;

        li {
          width: 168px;
          height: 160px;

          a {
            text-align: center;
            display: block;
            font-size: 16px;

            img {
              width: 100px;
              height: 100px;
            }

            p {
              line-height: 40px;
            }

            &:hover {
              color: @xtxColor;
            }
          }
        }
      }
    }

    .ref-goods {
      background-color: #fff;
      margin-top: 20px;
      position: relative;

      .head {
        .xtx-more {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .tag {
          text-align: center;
          color: #999;
          font-size: 20px;
          position: relative;
          top: -20px;
        }
      }

      .body {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 65px 30px;
      }
    }
  }

</style>
