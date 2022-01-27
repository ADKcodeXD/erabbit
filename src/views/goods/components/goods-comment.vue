<template>
  <div class="goods-comment">
    <!-- 评价头部 -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p><span>{{commentInfo.evaluateCount}}</span><span>人购买</span></p>
        <p><span>{{commentInfo.praisePercent}}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a href="javascript:;" @click="changeTag(i)" v-for="item,i in commentInfo.tags" :key="item.title"
            :class="{active:currentTagIndex===i}">{{item.title}}（{{item.tagCount}}）</a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" @click="changeSort(null)" :class="{active:reqParams.sortField===null}">默认</a>
      <a href="javascript:;" @click="changeSort('createTime')"
        :class="{active:reqParams.sortField==='createTime'}">最新</a>
      <a href="javascript:;" @click="changeSort('praiseCount')"
        :class="{active:reqParams.sortField==='praiseCount'}">最热</a>
    </div>

    <!-- 评价列表 -->
    <!-- 列表 -->
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickName(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i+'s'" class="iconfont icon-favoritesfilling"></i>
            <i v-for="i in 5-item.score" :key="i+'k'" class="iconfont icon-favorite"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <!-- 评论图片 -->
          <goods-comment-image v-if="item.pictures" :pictures="item.pictures" ></goods-comment-image>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <xtx-pagination @current-page="changePageFn" 
    :total="total" 
    :pageSize="reqParams.pageSize" 
    :currentPage="reqParams.page"></xtx-pagination>
  </div>
</template>

<script>
import GoodsCommentImage from './goods-comment-image.vue'
  import {
    findGoodsComment,
    findGoodsCommentByParams
  } from '@/api/product'
  import {
    inject,
    reactive,
    watch
  } from '@vue/runtime-core';
  import {
    ref
  } from 'vue'
import XtxPagination from '@/components/library/xtx-pagination.vue';
  export default {
    name: 'GoodsComment',
    components:{GoodsCommentImage, XtxPagination},
    setup() {
      const commentInfo = ref(null);
      const goods = inject('goods');
      findGoodsComment(goods.value.id).then(data => {
        data.result.tags.unshift({
          title: '有图',
          tagCount: data.result.hasPictureCount,
          type: 'img'
        });
        data.result.tags.unshift({
          title: '全部评价',
          tagCount: data.result.evaluateCount,
          type: 'all'
        });
        commentInfo.value = data.result;

      })
      // jihuo tag
      let currentTagIndex = ref(0)
      // 
      const changeTag = (i) => {
        currentTagIndex.value = i;
        // 修改筛选条件
        // 情况1 全部评价 
        // 情况2 有图
        // 情况3 其他tag
        const tag = commentInfo.value.tags[i];
        reqParams.page=1;
        if (tag.type === 'img') {
          reqParams.hasPicture = true;
        } else if (tag.type === 'all') {
          reqParams.hasPicture = null;
          reqParams.tag = null
        } else {
          reqParams.hasPicture = null;
          reqParams.tag = tag.title
        }
      }
      // list 请求参数
      const reqParams = reactive({
        page: 1,
        pageSize: 10,
        hasPicture: null,
        tag: null,
        sortField: null,
        sortMethod: null
      })
      // 评论体
      let commentList = ref([])
      // 总数据
      const total=ref(0);
      // 点击排序
      const changeSort = (sortField) => {
        reqParams.sortField = sortField;
        reqParams.page = 1;
      }
      // 定义过滤器
      const formatSpecs=(specs)=>{
        return specs.reduce((p,c)=>`${p} ${c.name}:${c.nameValue}`,'').trim();
      }
      // 格式化名字
      const formatNickName=(nickname)=>{
        return nickname.substr(0,1)+'****'+nickname.substr(-1);
      }
      // 修改分页
      const changePageFn=(page)=>{
        reqParams.page=page;
      }
      // 监视请求参数的改变
      watch(reqParams, () => {
        findGoodsCommentByParams(goods.value.id, reqParams).then(data => {
          commentList.value = data.result.items;
          total.value=data.result.counts;
        })
      }, {
        immediate: true
      })
      
      // 返回给模板使用
      return {
        commentInfo,
        currentTagIndex,
        changeTag,
        reqParams,
        commentList,
        changeSort,
        formatSpecs,
        formatNickName,
        total,
        changePageFn
      }
    }
  }

</script>

<style lang="less" scoped>
  .goods-comment {
    .head {
      display: flex;
      padding: 30px 0;

      .data {
        width: 340px;
        display: flex;
        padding: 20px;

        p {
          flex: 1;
          text-align: center;

          span {
            display: block;

            &:first-child {
              font-size: 32px;
              color: @priceColor;
            }

            &:last-child {
              color: #999;
            }
          }
        }
      }

      .tags {
        flex: 1;
        display: flex;
        border-left: 1px solid #f5f5f5;

        .dt {
          font-weight: bold;
          width: 100px;
          text-align: right;
          line-height: 42px;
        }

        .dd {
          flex: 1;
          display: flex;
          flex-wrap: wrap;

          >a {
            width: 132px;
            height: 42px;
            margin-left: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
            border: 1px solid #e4e4e4;
            background: #f5f5f5;
            color: #999;
            text-align: center;
            line-height: 40px;

            &:hover {
              border-color: @xtxColor;
              background: lighten(@xtxColor, 50%);
              color: @xtxColor;
            }

            &.active {
              border-color: @xtxColor;
              background: @xtxColor;
              color: #fff;
            }
          }
        }
      }
    }

    .sort {
      height: 60px;
      line-height: 60px;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      margin: 0 20px;
      color: #666;

      >span {
        margin-left: 20px;
      }

      >a {
        margin-left: 30px;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }

  .list {
    padding: 0 20px;

    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;

      .user {
        width: 160px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }

        span {
          padding-left: 10px;
          color: #666;
        }
      }

      .body {
        flex: 1;

        .score {
          line-height: 40px;

          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }

          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }

      .text {
        color: #666;
        line-height: 24px;
      }

      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }

</style>
