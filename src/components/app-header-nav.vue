<template>
  <ul class="app-header-nav">

    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li v-for="item in list " :key="item.id" @mouseenter="show(item.id)" @mouseleave="hide(item.id)">
      <router-link :to="`/category/${item.id}`" @click="hide(item.id)">{{item.name}}</router-link>
      <div class="layer" :class="{open:item.open}">
        <ul>
          <li v-for="child in item.children" :key="child.id ">
            <router-link :to="`/category/sub/${child.id}`" @click="hide(item.id)">
              <img :src="child.picture" alt="">
              <p>{{child.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import {
  computed
} from '@vue/runtime-core'
import {
  useStore
} from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })

    // 定义show和hide函数
    const show = (id) => {
      store.commit('category/show', id)
    }
    const hide = (id) => {
      store.commit('category/hide', id)
    }

    return {
      list,
      show,
      hide
    }
  }
}

</script>

<style lang="less" scoped>
  .app-header-nav {
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    position: relative;

    >li {
      margin-right: 40px;
      width: 38px;
      text-align: center;

      >a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }

      &:hover {
        >a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
      }

      &:hover {
        >a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }

        // >.layer {
        //   height: 132px;
        //   opacity: 1;
        // }
      }
    }
  }

  // 二级目录样式
  .layer {
    &.open {
      height: 132px;
      opacity: 1;
    }

    width: 1240px;
    background-color: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transition: all .2s .1s;

    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 70px;
      align-items: center;
      height: 132px;

      li {
        width: 110px;
        text-align: center;

        img {
          width: 60px;
          height: 60px;
        }

        p {
          padding-top: 10px;
        }

        &:hover {
          p {
            color: @xtxColor;
          }
        }
      }
    }
  }

</style>
