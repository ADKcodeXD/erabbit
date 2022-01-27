<template>
  <div class="xtx-pagination">
    <a v-if="currentPage>1" href="javascript:;" @click="changePage(currentPage-1)">上一页</a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start>1">...</span>
    <a href="javascript:;" :class="{active:i===currentPage}" v-for="i in pager.btnArr" :key="i" @click="changePage(i)">{{i}}</a>
    <span v-if="pager.end<pager.pageCount">...</span>
    <a v-if="currentPage<pager.pageCount" href="javascript:;" @click="changePage(currentPage+1)">下一页</a>
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>
<script>
  import {
    computed,
    ref,
    watch
  } from 'vue'
  export default {
    name: 'XtxPagination',
    props:{
      total:{
        type:Number,
        default:100
      },
      currentPage:{
        type:Number,
        default:1
      },
      pageSize:{
        type:Number,
        default:10
      }
    },
    setup(props,{emit}) {
      const count = 5;
      const currentPage = ref(props.currentPage);
      const total = ref(props.total);
      const pageSize = ref(props.pageSize);
      const pager = computed(() => {
        // zone页数
        const pageCount = Math.ceil(total.value / pageSize.value);
        const offset = Math.floor(count / 2);
        // offset算出起始页和结束页
        let start = currentPage.value - offset;
        let end = start + count - 1;
        // 起始页码小于0
        if (start < 1) {
          start = 1;
          end = (start + count - 1) > pageCount ? pageCount : (start + count - 1);
        }
        // 结束代码大于总页数
        if (end > pageCount) {
          end = pageCount;
          start = (end - count + 1) < 1 ? 1 : (end - count + 1);
        }
        // 生成btnarr
        const btnArr = [];
        for (let i = start; i <= end; i++) {
          btnArr.push(i);
        }
        return {
          pageCount,
          btnArr,
          start,
          end
        }
      })
      

      // 监听props变化
      watch(props,()=>{
          total.value=props.total;
          pageSize.value=props.pageSize;
          currentPage.value=props.currentPage;
      },{immediate:true})
      // 切换页数函数
      const changePage=(page)=>{
        currentPage.value=page;
        emit('current-page',page);
      }
      
      
      return {
        currentPage,
        pager,
        changePage
      }
    }
  }

</script>
<style scoped lang="less">
  .xtx-pagination {
    display: flex;
    justify-content: center;
    padding: 30px;

    >a {
      display: inline-block;
      padding: 5px 10px;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      margin-right: 10px;

      &:hover {
        color: @xtxColor;
      }

      &.active {
        background: @xtxColor;
        color: #fff;
        border-color: @xtxColor;
      }

      &.disabled {
        cursor: not-allowed;
        opacity: 0.4;

        &:hover {
          color: #333
        }
      }
    }

    >span {
      margin-right: 10px;
    }
  }

</style>
