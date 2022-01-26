<template>
  <div class="goods-sku" v-if="goods">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{selected:val.selected,disabled:val.disabled}" @click="changeSku(item,val)" v-if="val.picture"
            :src="val.picture" :title="val.name">
          <span :class="{selected:val.selected,disabled:val.disabled}" @click="changeSku(item,val)"
            v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
  import bwPowerSet from '@/vender/bwPowerSet'

  const spliter = "-"
  // 获取路径字典
  const getPathMap = (skus) => {
    const pathMap = {};
    // 得到所有sku集合
    skus.forEach(item => {
      if (item.inventory > 0) {
        // 获取可选值数组
        const valueArr = item.specs.map(val => val.valueName);
        const powerSetArr = bwPowerSet(valueArr);
        // 遍历子集
        powerSetArr.forEach(set => {
          // 拼接字符串并作为key
          const key = set.join(spliter);
          if (pathMap[key]) {
            pathMap[key].push(item.id)
          } else {
            pathMap[key] = [item.id]
          }
        })
      }
    })
    return pathMap;
  }
  // 获取选中的属性值
  const getSelectedValues = (specs) => {
    const arr = [];
    specs.forEach(item => {
      const selectedVal = item.values.find(val => val.selected)
      arr.push(selectedVal ? selectedVal.name : undefined);
    })
    return arr;
  }
  // 更新禁用状态
  const updateDisabledStatus = (specs, pathMap) => {
    // 初始化
    specs.forEach((item, i) => {
      const selectedValues = getSelectedValues(specs);
      item.values.forEach(val => {
        // 判断当前是否选中
        if (val.selected) return;
        // 暂时把这排属性依次扔进选中values中来做判断
        selectedValues[i] = val.name;
        // 去除undefined
        const key = selectedValues.filter(value => value).join(spliter);
        // 把禁用状态设置为路径字典中的是否可用
        val.disabled = !pathMap[key];
      })
    })

  }
  // 默认选中
  const initDefaultSelected = (goods, skuId) => {
    const sku = goods.skus.find(sku => sku.id == skuId);
    goods.specs.forEach((item, i) => {
      const val = item.values.find(val => val.name === sku.specs[i].valueName);
      val.selected = true;
    })
  }
  export default {
    name: 'GoodsSku',
    props: {
      goods: {
        type: Object,
        default: () => {}
      },
      skuId: {
        type: [Number, String],
        default: ''
      }
    },
    setup(props,{emit}) {
      const pathMap = getPathMap(props.goods.skus)
      // 如果有选中的 进行选中的初始化
      if (props.skuId) {
        initDefaultSelected(props.goods, props.skuId);
      }

      // 初始化 更新按钮禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)

      const changeSku = (item, val) => {
        if (val.disabled) return;
        //   不能同时存在两个
        if (val.selected) {
          val.selected = false;
        } else {
          item.values.forEach(element => {
            element.selected = false;
          });
          val.selected = true
        }
        // 更新禁选状态
        updateDisabledStatus(props.goods.specs, pathMap);
        // 通知父组件 选中的skuid
        const selectedValues = getSelectedValues(props.goods.specs).filter(v => v);
        if (selectedValues.length === props.goods.specs.length) {
            // 直接传给父组件
            const skuIds=pathMap[selectedValues.join(spliter)];
            console.log(skuIds);
            const sku=props.goods.skus.find(val=>val.id===skuIds[0]);
            emit('change',{
                id:sku.id,
                price:sku.price,
                oldPrice:sku.oldPrice,
                inventory:sku.inventory,
                // 这个是给父组件哪里显示的属性名
                specsText:sku.specs.reduce((p,c)=>`${p} ${c.name}: ${c.valueName}`,'').trim()
            })
        }else{
            // 父组件需要判断是否规格选择完整

        }

      }
      return {
        changeSku
      }
    }
  }

</script>
<style scoped lang="less">
  .sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;

    &.selected {
      border-color: @xtxColor;
    }

    &.disabled {
      opacity: 0.6;
      border-style: dashed;
      cursor: not-allowed;
    }
  }

  .goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
      display: flex;
      padding-bottom: 20px;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        flex: 1;
        color: #666;

        >img {
          width: 50px;
          height: 50px;
          .sku-state-mixin ();
        }

        >span {
          display: inline-block;
          height: 30px;
          line-height: 28px;
          padding: 0 20px;
          .sku-state-mixin ();
        }
      }
    }
  }

</style>
