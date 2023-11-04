import functions from "@/utils/functions";
import * as TYPES from "./types";

const namespaced = true;

const state = () => ({
  countries: [],
  cities: [],
  states: [],
  cities: [],
  ages: [],
  langs: [],
  services: [],
  signIn: {
    bg: false,
    box: false,
  },
  signUp: {
    bg: false,
    box: false,
  },
  forgotPassword: {
    bg: false,
    box: false,
  },
  recoverPassword: {
    bg: false,
    box: false,
  },
});

const actions = {
  // Получить все услуги
  async getServices({ commit }, data) {
    try {
      const response = await this.$api.get("/services");
      if (response && response.data && response.data.services) {
        commit(TYPES.SET_SERVICES, response.data.services);
      }
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

    // Получить все услуги
  async getAges({ commit }) {
    try {
      const response = await this.$api.get("/users/model/ages");
      if (response && response.data) {
        commit(TYPES.SET_AGES, response.data);
      }
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить все языки
  async getLangs({ commit }, data) {
    try {
      const response = await this.$api.get("/language");
      if (response && response.data) {
        commit(TYPES.SET_LANGS, response.data.languages);
      }
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  async getCountries({ commit }, data) {
    try {
      const response = await this.$api.get("/region/countries");
        commit(TYPES.SET_COUNTRIES, response.data);
        return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  async getStates({ commit }, countryIso) {
    try {
      const response = await this.$api.get(`/region/states/${countryIso}`);
      if (response && response.data) {
        commit(TYPES.SET_STATES, response.data.states);
      }
      return response.jsonDoc;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить все города
  async getCities({ commit }, country) {
    try {
      const response = await this.$api.get("/region/cities");
      if (response && response.data) {
        return response.data;
      }
    } catch (e) {
      return functions.returnError(e);
    }
  },
};

const mutations = {
  [TYPES.CHANGE_STATE](state, payload) {
    state[payload.type] = payload.data;
  },

  [TYPES.SET_SERVICES](state, payload) {
    state.services = payload;
  },

  [TYPES.SET_LANGS](state, payload) {
    state.langs = payload.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  },
  [TYPES.SET_COUNTRIES](state, payload) {
    state.countries = payload;
  },
  [TYPES.SET_STATES](state, payload) {
    state.states = payload;
  },
  [TYPES.SET_CITIES](state, payload) {
    state.cities = payload
  },
  [TYPES.SET_AGES](state, payload) {
    state.ages = payload;
  }
};

const getters = {};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters,
};
