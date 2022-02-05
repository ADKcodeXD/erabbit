<template>
  <div class="member-order">
    <XtxTabs v-model="activeName">
      <XtxTabsPannel
        v-for="(item, index) in orderStatusa"
        :key="index"
        :name="item.name"
        :label="item.label"
      >
        <!-- {{item.label}} -->
      </XtxTabsPannel>
    </XtxTabs>

    <!-- 订单列表 -->
    <div class="order-list">
      <OrderItem v-for="item in orderList" :key="item.id" :order="item" />
    </div>
    <!-- 分页器 -->
    <XtxPagination />
  </div>
</template>

<script>
// import XtxTabsPannel from "@/components/library/xtx-tabs-pannel.vue";
// import XtxTabs from '@/components/library/xtx-tabs';
import { orderStatus } from "@/api/constants";
import AllOrder from "./components/order-item.vue";
import OrderItem from "./components/order-item.vue";
import { findMyOrder } from "@/api/order";
import { reactive, ref } from "vue";
export default {
  name: "MemberOrder",
  components: { AllOrder, OrderItem },
  setup() {
    const activeName = ref("all");
    const orderData = orderStatus;
    const orderStatusa = ref(null);
    orderStatusa.value = orderData;

    const orderList = ref([]);
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      orderState: 0,
    });
    findMyOrder(reqParams).then (data=>{
      orderList.value=data.result.items;
    })
    return {
      activeName,
      orderStatusa,
      orderList
    };
  },
};
</script>

<style lang="less" scoped>
.order-list {
  background: #fff;
  padding: 20px;
}
</style>