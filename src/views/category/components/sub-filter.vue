<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="changeBrand(item.id)"
          :class="{ active: item.id === filterData.brands.selectBrand }"
          href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <!-- 第二部分区域 -->
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}:</div>
      <div class="body">
        <a
          @click="changeProp(item.properties, properties.id)"
          :class="{ active: properties.id === item.properties.selectedAttr }"
          href="javascript:;"
          v-for="properties in item.properties"
          :key="properties.id"
          >{{ properties.name }}</a
        >
      </div>
    </div>
  </div>
  <!-- 骨架屏 -->
  <div class="sub-filter" v-else>
    <XtxSkeleton class="item" width="800px" height="40px" animated />
    <XtxSkeleton class="item" width="800px" height="40px" animated />
    <XtxSkeleton class="item" width="600px" height="40px" animated />
    <XtxSkeleton class="item" width="600px" height="40px" animated />
    <XtxSkeleton class="item" width="600px" height="40px" animated />
  </div>
</template>
<script>
import { watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { findSubCategoryFilter } from "@/api/category";
export default {
  name: "SubFilter",
  setup(props, { emit }) {
    //   监听二级泪目id变化获取数据
    const filterData = ref([]);
    const filterLoading = ref(false);
    const route = useRoute();
    watch(
      () => route.params.id,
      (newValue) => {
        // 变化后的id有值
        if (newValue && `/category/sub/${newValue}` === route.path) {
          // 发请求
          findSubCategoryFilter(route.params.id).then((data) => {
            data.result.brands.selectBrand = null;
            data.result.brands.unshift({
              id: null,
              name: "全部",
            });

            data.result.saleProperties.forEach((element) => {
              element.properties.selectedAttr = null;
              element.properties.unshift({
                id: null,
                name: "全部",
              });
            });
            filterData.value = data.result;
          });
        }
      },
      {
        immediate: true,
      }
    );

    // 获取筛选参数的函数
    const getFilterParams = () => {
      // {brandId:'',attrs:[{groupName:dsadas,properties:'hfsaiuhf'}]}
      const obj = { brandId: null, attrs: [] };
      obj.brandId = filterData.value.brands.selectBrand;
      // console.log(filterData.value.saleProperties);
      filterData.value.saleProperties.forEach((item) => {
        if (item.properties.selectedAttr) {
          const prop = item.properties.find(
            (prop) => prop.id === item.properties.selectedAttr
          );
          obj.attrs.push({ groupName: item.name, propertyName: prop.name });
        }
      });
      return obj;
    };

    const changeBrand = (id) => {
      if (filterData.value.brands.selectBrand === id) return;
      filterData.value.brands.selectBrand = id;
      const params = getFilterParams();
      emit("filter-change", params);
    };

    const changeProp = (item, id) => {
      if (item.selectedAttr === id) return;
      item.selectedAttr = id;
      console.log(item);
      const params = getFilterParams();
      emit("filter-change", params);
    };

    return {
      filterData,
      filterLoading,
      changeBrand,
      changeProp,
    };
  },
};
</script>

<style scoped lang='less'>
// 筛选区

.item {
  padding: 5px;
}

.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
