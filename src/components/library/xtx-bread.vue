<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // 去除template标签

    // 获取默认插槽内容
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h('i', { class: 'iconfont icon-more' }))
      }
    })
    return dymanicItems
  }
}

</script>

<style lang='less'>
  .xtx-bread {
    display: flex;
    padding: 25px 10px;

    &-item {
      a {
        color: #666;
        transition: all .4s;

        &:hover {
          color: @xtxColor;
        }
      }

    }

    i {
      font-size: 12px;
      margin-left: 5px;
      margin-right: 5px;
      line-height: 22px;

      &:last-child {
        display: none;
      }
    }
  }

</style>
