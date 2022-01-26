<template>
  <div class="sub-cotainer">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread></sub-bread>

      <!-- 筛选区 -->
      <sub-filter @filter-change="fliterChange"></sub-filter>
      <div class="goods-list">
        <!-- 复选框 -->
        <sub-sort @sort-change="sortChange"></sub-sort>
        <ul>
          <li v-for="good in goodsList" :key="good.id">
            <goods-item :goods="good"></goods-item>
          </li>
        </ul>
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
      <!-- 底部 -->
    </div>
  </div>
</template>

<script>
import subBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import {
  findSubCategoryGoods
} from '@/api/category'
import {
  ref,
  watch
} from 'vue'
import {
  useRoute
} from 'vue-router'
export default {
  components: {
    subBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  name: 'SubCagtegory',
  setup () {
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    const route = useRoute()
    let reqParams = {
      page: 1,
      pageSize: 10
    }
    const getData = () => {
      loading.value = true
      // 加载数据
      reqParams.categoryId = route.params.id

      findSubCategoryGoods(reqParams).then(({
        result
      }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
          loading.value = false
        } else {
          // 没有数据
          finished.value = true
          loading.value = false
        }
      })
    }

    // 监视id更改
    watch(() => route.params.id, (newValue) => {
      if (newValue && `/category/sub/${newValue}` === route.path) {
        finished.value = false
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 10
        }
      }
    })

    // 更改筛选选项的时候 重新发请求。
    const sortChange = (sortParams) => {
      finished.value = false
      goodsList.value = []
      reqParams = {
        ...reqParams,
        ...sortParams
      }
      reqParams.page = 1
    }

    const fliterChange = (params) => {
      finished.value = false
      goodsList.value = []
      reqParams = {
        ...reqParams,
        ...params
      }
      reqParams.page = 1
    }

    return {
      getData,
      loading,
      finished,
      goodsList,
      sortChange,
      fliterChange
    }
  }
}

</script>

<style scoped lang='less'>
  .goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;

    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 5px;

      li {
        margin-right: 20px;
        margin-bottom: 20px;

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }

</style>
