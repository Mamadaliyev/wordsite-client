import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userData: {},
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserData(state) {
      return state.userData;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserData(state, data) {
      state.userData = data;
    },
    Logout(state) {
      state.token = "";
      state.userData = {};
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
