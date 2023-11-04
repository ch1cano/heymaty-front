import functions from "@/utils/functions";
// import * as TYPES from './types'

const namespaced = true;

const state = () => ({
  payments: [],
  totalPages: null,
  totalDocs: null,
  limit: 10,
  page: 1,
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: null,
  prevPage: null,
  paymentsLoading: false,
});

const actions = {
  //Получить платежи
  async getPayments({ commit, state }, { page, limit }) {
    try {
      commit("SET_PAYMENTS_LOADING", true);
      const params = {
        page,
        limit,
      };
      const { data } = await this.$api.get("/payments", {
        params,
      });
      commit("SET_PAYMENTS_LOADING", false);
      commit("SET_PAYMENTS", data.payments.docs);
      commit("SET_META", data.payments);
      return data.payments.docs;
    } catch (e) {
      return functions.returnError(e);
    }
  },
};

const mutations = {
  //done
  SET_PAYMENTS_LOADING(state, payload) {
    state.paymentsLoading = payload;
  },
  //done
  SET_PAYMENTS(state, payload) {
    state.payments = payload;
  },
  //done
  SET_META(state, payload) {
    const {
      totalPages,
      totalDocs,
      limit,
      page,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
    } = payload;
    state.totalPages = totalPages;
    state.totalDocs = totalDocs;
    state.limit = limit;
    state.page = page;
    state.hasNextPage = hasNextPage;
    state.hasPrevPage = hasPrevPage;
    state.nextPage = nextPage;
    state.prevPage = prevPage;
  },
};

const getters = {
  // isLike: (state) => (id) => {
  //   const lind = state.likes.findIndex((l) => l === id);
  //   return lind !== -1;
  // },
  sortedPayments: (state) => {
    return [...state.payments].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },
};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters,
};
