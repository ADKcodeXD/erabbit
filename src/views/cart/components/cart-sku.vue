<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle()">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visable">
      <div v-if="loading" class="loading"></div>
      <GoodsSku @change="changeSku" :goods="goods" :skuId="skuId" />
      <XtxButton @click="submit" v-if="goods" type="primary" size="mini" style="margin-left:60px">确认</XtxButton>
    </div>
  </div>
</template>
<script>
  import {
    onClickOutside
  } from '@vueuse/core';
  import {
    ref
  } from 'vue'
  import {
    getNewGoodsSku
  } from '@/api/cart';
  import GoodsSku from '@/views/goods/components/goods-sku.vue';
  export default {
    name: 'CartSku',
    components: {
      GoodsSku
    },
    props: {
      attrsText: {
        type: String,
        default: ''
      },
      skuId: {
        type: String,
        default: ''
      }
    },
    setup(props,{emit}) {
      const target = ref(null);
      let visable = ref(false)
      const goods = ref(null);
      const loading = ref(false);
      const hide = () => {
        visable.value = false;
      }

      const show = () => {
        loading.value = true;
        getNewGoodsSku(props.skuId).then(data => {
          console.log(data.result);
          goods.value = data.result;
          loading.value = false;
          visable.value = true;
        })
      }

      const toggle = () => {
        visable.value ? hide() : show();
      }

      onClickOutside(target, () => {
        hide()
      })
        // 更改sku
      const currSku=ref(null);
      const changeSku=(sku)=>{
          currSku.value=sku;
      }

    // 点击确认
    const submit=()=>{
        console.log(1);
        console.log(currSku.value);
        if(currSku.value && currSku.value.id && currSku.value.id!==props.skuId){
            console.log(2);
            emit('change',currSku.value);
            hide();
        }
    }
      return {
        target,
        toggle,
        visable,
        goods,
        loading,
        changeSku,
        submit
      }
    }
  }

</script>
<style scoped lang="less">
  .cart-sku {
    height: 28px;
    border: 1px solid #f5f5f5;
    padding: 0 6px;
    position: relative;
    margin-top: 10px;
    display: inline-block;

    .attrs {
      line-height: 24px;
      display: flex;
      cursor: pointer;

      span {
        max-width: 230px;
        font-size: 14px;
        color: #999;
      }

      i {
        margin-left: 5px;
        font-size: 14px;
      }
    }

    .layer {
      position: absolute;
      left: -1px;
      top: 40px;
      z-index: 10;
      width: 400px;
      border: 1px solid @xtxColor;
      box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
      background: #fff;
      border-radius: 4px;
      font-size: 14px;
      padding: 20px;


      &::before {
        content: "";
        width: 12px;
        height: 12px;
        border-left: 1px solid @xtxColor;
        border-top: 1px solid @xtxColor;
        position: absolute;
        left: 12px;
        top: -8px;
        background: #fff;
        transform: scale(.8, 1) rotate(45deg);
      }

      .loading {
        height: 224px;
        background: url(../../../assets/images/loading.gif) no-repeat center;
      }
    }
  }

</style>
