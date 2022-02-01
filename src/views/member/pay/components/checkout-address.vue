<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span
          >{{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/, "$1****$2") }}
        </li>
        <li>
          <span>收货地址：</span
          >{{ showAddress.fullLocation + showAddress.address }}
        </li>
      </ul>
      <a href="javascript:;" @click="openAddressEdit(showAddress)">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="openDialog" class="btn">切换地址</XtxButton>
      <XtxButton @click="openAddressEdit(null)" class="btn">添加地址</XtxButton>
    </div>
    <xtx-dialog :title="'切换收货地址'" v-model:visiable="visiable">
      <div
        @click="selectedAddress = item"
        :class="{ active: selectedAddress && selectedAddress.id === item.id }"
        class="text item"
        v-for="item in userAddressList"
        :key="item.id"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li>
            <span>收货地址：</span
            >{{ item.fullLocation.replace(/ /g, "") + item.address }}
          </li>
        </ul>
      </div>
      <template #footer>
        <XtxButton
          @click="visiable = false"
          type="gray"
          style="margin-right: 20px"
          >取消</XtxButton
        >
        <XtxButton @click="confirmAddress" type="primary">确认</XtxButton>
      </template>
    </xtx-dialog>
    <!-- 收货地址 添加编辑组件 -->
    <AddressEdit @on-success="successHandler" ref="addressEditCom" />
  </div>
</template>
<script>
import { ref } from "vue";
import xtxDialog from "@/components/library/xtx-dialog.vue";
import AddressEdit from "./address-edit.vue";
export default {
  components: {
    xtxDialog,
    AddressEdit,
  },
  name: "CheckoutAddress",
  props: {
    userAddressList: {
      type: Array,
      default: () => [],
    },
  },
  // 1. 在拥有根元素的组件中，触发自定义事件，有没有emits选项无所谓
  // 2. 如果你的组件渲染的代码片段，vue3.0规范，需要在emits中申明你所触发的自定义事件
  // 3. 提倡：你发了自定义事件，需要在emits选项申明下，代码可读性很高
  emits: ["change"],
  setup(props, { emit }) {
    //   1、找到默认收货地址
    // 2、没有默认收货地址
    // 3、没有地址
    const showAddress = ref(null);
    const defaultAddress = props.userAddressList.find(
      (item) => item.isDefault === 0
    );
    if (defaultAddress) {
      showAddress.value = defaultAddress;
    } else {
      if (props.userAddressList.length) {
        showAddress.value = props.userAddressList[0];
      }
    }
    // 默认通知父组件
    emit("change", showAddress.value && showAddress.value.id);

    const visiable = ref(false);

    const selectedAddress = ref(null);

    const confirmAddress = () => {
      //   显示的地址换成选中的地址
      // 然后通知id给父组件
      showAddress.value = selectedAddress.value;
      emit("change", selectedAddress.value.id);

      visiable.value = false;
    };

    // 打开对话框的操作
    const openDialog = () => {
      selectedAddress.value = null;
      visiable.value = true;
    };

    const addressEditCom = ref(null);
    //   打开添加编辑收货地址组件
    const openAddressEdit = (address) => {
      addressEditCom.value.open(address);
    };

    // 组件添加地址
    const successHandler = (formData) => {
      // 深拷贝
      const address = props.userAddressList.find(
        (item) => item.id === formData.id
      );
      if (address) {
        for (const key in address) {
          address[key] = formData[key];
        }
      } else {
        const jsonstr = JSON.stringify(formData);

        props.userAddressList.unshift(JSON.parse(jsonstr));
      }
    };
    return {
      showAddress,
      visiable,
      selectedAddress,
      confirmAddress,
      openDialog,
      openAddressEdit,
      addressEditCom,
      successHandler,
    };
  },
};
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .xtx-dialog {
    .text {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;

      &.item {
        border: 1px solid #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;

        &.active,
        &:hover {
          border-color: @xtxColor;
          background: lighten(@xtxColor, 50%);
        }

        > ul {
          padding: 10px;
          font-size: 14px;
          line-height: 30px;
        }
      }
    }
  }

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
