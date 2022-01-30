<template>
  <XtxDialog title="添加收货地址" v-model:visiable="dialogVisible">
    <!-- 表单 -->
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input v-model="formData.receiver" class="input" placeholder="请输入收货人" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input v-model="formData.contact" class="input" placeholder="请输入手机号" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <XtxCity @change-result="changeCity" :fullLocation="formData.fullLocation" placeholder="请选择所在地区" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input v-model="formData.address" class="input" placeholder="请输入详细地址" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input v-model="formData.provinceCode" class="input" placeholder="请输入邮政编码" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input v-model="formData.addressTags" class="input" placeholder="请输入地址标签，逗号分隔" />
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <template #footer>
      <XtxButton @click="dialogVisible=false" type="gray" style="margin-right:20px">取消</XtxButton>
      <XtxButton @click="submit" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
  import xtxDialog from '@/components/library/xtx-dialog.vue'
  import {
    reactive,
    ref
  } from 'vue';
import { addAddress } from '@/api/order';
import Message from '@/components/library/Message';
  export default {
    components: {
      xtxDialog
    },
    name: 'AddressEdit',
    setup(props,{emit}) {
      const dialogVisible = ref(false);

      //定义一个open函数 作为打开对话框的函数
      const open = () => {
        dialogVisible.value = true;
        for(const key in formData){
          formData[key]=null;
          if(key==='isDefault') formData[key]=1;
        }
      }

      const formData = reactive({
        receiver: null,
        contact: null,
        provinceCode: null,
        cityCode: null,
        countyCode: null,
        address: null,
        postalCode: null,
        addressTags: null,
        isDefault: 1,
        fullLocation:null
      })

      const changeCity=(result)=>{
        formData.cityCode=result.cityCode;
        formData.provinceCode=result.provinceCode;
        formData.countyCode=result.countyCode;
        formData.fullLocation=result.fullLocation;
      }
      // 提交的函数
      const submit=async ()=>{
        //TODO 表单的校验等
        const {data}=await addAddress(formData);
        formData.id=data.result.id;
        Message({type:'success',text:'添加成功'});
        dialogVisible.value=false;
        emit('on-success',formData);
      }
      return {
        dialogVisible,
        open,
        formData,
        changeCity,
        submit
      }
    }

  }

</script>

<style scoped lang="less">
  .xtx-dialog {
    :deep(.wrapper) {
      width: 780px;

      .body {
        font-size: 14px;
      }
    }
  }

  .xtx-form {
    padding: 0;

    input {
      outline: none;

      &::placeholder {
        color: #ccc;
      }
    }
  }

  .xtx-city {
    width: 320px;

    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;

      .placeholder {
        color: #ccc;
      }

      i {
        color: #ccc;
        font-size: 18px;
      }

      .value {
        font-size: 14px;
      }
    }

    :deep(.option) {
      top: 49px;
    }
  }

</style>
