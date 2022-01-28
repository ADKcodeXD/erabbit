<template>
  <div class="page-login">
    <LoginHeader>欢迎登录</LoginHeader>
    <!-- 中间容器 -->
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;" :class="{active:activeName==='account'}">账户登录</a>
          <a href="javascript:;" :class="{active:activeName==='qrcode'}">扫码登录</a>
        </nav>
        <!-- 账号登录和扫码登录的组件切换 -->
        <!-- 表单 -->
        <LoginForm v-if="activeName==='account'" class="account-box" >表单</LoginForm>
        <!-- 二维码 -->
        <div v-if="activeName==='qrcode'" class="qrcode-box" >
          <img src="@/assets/images/qrcode.jpg" alt="">
          <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
        </div>
      </div>
    </section>
    <!-- 结束 -->
    <LoginFooter></LoginFooter>
  </div>
</template>
<script>
  import LoginHeader from './components/login-header.vue'
  import LoginFooter from './components/login-footer.vue'
  import LoginForm from './components/login-form.vue'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
  export default {
    name: 'PageLogin',
    components: {
      LoginHeader,
      LoginFooter,
      LoginForm
    },
    setup() {
        const activeName=ref('account');
        // 存储回跳地址
        const store=useStore();
        const route=useRoute();
        store.commit('user/setRedirectUrl',route.query.redirectUrl || '/');
        return{activeName}
    }
  }

</script>
<style scoped lang="less">
  .login-section {
    background: url(../../assets/images/login-bg.png) no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
      width: 380px;
      background: #fff;
      min-height: 400px;
      position: absolute;
      left: 50%;
      top: 54px;
      transform: translate3d(100px, 0, 0);
      box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        // 二维码容器
        .qrcode-box {
        text-align: center;
        padding-top: 40px;
        p {
            margin-top: 20px;
            a {
            color: @xtxColor;
            font-size: 16px;
            }
        }
        }
      nav {
        height: 55px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        padding: 0 40px;
        text-align: right;
        align-items: center;

        a {
          flex: 1;
          line-height: 1;
          display: inline-block;
          font-size: 18px;
          position: relative;

          &:first-child {
            border-right: 1px solid #f5f5f5;
            text-align: left;
          }

          &.active {
            color: @xtxColor;
            font-weight: bold;
          }
        }
      }
    }
  }

</style>
