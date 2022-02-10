import Message from '@/components/library/Message'

// send 发送二维码函数
export const useSend = async (schema,formCom,form,apiFn,time,resume) => {
    const valid = schema.mobile(form.mobile);
    if (valid === true) {
      if (time.value === 0) {
        // 校验通过 发送验证码
        const data = await apiFn(form.mobile);
        Message({
          type: "success",
          text: "短信发送成功",
        });
        time.value = 60;
        resume();
      }
    } else {
      // 提示vee的错误函数
      formCom.value.setFieldError("mobile", valid);
    }
};