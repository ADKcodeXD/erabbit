<template>
 
    <LoginHeader>联合登录</LoginHeader>
    <section class="container" v-if="isBind">
        <div class="unbind">
            <div class="loading"></div>
        </div>
    </section >
    
    <section class="container" v-else>
      <nav class="tab">
        <a @click="hasAccount=true" :class="{active:hasAccount}" href="javascript:;">
          <i class="iconfont icon-shouji" />
          <span>已有小兔鲜账号，请绑定手机</span>
        </a>
        <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
          <i class="iconfont icon-edit" />
          <span>没有小兔鲜账号，请完善资料</span>
        </a>
      </nav>
      <div class="tab-content" v-if="hasAccount">
        <CallbackBind :unionId="unionId" :nickname="nickname" :avatar="avatar" />
      </div>
      <div class="tab-content" v-else>
        <CallbackPatch :unionId="unionId" />
      </div>
    </section>
    <LoginFooter />
  
</template>

<script>
import LoginHeader from './components/login-header.vue';
import LoginFooter  from './components/login-footer.vue';
import CallbackPatch from './components/callback-patch.vue';
import CallbackBind from './components/callback-bind.vue';
import {userQQLogin} from '@/api/user'
import QC from 'qc';
import {ref} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Message from '@/components/library/Message';
  export default {
    name: 'Callback',
    components:{LoginHeader,LoginFooter,CallbackBind,CallbackPatch},
    setup(){
        const hasAccount=ref(true);
        const nickname=ref(null);
        const avatar=ref(null);
        // 绑定否？
        const isBind=ref(true); 
        // 默认为已注册已绑定
        const route=useRoute();
        const store=useStore();
        const router=useRouter();
        let unionId=ref(null);

        if(QC.Login.check()){
            // 确保qq已经登陆
            QC.Login.getMe((openId)=>{
                unionId.value=openId;
                // 获取唯一标识 请求后台 去登录 
                userQQLogin({unionId:unionId.value}).then((data) => {
                    const {id,account,avatar,mobile,nickname,token}=data.result;
                    store.commit('user/setUser',{id,account,avatar,mobile,nickname,token});
                    store.dispatch('cart/mergeCart').then(()=>{
                      Message({type:'success',text:'登录成功！'})
                      router.push(store.state.user.redirectUrl);
                    })
                    
                }).catch((err) => {
                    // 登录失败
                    isBind.value=false;
                });
            })
        }
        return{hasAccount,nickname,avatar,isBind,unionId}
    }
  }

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
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
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
