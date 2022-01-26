<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{active:visiable}">
      <span class="placeholder" v-if="fullLocation">{{fullLocation}}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visiable">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" @click="changeItem(item)" v-for="item in currCityList"
          :key="item.code">{{item.name}}</span>
      </template>
    </div>

  </div>
</template>

<script>
  import {
    computed,
    reactive,
    ref
  } from 'vue';
  import {
    onClickOutside
  } from '@vueuse/core';
  import axios from 'axios'
  export default {
    name: 'XtxCity',
    props: {
      fullLocation: {
        type: String,
        default: ''
      }
    },
    setup(props, {
      emit
    }) {
      const visiable = ref(false);
      // 定义两个方法 打开和关闭的方法
      const loading = ref(false);
      let cityList = ref([]);
      const open = () => {
        for(const key in changeResult){
            changeResult[key]=''
        }
        visiable.value = true;
        loading.value = true;
        getCityData().then(data => {
          cityList = data;
          loading.value = false;
        })
      }

      //   定义一个计算属性
      const currCityList = computed(() => {

        let tempCityList = cityList
        // TODO 根据点击的省份城市获取对应的列表
        if (changeResult.provinceCode && changeResult.provinceName) {
          tempCityList = tempCityList.find(p => p.code === changeResult.provinceCode).areaList
        }
        if (changeResult.cityCode && changeResult.cityName) {
          tempCityList = tempCityList.find(p => p.code === changeResult.cityCode).areaList
        }
        if (changeResult.countyCode && changeResult.countyName) {

        }
        return tempCityList
      })

      const changeResult = reactive({
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        countyCode: '',
        countyName: '',
        fullLocation: ''
      })
      // 点击按钮的时候进行修改
      const changeItem = (item) => {
        if (item.level === 0) {
          changeResult.provinceCode = item.code;
          changeResult.provinceName = item.name;
        } else if (item.level === 1) {
          changeResult.cityCode = item.code;
          changeResult.cityName = item.name;
        } else {
          // 最后一级
          changeResult.countyCode = item.code;
          changeResult.countyName = item.name;
          close();
          changeResult.fullLocation = changeResult.provinceName+" " + changeResult.cityName +" "+ changeResult.countyName
          emit('change-result', changeResult);
        }
      }
      // 关闭的方法
      const close = () => {
        visiable.value = false;
      }
      // 切换函数
      const toggle = () => {
        visiable.value ? close() : open();
      }

      // 点击组件外部关闭
      const target = ref(null)

      onClickOutside(target, () => {
        visiable.value = false
      })

      // 获取数据的代码
      const getCityData = () => {
        // 这个位置可能有异常操作，封装成promise
        return new Promise((resolve, reject) => {
          if (window.cityData) {
            // 有缓存
            resolve(window.cityData)
          } else {
            // 无缓存
            const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
            axios.get(url).then(res => {
              window.cityData = res.data
              resolve(window.cityData)
            })
          }
        })
      }

      return {
        visiable,
        loading,
        toggle,
        target,
        cityList,
        currCityList,
        changeItem
      }
    },
  }

</script>

<style scoped lang="less">
  .xtx-city {
    display: inline-block;
    position: relative;
    z-index: 400;

    .select {
      border: 1px solid #e4e4e4;
      height: 30px;
      padding: 0 5px;
      line-height: 28px;
      cursor: pointer;

      &.active {
        background: #fff;
      }

      .placeholder {
        color: #999;
      }

      .value {
        color: #666;
        font-size: 12px;
      }

      i {
        font-size: 12px;
        margin-left: 5px;
      }
    }

    .option {
      width: 542px;
      border: 1px solid #e4e4e4;
      position: absolute;
      left: 0;
      top: 29px;
      background: #fff;
      min-height: 30px;
      line-height: 30px;
      display: flex;
      flex-wrap: wrap;
      padding: 10px;

      .loading {
        height: 290px;
        width: 100%;
        background: url(../../assets/images/loading.gif) no-repeat center;
      }


      >span {
        width: 130px;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        padding: 0 3px;

        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }

</style>
