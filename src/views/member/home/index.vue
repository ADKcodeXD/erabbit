<template>
  <div class="member-home">
    <!-- 概览 -->
    <home-overview></home-overview>
    <!-- 收藏 -->
    <home-pannel title="我的收藏">
      <div class="goods-list">
        <goods-item
          :goods="item"
          v-for="item in collectGoods"
          :key="item.id"
        ></goods-item>
      </div>
    </home-pannel>
    <!-- 足迹 -->
    <home-pannel title="我的足迹"></home-pannel>
    <!-- 猜你喜欢-->
    <goods-relevant></goods-relevant>
  </div>
</template>
<script>
import GoodsRelevant from "@/views/goods/components/goods-relevant.vue";
import homeOverview from "./components/home-overview.vue";
import HomePannel from "./components/home-pannel.vue";
import GoodsItem from "@/views/category/components/goods-item.vue";
import { findCollect } from "@/api/member";
import { ref } from "vue";
export default {
  components: { homeOverview, GoodsRelevant, HomePannel, GoodsItem },
  name: "MemberHome",
  setup() {
    const collectGoods = ref([]);

    findCollect({
      page: 1,
      pageSize: 4,
    }).then((data) => {
      console.log(data);
      collectGoods.value = data.result.items;
    });

    return { collectGoods };
  },
};
</script>
<style scoped lang="less">
.member-home {
  :deep(.xtx-carousel) .carousel-btn.prev {
    left: 5px;
  }
  :deep(.xtx-carousel) .carousel-btn.next {
    right: 5px;
  }
  .goods-list {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }
}
</style>