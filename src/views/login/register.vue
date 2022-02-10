<template>
  <LoginHeader>注册用户</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>

  <section class="container" v-else>
    <div class="tab-content">
      <register-info></register-info>
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from "./components/login-header.vue";
import LoginFooter from "./components/login-footer.vue";
import CallbackPatch from "./components/callback-patch.vue";
import CallbackBind from "./components/callback-bind.vue";
import RegisterInfo from './components/register-info.vue'
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Register",
  components: { LoginHeader, LoginFooter, CallbackBind, CallbackPatch,RegisterInfo },
  setup() {

    const route = useRoute();
    const store = useStore();
    const router = useRouter();

    

    return {};
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center /
        100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
