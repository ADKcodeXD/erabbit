<template>
    <div class="goods-tabs">
    <nav>
      <a :class="{active:activeName==='GoodsDetail'}" @click="activeName='GoodsDetail'" href="javascript:;">商品详情</a>
      <a :class="{active:activeName==='GoodsComment'}" @click="activeName='GoodsComment'" href="javascript:;">商品评价<span>(500+)</span></a>
    </nav>
    <!-- 切换内容的地方 -->  
    <!-- 两个组件 详情和评价 -->
    <keep-alive>
      <component :is="activeName"></component>
    </keep-alive>
  </div>     
</template>

<script>
import { ref } from '@vue/reactivity';
import GoodsDetail from './goods-detail.vue';
import GoodsComment from './goods-comment.vue';
export default {
  name:'GoodsTabs',
  components:{
    GoodsDetail,
    GoodsComment
  },
  setup(){
    // GoodsDetail && GoodsComment
    const activeName=ref('GoodsDetail');

    return{activeName}
  }
}
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>