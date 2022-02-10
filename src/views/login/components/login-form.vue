<template>
  <div class="account-box">
    <!-- 切换登录方式主体 -->
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-accountfilling"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-code"></i> 使用短信登录
      </a>
    </div>
    <!-- 表单组件主体 -->
    <Form
      class="form"
      ref="formCom"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <!-- 密码登录 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-accountfilling"></i>
            <Field
              :class="{ error: errors.account }"
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名或手机号"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <!-- 为什么会神奇消失？（注释加上就正常显示） -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-edit"></i>
            <Field
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <!-- 短信登录 -->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-shouji"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <!-- 为什么加上这行注释又不消失了 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              v-model="form.code"
              name="code"
              type="password"
              placeholder="请输入验证码"
            />
            <span @click="send" class="code">{{
              time == 0 ? "发送验证码" : `${time}秒后可发送`
            }}</span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>

      <!-- 同意策略 -->
      <div class="form-item">
        <div class="agree">
          <Field
            as="XtxCheckbox"
            name="isAgree"
            :class="{ error: errors.isAgree }"
            v-model="form.isAgree"
          />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" @click="login" class="btn">登录</a>
    </Form>

    <!-- 注册或者忘记密码 -->
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <router-link to="/register" href="javascript:;">免费注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref, watch } from "vue";
import { Form, Field } from "vee-validate";
// import QC from 'qc'
import validate from "@/utils/vee-validate-schema";
import {
  userAccountLogin,
  userMessageLogin,
  userMobileLogin,
} from "@/api/user";
import { useSend } from "@/hooks/userlogin";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useIntervalFn } from "@vueuse/shared";
export default {
  name: "LoginForm",
  components: {
    Form,
    Field,
  },
  setup() {
    const isMsgLogin = ref(false);
    // 表单数据
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null,
    });

    const formCom = ref(null);
    // 定义校验的规则
    const schema = {
      account: validate.account,
      password: validate.password,
      mobile: validate.mobile,
      code: validate.code,
      isAgree: validate.isAgree,
    };
    // 监听isMsgLogin 重置表单
    watch(isMsgLogin, () => {
      form.isAgree = true;
      form.account = null;
      form.password = null;
      form.mobile = null;
      form.code = null;
      formCom.value.resetForm();
    });
    // 获取当前实例
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // 点击登录的时候对整体表单进行校验
    const login = async () => {
      const valid = await formCom.value.validate();
      if (valid) {
        try {
          let data = null;
          if (isMsgLogin.value) {
            // 手机号登录
            // 1、发送验证码
            // 2、校验
            const { mobile, code } = form;
            data = await userMobileLogin({ mobile, code });
          } else {
            const { account, password } = form;
            data = await userAccountLogin({ account, password });
          }
          // 成功后
          const { id, account, avatar, mobile, nickname, token } = data.result;
          store.commit("user/setUser", {
            id,
            account,
            avatar,
            mobile,
            nickname,
            token,
          });
          store.dispatch("cart/mergeCart").then(() => {
            proxy.$message({ type: "success", text: "登录成功" });
            router.push(route.query.redirectUrl || "/");
          });
        } catch (error) {
          if (error.response) {
            proxy.$message({
              type: "error",
              text: error.response.data.message || "登录失败",
            });
          }
        }
      } else {
        proxy.$message({ type: "error", text: "请校验输入的数据" });
      }
    };
    // 定时器方法
    const time = ref(0);
    const { pause, resume, isActive } = useIntervalFn(
      () => {
        time.value--;
        if (time.value <= 0) {
          pause();
        }
      },
      1000,
      false
    );
    const send = async () => {
      const valid = schema.mobile(form.mobile);
      if (valid === true) {
        if (time.value === 0) {
          // 校验通过 发送验证码
          await userMessageLogin(form.mobile);
          proxy.$message({ type: "success", text: "短信发送成功" });
          time.value = 60;
          resume();
        }
      } else {
        // 提示vee的错误函数
        formCom.value.setFieldError("mobile", valid);
      }
    };

    return {
      isMsgLogin,
      form,
      schema,
      formCom,
      login,
      send,
      time,
    };
  },
};
</script>


<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
