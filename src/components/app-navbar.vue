<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li><i class="iconfont icon-accountfilling"></i>{{profile.nickname||profile.account}}</li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <router-link href="javascript:;" to="/login">请先登录</router-link>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-shouji"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {
    computed
  } from '@vue/runtime-core'
  import {
    useStore
  } from 'vuex'
import router from '@/router'
import { useRouter } from 'vue-router'
  export default {
    name: 'AppNavbar',
    setup() {
      const router=useRouter();
      const store = useStore()
      // 使用vuex的属性需要用计算属性 否则不是响应式的
      const profile = computed(() => {
        return store.state.user.profile
      })
      // 退出登录
      const logout=()=>{
        store.commit('user/setUser',{});
        store.commit('cart/setCart',[]);
        router.push('/login')
      }
      return {
        profile,
        logout
      }
    }
  }

</script>

<style scoped lang="less">
  .app-topnav {
    background: #333;

    ul {
      display: flex;
      height: 53px;
      justify-content: flex-end;
      align-items: center;

      li {
        color: white;

        a {
          padding: 0 15px;
          color: #ffffff;
          line-height: 1;
          display: inline-block;

          i {
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: @xtxColor;
            // color: bisque;
          }
        }

        ~li {
          a {
            border-left: 2px solid #666;
          }
        }
      }
    }
  }

</style>
