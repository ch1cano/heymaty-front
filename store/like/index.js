import functions from "@/utils/functions";
// import * as TYPES from './types'

const namespaced = true;

const state = () => ({
  likes: [],
});

const actions = {
  // Поставить лайк
  async like({ commit }, data) {
    try {
      const response = await this.$api.post("/likes/like", { obj: data });
      commit("LIKE", data);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Убрать лайк
  async unlike({ commit }, data) {
    try {
      const response = await this.$api.post("/likes/unlike", { obj: data });
      commit("UNLIKE", data);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Получить все мои лайки
  async getAllMyLikes({ commit }) {
    try {
      const response = await this.$api.get("/likes");
      commit("SET_LIKES", response.data.likes);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Сбросить подписки и подписчиков
  async resetAllMyLikes({ commit }) {
    try {
      commit("RESET_LIKES");
      return true;
    } catch (e) {
      return functions.returnError(e);
    }
  },
};

const mutations = {
  SET_LIKES(state, payload) {
    state.likes = payload.map((l) => l.obj);
  },
  RESET_LIKES(state) {
    state.likes = [];
  },
  LIKE(state, payload) {
    state.likes = [...state.likes, payload];
  },
  UNLIKE(state, payload) {
    const ind = state.likes.findIndex((l) => l === payload);
    if (ind !== -1) state.likes.splice(ind, 1);
  },
};

const getters = {
  isLike: (state) => (id) => {
    const lind = state.likes.findIndex((l) => l === id);
    return lind !== -1;
  },
};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters,
};
