<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">同类商品推荐</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <xtx-carousel :sliders="goodsList">

    </xtx-carousel>
  </div>
</template>

<script>
  import {
    ref
  } from 'vue'
  import {
    findRelevantGoods
  } from '@/api/product';
  import xtxCarousel from '@/components/library/xtx-carousel.vue';
  export default {
    components: {
      xtxCarousel
    },
    // 同类推荐，猜你喜欢
    name: 'GoodsRelevant',
    props: {
      goodsId: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      const goodsList = ref([]);
      findRelevantGoods({
        id: props.goodsId
      }).then(data => {
        const pageSize = 4;
        const pageCount = Math.ceil(data.result.length / pageSize);
        for (let i = 0; i < pageCount; i++) {
          goodsList.value.push(data.result.slice(pageSize * i, pageSize * (i + 1)));
        }
        console.log(goodsList.value);
      });
      return {
        goodsList
      }
    }
  }

</script>

<style scoped lang='less'>
  .goods-relevant {
    background: #fff;
    min-height: 460px;
    margin-top: 20px;

    .header {
      height: 80px;
      line-height: 80px;
      padding: 0 20px;

      .title {
        font-size: 20px;
        padding-left: 10px;
      }

      .icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        border-top: 4px solid @xtxColor;
        border-right: 4px solid @xtxColor;
        box-sizing: border-box;
        position: relative;
        transform: rotate(45deg);

        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          left: 0;
          top: 2px;
          background: lighten(@xtxColor, 40%);
        }
      }
    }
  }
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0,0,0,0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
