// 模块

export default {
  namespaced: true,
  state () {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      redirectUrl:'/'
    }
  },
  mutations: {
    setUser (state, payload) {
      state.profile.id = payload.id;
      state.profile.avatar = payload.avatar;
      state.profile.nickname = payload.nickname;
      state.profile.account = payload.account;
      state.profile.mobile = payload.mobile;
      state.profile.token = payload.token;
    },
    setRedirectUrl(state,url){
      state.redirectUrl=url;
    }
  }
}
