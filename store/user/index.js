import functions from "@/utils/functions";
import * as TYPES from "./types";

const namespaced = true;

const state = () => ({
  user: null,
  coverFileName: null,
  profileFileName: null,
});

const actions = {
  // Вход
  async signIn({ commit, dispatch }, data) {
    try {
      const response = await this.$api.post("/login", data);
      if (response && response.data && response.data.user) {
        const { token, user } = response.data;
        this.$api.setHeader("Authorization", `Bearer ${token}`);
        this.$cookiz.set("token", token, this.$conf.cookiesSettings);

        commit(TYPES.SET_USER, user);
        if (user && user.role === "user") {
          dispatch("favorites/getMyFavorites", null, { root: true });
        }
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Регистрация
  async signUp({ commit, dispatch }, data) {
    try {
      const response = await this.$api.post(`/register/${data.role}`, data);
      if (response && response.data && response.data.user) {
        const { token, user } = response.data;

        this.$api.setHeader("Authorization", `Bearer ${token}`);
        this.$cookiz.set("token", token, this.$conf.cookiesSettings);

        commit(TYPES.SET_USER, user);
        if (user && user.role === "user") {
          dispatch("favorites/getMyFavorites", null, { root: true });
        }
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Авторизация через google
  async googleAuth({ commit, dispatch }, data) {
    try {
      const response = await this.$api.post(
        `/auth/google?id_token=${data.id_token}`,
        data
      );
      if (response && response.data && response.data.user) {
        const { token, user } = response.data;

        this.$api.setHeader("Authorization", `Bearer ${token}`);
        this.$cookiz.set("token", token, this.$conf.cookiesSettings);

        commit(TYPES.SET_USER, { ...user, fromGoogle: true });
        if (user && user.role === "user") {
          dispatch("favorites/getMyFavorites", null, { root: true });
        }
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Забыл пароль (получить код)
  async forgotPassword({ commit }, data) {
    try {
      const response = await this.$api.post("/forgot", data);

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Восстановить пароль
  async recoverPassword({ commit }, data) {
    try {
      const response = await this.$api.post("/reset", data);

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Изменить пароль
  async changePassword({ commit }, data) {
    try {
      const response = await this.$api.post("/profile/changePassword", data);

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Подтверждение профиля по email
  async verifyProfile({ commit }, data) {
    try {
      const response = await this.$api.post("/verify", data);
      this.$notify.success({
        message: "Ваш профиль успешно подтвержден",
      });

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Подтверждение email
  async confirmEmail({ commit }, data) {
    try {
      const response = await this.$api.post("/confirmEmail", data);
      commit(TYPES.UPDATE_PROFILE, response.data);
      this.$notify.success({
        message: "Email был успешно подтвержден",
      });

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Запросить подтверждение email
  async requestConfirmEmail({ commit }) {
    try {
      const response = await this.$api.post("/requestConfirmEmail");
      this.$notify.success({
        message: "Письмо о подтверждении Email было успешно отправлено",
      });
      commit(TYPES.SET_USER, response.data);
      return response.data;
    } catch (e) {
      // console.log(functions.returnError(e));
      return functions.returnError(e);
    }
  },

  // // Обновить профиль
  // async updateProfile ({ commit }, data) {
  //   try {
  //     const response = await this.$api.patch('/profile', data)
  //     if (response && response.data) {
  //       commit(TYPES.UPDATE_PROFILE, response.data)
  //     }
  //
  //     return response.data
  //   } catch (e) {
  //     return functions.returnError(e)
  //   }
  // },

  // Обновить профиль пользователя
  async updateUser({ commit }, data) {
    try {
      const response = await this.$api.put("/users/update", data);
      if (response && response.data) {
        commit(TYPES.UPDATE_PROFILE, response.data.userUpdate);
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Обновить адрес выплаты для пользователя
  async updateOutBTCAddress({ commit }, data) {
    try {
      const response = await this.$api.put(
        "/users/update-out-btc-address",
        data
      );
      if (response && response.data) {
        commit(TYPES.UPDATE_PROFILE, response.data.userUpdate);
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Обновить аватар пользователя
  async updateUserAvatar({ commit }, data) {
    try {
      const response = await this.$api.put("/users/update-avatar", data);
      if (response && response.data) {
        commit(TYPES.UPDATE_PROFILE, {
          profile: response.data.userUpdate.profile,
        });
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Обновить аватар пользователя
  async updateUserCover({ commit }, data) {
    try {
      const response = await this.$api.put("/users/update-cover", data);
      if (response && response.data) {
        commit(TYPES.UPDATE_PROFILE, {
          cover: response.data.userUpdate.cover,
        });
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить мой профиль
  async getMyProfile({ commit }, data) {
    try {
      const response = await this.$api.get("/profile");
      if (response && response.data && response.data) {
        commit(TYPES.SET_USER, {
          profile: { path: null },
          ...response.data,
          googleId: !!response.data.googleId,
          fromGoogle: !!response.data.googleId,
        });
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить пользователя по id
  async getUserById({ commit }, data) {
    try {
      const response = await this.$api.get(`/users/${data.id}`);
      return {
        ...response.data.item,
        ...response.data.meta,
        realAge: functions.getAge(response.data.item),
      };
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить пользователя по profileUrl
  async getUserByUrl({ commit }, data) {
    try {
      const response = await this.$api.get(`/users/profile/${data.profileUrl}`);
      return {
        ...response.data.item,
        ...response.data.meta,
        realAge: functions.getAge(response.data.item),
      };
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить количество добавлений пользователя избранное
  async getUserFavouriteCount({ commit }, data) {
    try {
      const response = await this.$api.get("/favourites/count/" + data.modelId);
      return response.data.count;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Создать новый платежный адрес BTC
  async createInBTCAddress({ commit }, data) {
    try {
      const response = await this.$api.post("/bitaps/create-in-btc-address");
      if (!response || !response.data) {
        return;
      }
      commit("SET_USER_INBTCADDRESS", response.data.paymentAddress);
      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить мои транзакции
  async getMyTransactions({ commit }, data) {
    try {
      const response = await this.$api.get("/transactions/get-my-transactions");
      if (response && response.data && response.data.transactions) {
        commit("SET_USER_TRANSACTIONS", response.data.transactions);
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить мои запросы
  async getMyRequests({ commit }, data) {
    try {
      const response = await this.$api.get("/requests");
      if (response && response.data && response.data.requests) {
        commit("SET_USER_REQUESTS", response.data.requests);
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Купить пакет сообщений
  async buyBundle({ commit }, data) {
    try {
      const response = await this.$api.post("/purchases/bundle", {
        bundleId: data.bundleId,
      });
      if (response && response.data && response.data.savedUser) {
        commit("SET_USER_MESSAGEBUNDLES", response.data.savedUser);
      }

      return response.data;
    } catch (e) {
      return functions.returnError(e);
    }
  },
};

const mutations = {
  [TYPES.SET_USER](state, payload) {
    state.user = { ...payload, realAge: functions.getAge(payload) };
    for (const key in payload) {
      if (key === "cover") state.coverFileName = payload[key]["filename"];
      if (key === "profile") state.profileFileName = payload[key]["filename"];
    }
  },

  [TYPES.UPDATE_PROFILE](state, payload) {
    for (const key in payload) {
      if (key === "cover") state.coverFileName = payload[key]["filename"];
      if (key === "profile") state.profileFileName = payload[key]["filename"];
      state.user[key] = payload[key];
    }
  },
  SET_USER_INBTCADDRESS(state, payload) {
    state.user = { ...state.user, inBTCAddress: payload };
  },
  SET_USER_TRANSACTIONS(state, payload) {
    state.user = { ...state.user, transactions: payload };
  },
  SET_USER_REQUESTS(state, payload) {
    state.user = { ...state.user, requests: payload };
  },
  SET_USER_MESSAGEBUNDLES(state, payload) {
    state.user = { ...state.user, ...payload };
  },

  [TYPES.LOG_OUT](state, payload) {
    state.user = null;
    this.$cookiz.remove("token");
    this.$api.setHeader("Authorization", ``);
  },
};

const getters = {
  auth: (state) => {
    return !!state.user;
  },

  getRole: (state) => {
    return state.user && state.user.role;
  },

  getVerified: (state) => {
    return state.user && state.user.verified;
  },
};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters,
};
