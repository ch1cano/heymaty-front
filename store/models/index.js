import functions from "@/utils/functions";
import * as TYPES from "./types";

const namespaced = true;


const state = () => ({
  models: [],
  searchName: undefined,
  countriesOptions: [],
  citiesOptions: [],
  ageOptions: [],
  languageOptions: [],
  selectedCountry: null,
  selectedCities: [],
  selectedAges: [],
  selectedLanguages: [],
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: 1,
  prevPage: null,
  page: null
});

const actions = {

  async getModels({ commit, state, rootState }, data) {
    try {
      commit("SET_SEARCHNAME", data.name);
      const { nextPage } = state;
      const requestParams = {
        page: nextPage,
        data: JSON.stringify(data)
      };
      const response = await this.$api.get("/users/model/all", {
        params: requestParams
      })

      if (response && response.data && response.data.models) {
        const models = response.data.models
        commit(TYPES.SET_MODELS, { models, user: rootState.user.user });
        commit("SET_OPEN_META", response.data);
        return { models };
      }
    } catch (e) {
      return functions.returnError(e);
    }
  },
  //Получить список моделей по имени
  resetModels({ commit }) {
    commit(TYPES.RESET_MODELS, {})
  },

};

const mutations = {
  SET_SEARCHNAME(state, payload) {
    state.searchName = payload
  },
  SET_SELECTED(state, payload) {
    if (payload.field) {
      state[payload.field] = payload.value;
    }
  },
  SET_OPEN_META(state, payload) {
    const { totalPages, currentPage, totalDocs } = payload;
    state.totalPages = totalPages;
    state.totalDocs = totalDocs;
    // state.limit = limit;
    state.page = parseInt(currentPage);
    state.hasNextPage = parseInt(totalPages) > parseInt(currentPage);
    // state.hasPrevPage = hasPrevPage;
    state.nextPage = state.page + 1;

    // state.prevPage = prevPage;
  },
  [TYPES.RESET_MODELS](state, payload) {
    state.models = [],
      state.searchName = undefined,
      state.hasNextPage = false,
      state.hasPrevPage = false,
      state.nextPage = 1,
      state.prevPage = null,
      state.page = null
  },

  [TYPES.SET_MODELS](state, payload) {
    payload.models.forEach((model) => {
      state.models.push(model)
    });

  },
};

const getters = {};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters,
};
