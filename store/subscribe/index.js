import functions from "@/utils/functions";
// import * as TYPES from './types'

const namespaced = true;

const state = () => ({
  subscribers: [],
  subscriptions: [],
});

const actions = {
  // Подписка на модель
  async createSubscription({ commit }, data) {
    try {
      const response = await this.$api.post("/sub", data);

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },
  // Продление существующей подписки на модель
  async prolongSubscription({ commit }, data) {
    try {
      const response = await this.$api.patch("/sub", data);

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Получить мои активные подписки
  async getMySubscriptions({ commit }, data) {
    try {
      const response = await this.$api.get("/sub/my_subscriptions");
      commit("SET_SUBSCRIPTIONS", response.data.docs);
      return response.data.docs;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Получить моих активных подписчиков
  async getMySubscribers({ commit }, data) {
    try {
      const response = await this.$api.get("/sub/my_subscribers");
      commit("SET_SUBSCRIBERS", response.data.docs);
      return response.data.docs;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Получить все мои подписки
  async getAllMySubscriptions({ commit }, data) {
    try {
      const response = await this.$api.get("/sub/all_my_subscriptions");
      return response.data.docs;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Получить всех моих подписчиков
  async getAllMySubscribers({ commit }, data) {
    try {
      const response = await this.$api.get("/sub/all_my_subscribers");
      return response.data.docs;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Сбросить подписки и подписчиков
  async resetAllSubs({ commit }, data) {
    try {
      commit("RESET_SUBSCRIPTIONS");
      commit("RESET_SUBSCRIBERS");
      return true;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //сообщение с сервера о новом подписчике
  async newSubscriptionAlert({ commit, dispatch }, data) {
    dispatch("getMySubscribers");
  },
};

const mutations = {
  SET_SUBSCRIPTIONS(state, payload) {
    state.subscriptions = payload.map((sub) => ({
      ...sub,
      model: { ...sub.model, realAge: functions.getAge(sub.model) },
    }));
  },
  RESET_SUBSCRIPTIONS(state) {
    state.subscriptions = [];
  },
  SET_SUBSCRIBERS(state, payload) {
    state.subscribers = payload;
  },
  RESET_SUBSCRIBERS(state) {
    state.subscribers = [];
  },
};

const getters = {
  getSubscription: (state) => (id) => {
    const sid = state.subscriptions.findIndex((s) => s.model._id === id);
    if (sid === -1) return false;
    return state.subscriptions[sid];
  },
  getSubscriber: (state) => (id) => {
    const sid = state.subscribers.findIndex((s) => s.subscriber._id === id);
    if (sid === -1) return false;
    return state.subscribers[sid];
  },
  isActiveSubscription: (state) => (id) => {
    const sid = state.subscriptions.findIndex((s) => s.model._id === id);
    if (sid === -1) return false;
    const subtime = new Date(state.subscriptions[sid].ends).getTime();
    const now = new Date().getTime();
    if (now > subtime) return false;
    return true;
  },
  isActiveSubscriber: (state) => (id) => {
    const sid = state.subscribers.findIndex((s) => s.subscriber._id === id);
    if (sid === -1) return false;
    const subtime = new Date(state.subscribers[sid].ends).getTime();
    const now = new Date().getTime();
    if (now > subtime) return false;
    return true;
  },
};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters,
};
