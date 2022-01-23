<template>
  <div class='home-category'>
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id">
        <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        <template v-if="item.children">
          <RouterLink :to="`/category/sub/${sub.id}`" v-for="sub in item.children" :key="sub.id">{{sub.name}}
          </RouterLink>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  computed,
  reactive
} from '@vue/runtime-core'
import {
  useStore
} from 'vuex'
export default {
  name: 'HomeCategory',
  setup () {
    const store = useStore()
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{
        id: 'brand-children',
        name: '品牌推荐'
      }]
    })
    const menuList = computed(() => {
      // 得到9个分类下的子分类只有两个
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })

    return {
      menuList
    }
  }
}

</script>

<style scoped lang='less'>
  .home-category {
    width: 250px;
    height: 500px;
    background: rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 99;

    .menu {
      li {
        padding-left: 40px;
        height: 50px;
        line-height: 50px;

        &:hover {
          background: @xtxColor;
        }

        a {
          margin-right: 4px;
          color: #fff;

          &:first-child {
            font-size: 16px;
          }
        }
      }
    }
  }

</style>
