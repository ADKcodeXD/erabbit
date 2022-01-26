<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="subCategory.top" :to="`/category/${subCategory.top.id}`" >{{subCategory.top.name}}</XtxBreadItem>
    <Transition name="bread-fade" mode="out-in">
      <XtxBreadItem v-if="subCategory.sub" :key="subCategory.sub.id">{{subCategory.sub.name}}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>
<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'SubBread',
  setup () {
    //   计算属性获取顶级和二级类目信息
    const store = useStore()
    const route = useRoute()
    const subCategory = computed(() => {
      const cate = {}
      store.state.category.list.forEach(top => {
        if (top.children) {
          const sub = top.children.find(sub => sub.id === route.params.id)
          if (sub) {
            cate.sub = { id: sub.id, name: sub.name }
          }
          cate.top = { id: top.id, name: top.name }
        }
      })
      return cate
    })

    return {
      subCategory
    }
  }
}
</script>
<style scoped lang="less"></style>
