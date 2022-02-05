
<script>
import { useVModel } from "@vueuse/core";
import { provide } from "vue";
export default {
  name: "XtxTabs",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const activeName = useVModel(props, "modelValue", emit);
    provide('activeName', activeName);
    const tabsClick = (name, index) => {
      activeName.value = name;
      console.log(activeName,name);
      emit("tabs-click",{name,index});
    };
    return { activeName, tabsClick };
  },
  // jsx渲染模板
  render() {
    //   获取插槽内的值
    const pannels = this.$slots.default();
    const dynamicPannels = [];
    // 动静态生成pannels
    pannels.forEach((item) => {
      if (item.type.name === "XtxTabsPannel") {
        dynamicPannels.push(item);
      } else {
        item.children.forEach((item) => {
          dynamicPannels.push(item);
        });
      }
    });
    // 这里进行组织
    const nav = (
      <nav>
        {dynamicPannels.map((item,i) => {
          return (
            <a
              onClick={() => this.tabsClick(item.props.name,i)}
              class={{ active: item.props.name === this.activeName }}
              href="javascript:;"
            >
              {item.props.label}
            </a>
          );
        })}
      </nav>
    );

    return <div class="xtx-tabs">{[nav, dynamicPannels]}</div>;
  },
};
</script>

<style lang="less" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>