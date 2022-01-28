<template>
  <Form ref="formCom" :validation-schema="mySchema" v-slot="{errors}" class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{nickName}} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <form class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-shouji"></i>
        <Field :class="{error:errors.mobile}" v-model="form.mobile" class="input" name="mobile" type="text"
          placeholder="绑定的手机号" />
        <div class="error" v-if="errors.mobile">{{errors.mobile}}</div>
      </div>
    </form>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{error:errors.code}" v-model="form.code" name="code" class="input" type="text"
          placeholder="短信验证码" />
        <span class="code" @click="send" v-if="time===0">发送验证码</span>
        <span class="code" @click="send" v-else>{{time}}s后可发送</span>
        <div class="error" v-if="errors.code">{{errors.code}}</div>

      </div>
    </div>
    <a href="javascript:;" @click="submit" class="submit">立即绑定</a>
  </Form>
</template>

<script>
  import QC from 'qc';
  import {
    onUnmounted,
    reactive,
    ref
  } from 'vue';
  import {
    Form,
    Field
  } from 'vee-validate';
  import schema from '@/utils/vee-validate-schema';
import Message from '@/components/library/Message';
import {useIntervalFn} from '@vueuse/shared';
import {userQQBindSms,userQQBindSubmit } from '@/api/user';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
  export default {
    name: 'CallbackBind',
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
      // 准备信息
      const nickName = ref('jack');
      const avatar = ref('null');
      const router=useRouter();
      const store=useStore();
      //这里不知道为什么无法获取到信息   
      if (QC.Login.check()) {
        QC.api('get_user_info').success(res => {
          avatar.value = res.data.figureurl_1
          nickname.value = res.data.nickname
        })
      }
      // 校验
      let form = reactive({
        mobile: null,
        code: null
      })

    const mySchema = {
        mobile: schema.mobile,
        code: schema.code
    }
    const formCom=ref(null);
    // 发送短信验证码 -----------------------------------------------
    const time=ref(0);
    const {pause,resume,isActive} = useIntervalFn(()=>{
        time.value--;
        if(time.value<=0){
            pause();
        }
    },1000,false);
    // send 发送二维码函数
    const send = async () => {
    const valid = schema.mobile(form.mobile);
    if (valid === true) {
        if (time.value === 0) {
        // 校验通过 发送验证码
        await userQQBindSms(form.mobile);
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
    onUnmounted(()=>{
        pause();
    })
    // 发送短信验证码 -----------------------------------------------
      //立即绑定
      const submit=()=>{
          const valid=formCom.value.validate();
          if(valid){
              userQQBindSubmit({
                  unionId:props.unionId,
                  ...form
              }).then(data=>{
                    const {id,account,avatar,mobile,nickname,token}=data.result;
                    store.commit('user/setUser',{id,account,avatar,mobile,nickname,token})
                    Message({type:'success',text:'登录成功'})
                    router.push(store.state.user.redirectUrl);
              }).catch(error=>{
                  if(error.response){
                      Message({type:'error',text:error.response.data.message});
                  }
              })
          }else{
              Message({type:'error',text:'请检验验证码或手机'})
          }
      }
      return {
        nickName,
        avatar,
        form,
        mySchema,
        schema,
        send,
        formCom,
        time,
        submit
      }
    }
  }

</script>

<style scoped lang='less'>
  .user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;

    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }

    p {
      padding-left: 10px;
    }
  }

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
