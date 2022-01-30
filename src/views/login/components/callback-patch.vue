<template>
  <Form ref="formCom" :validation-schema="mySchema" v-slot="{errors}" class="xtx-form">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-account"></i>
        <Field :class="{error:errors.account}" name="account" v-model="form.account" class="input" type="text"
          placeholder="请输入用户名" />
      </div>
      <div class="error" v-if="errors.account">{{errors.account}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-shouji"></i>
        <Field :class="{error:errors.mobile}" name="mobile" v-model="form.mobile" class="input" type="text"
          placeholder="请输入手机号" />
      </div>
      <div class="error" v-if="errors.mobile">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-xiaoxizhongxin"></i>
        <Field :class="{error:errors.code}" name="code" v-model="form.code" class="input" type="text"
          placeholder="请输入验证码" />
        <span class="code" @click="send">{{time===0?'发送验证码':time+'s后可发送'}}</span>
      </div>
      <div class="error" v-if="errors.code">{{errors.code}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-yanjing"></i>
        <Field name="password" :class="{error:errors.code}" v-model="form.password" class="input" type="password"
          placeholder="请输入密码" />
      </div>
      <div class="error" v-if="errors.password">{{errors.password}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-shuaxin"></i>
        <Field :class="{error:errors.code}" name="rePassword" v-model="form.rePassword" class="input" type="password"
          placeholder="请确认密码" />
      </div>
      <div class="error" v-if="errors.rePassword">{{errors.rePassword}}</div>
    </div>
    <a href="javascript:;" @click="submit" class="submit">立即提交</a>
  </Form>
</template>

<script>
  import {
    Form,
    Field
  } from 'vee-validate';
  import {
    reactive,
    ref,
    onUnmounted
  } from 'vue';
  import schema from '@/utils/vee-validate-schema';
  import Message from '@/components/library/Message';
  import {
    useIntervalFn
  } from '@vueuse/shared';
  import {
    userQQPatchCode,
    userQQRegister
  } from '@/api/user'
import { useRouter } from 'vue-router';
  export default {
    name: 'CallbackPatch',
    components: {
      Form,
      Field
    },
    props: {
      unionId: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      const formCom = ref(null);
      // 表单校验
      const form = reactive({
        account: null,
        mobile: null,
        code: null,
        password: null,
        rePassword: null
      })
      // yanzheng
      const mySchema = {
        account: schema.accountApi,
        mobile: schema.mobile,
        code: schema.code,
        password: schema.password,
        rePassword: schema.rePassword
      }
      // send 短信验证码 byqqpatch--------------------------
      const time = ref(0);
      const {
        pause,
        resume,
        isActive
      } = useIntervalFn(() => {
        time.value--;
        if (time.value <= 0) {
          pause();
        }
      }, 1000, false);
      // send 发送二维码函数
      const send = async () => {
        const valid = schema.mobile(form.mobile);
        if (valid === true) {
          if (time.value === 0) {
            // 校验通过 发送验证码
            const data = await userQQPatchCode(form.mobile);
            console.log(data);
            Message({
              type: 'success',
              text: '短信发送成功'
            });
            time.value = 60;
            resume();
          }
        } else {
          // 提示vee的错误函数
          formCom.value.setFieldError('mobile', valid)
        }
      }
      onUnmounted(() => {
        pause();
      })
      // send 结束  ---------------------------------------

      // 提交信息------------------------------------------
      const router=useRouter();
      const submit = () => {
        const valid = formCom.value.validate();
        if (valid) {
          userQQRegister({
            unionId: props.unionId,
            ...form
          }).then(data => {
            const {
              id,
              account,
              avatar,
              mobile,
              nickname,
              token
            } = data.result;
            store.commit('user/setUser',{id,account,avatar,mobile,nickname,token})
            store.dispatch('cart/mergeCart').then(()=>{
              Message({type:'success',text:'登录成功'})
              router.push(route.query.redirectUrl||'/');
            })
          }).catch(error => {
            if (error.response) {
              Message({
                type: 'error',
                text: error.response.data.message
              });
            }
          })
        } else {
          Message({
            type: 'error',
            text: '请检验验证码或手机'
          })
        }
      }
      // 提交信息------------------------------------------
      return {
        form,
        mySchema,
        formCom,
        send,
        time,
        submit
      }
    }
  }

</script>

<style scoped lang='less'>
  .code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;

    &:hover {
      cursor: pointer;
    }
  }

</style>
