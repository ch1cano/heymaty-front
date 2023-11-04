import functions from "@/utils/functions";
// import * as TYPES from './types'

const namespaced = true;

const state = () => ({});

const actions = {
  // Создать новый пакет
  async createBundle({ commit }, data) {
    try {
      const response = await this.$api.post("/bundles", data);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить пакет по id
  async getBundle({ commit }, data) {
    try {
      const response = await this.$api.get(`/bundles/${data.id}`);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить все мои пакеты
  async getBundles({ commit }, data) {
    try {
      const response = await this.$api.get(`/bundles`);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Удалить пакет
  async deleteBundle({ commit }, data) {
    try {
      const response = await this.$api.delete(`/bundles/${data.id}`);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить все пакеты модели
  async getModelBundles({ commit }, data) {
    try {
      const response = await this.$api.get(`/bundles/model/${data.modelId}`);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Создать новый пост
  async createPost({ commit }, data) {
    try {
      const response = await this.$api.post("/posts", data);

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Редактировать пост
  async editPost({ commit }, data) {
    try {
      const response = await this.$api.patch(`/posts/${data.id}`, data.data);

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить все публичные посты модели
  async getPublicPosts({ commit }, data) {
    try {
      const response = await this.$api.get(
        `/posts/all-public-posts/girl/${data.id}`
      );

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить пост по id
  async getPost({ commit }, data) {
    try {
      const response = await this.$api.get(`/posts/${data.id}`);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить все посты модели
  async getAllPosts({ commit }, data) {
    try {
      const response = await this.$api.get(`/posts/all-posts/girl/${data.id}`);

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить все свои посты
  async getAllMyPosts({ commit }, data) {
    try {
      const response = await this.$api.get(`/posts/all-my-posts/girl`);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Обновить профиль
  async updateModelProfile({ commit }, data) {
    try {
      const response = await this.$api.post("/update-profile-model", data);
      if (response && response.data && response.data.updated) {
        commit("user/UPDATE_PROFILE", response.data.updated, { root: true });
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Обновить аватар модели
  async updateModelAvatar({ commit }, data) {
    try {
      const response = await this.$api.put("/update-avatar-model", data);
      if (response && response.data && response.data.updated) {
        commit(
          "user/UPDATE_PROFILE",
          { profile: response.data.updated.profile },
          { root: true }
        );
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Обновить обложку модели
  async updateModelCover({ commit }, data) {
    try {
      const response = await this.$api.put("/update-cover-model", data);
      if (response && response.data && response.data.updated) {
        commit(
          "user/UPDATE_PROFILE",
          { cover: response.data.updated.cover },
          { root: true }
        );
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Верификация аккаунта
  async uploadVerify({ commit }, data) {
    try {
      const response = await this.$api.put("/users/model/national", data);
      if (response && response.data && response.data.modelUpdate) {
        commit(
          "user/UPDATE_PROFILE",
          { profile: { path: null }, ...response.data.modelUpdate },
          { root: true }
        );
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },
};

const mutations = {};

const getters = {};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters,
};
