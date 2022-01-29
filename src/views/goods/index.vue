<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`" v-if="goods">{{goods.categories[1].name}}
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`" v-if="goods">{{goods.categories[0].name}}
        </XtxBreadItem>
        <XtxBreadItem>{{goods.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goods-image :images="goods.mainPictures"></goods-image>
          <goods-sales></goods-sales>
        </div>
        <div class="spec">
          <goods-name :goods="goods"></goods-name>
          <!-- sku组件 -->
          <goods-sku :goods="goods" @change="changeSku"></goods-sku>
          <!-- 数量选择组件 -->
          <xtx-numbox v-model="num" label="数量" :max="goods.inventory" :class="{disabled:goods.inventory===0}">
          </xtx-numbox>
          <!-- 按钮 -->
          <xtx-button type="primary" @click="insertCart" style="margin-top:20px;">加入购物车</xtx-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->

      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <goods-tabs></goods-tabs>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot />
          <GoodsHot :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    nextTick,
    provide,
    watch
  } from '@vue/runtime-core'
  import {
    useRoute
  } from 'vue-router'

  import {
    findGoods
  } from '@/api/product'
  import {
    ref
  } from 'vue'
  import GoodsRelevant from './components/goods-relevant'
  import GoodsImage from './components/goods-image.vue'
  import GoodsSales from './components/goods-sales.vue'
  import GoodsName from './components/goods-name.vue'
  import GoodsSku from './components/goods-sku.vue'
  import GoodsTabs from './components/goods-tabs.vue';
  import GoodsHot from './components/goods-hot.vue';
  import GoodsWarn from './components/goods-warn.vue';
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
  export default {
    name: 'XtxGoodsPage',
    components: {
      GoodsRelevant,
      GoodsImage,
      GoodsSales,
      GoodsName,
      GoodsSku,
      GoodsTabs,
      GoodsHot,
      GoodsWarn
    },
    setup() {
      // 1、获取商品详情
      const goods = useGoods();
      console.log(goods);
      const changeSku = (skuItem) => {
        if (skuItem.id) {
          goods.value.price = skuItem.price;
          goods.value.oldPrice = skuItem.oldPrice;
          goods.value.inventory = skuItem.inventory;
          
        }
        currSku.value=skuItem;
      }
      // 提供给后代使用的goods
      provide('goods', goods)
      const num = ref(1)

      // 加入购物车
      const store =useStore();
      const currSku=ref(null);
      const insertCart = () => {
        // 返回字段id skuId name attrsText picture price nowPrice  selected stock  count discount isCollect isEffective
        console.log(currSku.value);
        console.log(goods.value);
        const {id:skuId,specsText:attrsText,inventory:stock}=currSku.value;
        const {id,name,price,mainPictures}=goods.value
        console.log(currSku.value);
        if(currSku.value && currSku.value.id){
          store.dispatch('cart/insertCart',{
            id,
            skuId,
            name,
            price,
            nowPrice:price,
            picture:mainPictures[0],
            selected:true,
            isEffective:true,
            stock,
            attrsText,
            count:num.value
          }).then(()=>{
            Message({type:'success',text:'加入购物车成功'})
          })
          // 加入购物车成功
          console.log(store.state.cart.list);
        }else{
          Message({type:'warn',text:'请选择规格'})
        }
      }
      return {
        goods,
        changeSku,
        num,
        insertCart
      }
    }
  }
  // hooks函数
  const useGoods = () => {
    // 出现路由商品id发生变化了 。。
    const goods = ref(null)
    const route = useRoute()

    watch(() => route.params.id, (newValue) => {
      if (newValue && `/product/${newValue}` === route.path) {
        findGoods(route.params.id).then(data => {
          goods.value = null
          nextTick(() => {
            goods.value = data.result
          })
        })
      }
    }, {
      immediate: true
    })

    return goods
  }

</script>

<style scoped lang='less'>
  .disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }

  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

</style>
