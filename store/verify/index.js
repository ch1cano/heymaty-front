import functions from "@/utils/functions";
const getPublicMedia = (filename) => {
  return `${process.env.PUBLIC_URL}/media/${filename}`;
};

const namespaced = true;

const state = () => ({
  personalFirstName: "",
  personalSecondName: "",
  personalFamilyName: "",
  personalBirthDate: null,
  personalSex: null,
  personalCountry: "",
  personalCity: "",
  personalStreet: "",
  personalBuilding: "",
  personalAppartment: "",
  personalZIP: "",
  personalPassport: {},
  personalIDCardFront: {},
  personalIDCardBack: {},
  personalDriverLicenseFront: {},
  personalDriverLicenseBack: {},
  personalIDExpirationDate: null,
  personalIDHasNoExpiration: false,
  personalSelfie: {},
  verificationLoading: true,
  verificationInProcess: false,
});

const actions = {
  //Получить данные о верификации
  async getVerify({ commit, state }) {
    try {
      commit("SET_VERIFICATION_LOADING", true);
      const { data } = await this.$api.get("/verification");
      commit("SET_VERIFICATION", data);
      if (data.personalSelfie) commit("SET_VERIFICATION_IN_PROCESS", true);
      commit("SET_VERIFICATION_LOADING", false);
      return data;
    } catch (e) {
      return functions.returnError(e);
    }
  },
  //Отправить данные верификации
  async postVerify({ commit, state }) {
    try {
      commit("SET_VERIFICATION_LOADING", true);
      const form = new FormData();
      form.append("personalFirstName", state.personalFirstName);
      form.append("personalSecondName", state.personalSecondName);
      form.append("personalFamilyName", state.personalFamilyName);
      form.append(
        "personalBirthDate",
        state.personalBirthDate && state.personalBirthDate.toISOString()
      );
      form.append("personalSex", state.personalSex);
      form.append("personalCountry", state.personalCountry);
      form.append("personalCity", state.personalCity);
      form.append("personalStreet", state.personalStreet);
      form.append("personalBuilding", state.personalBuilding);
      form.append("personalAppartment", state.personalAppartment);
      form.append("personalZIP", state.personalZIP);
      form.append(
        "personalIDExpirationDate",
        state.personalIDExpirationDate &&
          state.personalIDExpirationDate.toISOString()
      );
      form.append("personalIDHasNoExpiration", state.personalIDHasNoExpiration);

      if (state.personalPassport.file)
        form.append(
          "personalPassport",
          state.personalPassport.file.raw,
          state.personalPassport.file.name
        );
      if (state.personalIDCardFront.file)
        form.append(
          "personalIDCardFront",
          state.personalIDCardFront.file.raw,
          state.personalIDCardFront.file.name
        );
      if (state.personalIDCardBack.file)
        form.append(
          "personalIDCardBack",
          state.personalIDCardBack.file.raw,
          state.personalIDCardBack.file.name
        );
      if (state.personalDriverLicenseFront.file)
        form.append(
          "personalDriverLicenseFront",
          state.personalDriverLicenseFront.file.raw,
          state.personalDriverLicenseFront.file.name
        );
      if (state.personalDriverLicenseBack.file)
        form.append(
          "personalDriverLicenseBack",
          state.personalDriverLicenseBack.file.raw,
          state.personalDriverLicenseBack.file.name
        );
      if (state.personalSelfie.file)
        form.append(
          "personalSelfie",
          state.personalSelfie.file.raw,
          state.personalSelfie.file.name
        );

      const { data } = await this.$api.post("/verification", form);
      if (data.personalSelfie) commit("SET_VERIFICATION_IN_PROCESS", true);
      commit("SET_VERIFICATION_LOADING", false);
      return data;
    } catch (e) {
      console.log(e);
      commit("SET_VERIFICATION_LOADING", false);
      this.$notify.error({
        message: "Something went wrong, try again!",
      });

      return functions.returnError(e);
    }
  },
  setPersonal({ commit, state }, { field, data }) {
    commit("SET_PERSONAL", { field, data });
  },
  removeVerification({ commit }) {
    commit("REMOVE_VERIFICATION");
  },
};

const mutations = {
  //done
  SET_VERIFICATION_LOADING(state, payload) {
    state.verificationLoading = payload;
  },
  //done
  SET_VERIFICATION_IN_PROCESS(state, payload) {
    state.verificationInProcess = payload;
  },
  //done
  SET_VERIFICATION(state, payload) {
    for (const field in state) {
      if (payload[field]) {
        if (
          [
            "personalPassport",
            "personalIDCardFront",
            "personalIDCardBack",
            "personalDriverLicenseFront",
            "personalDriverLicenseBack",
            "personalSelfie",
          ].includes(field)
        ) {
          state[field] = {
            // preview: payload[field][0]["filename"],
            preview: getPublicMedia(payload[field][0]["filename"]),
          };
        } else {
          state[field] = payload[field];
        }
      }
    }
    if (
      payload.personalDayOfBirth &&
      payload.personalMonthOfBirth &&
      payload.personalYearOfBirth
    ) {
      state.personalBirthDate = new Date(
        payload.personalYearOfBirth,
        payload.personalMonthOfBirth,
        payload.personalDayOfBirth
      );
    }
    if (
      payload.personalIDExpirationDay &&
      payload.personalIDExpirationMonth &&
      payload.personalIDExpirationYear
    ) {
      state.personalIDExpirationDate = new Date(
        payload.personalIDExpirationYear,
        payload.personalIDExpirationMonth,
        payload.personalIDExpirationDay
      );
    }
    // state = Object.assign(state, payload);
  },
  //done
  REMOVE_VERIFICATION(state, payload) {
    state = Object.assign(state, {
      personalFirstName: "",
      personalSecondName: "",
      personalFamilyName: "",
      personalBirthDate: null,
      personalSex: null,
      personalCountry: "",
      personalCity: "",
      personalStreet: "",
      personalBuilding: "",
      personalAppartment: "",
      personalZIP: "",
      personalPassport: {},
      personalIDCardFront: {},
      personalIDCardBack: {},
      personalDriverLicenseFront: {},
      personalDriverLicenseBack: {},
      personalIDExpirationDate: null,
      personalIDHasNoExpiration: false,
      personalSelfie: {},
      verificationLoading: true,
      verificationInProcess: false,
    });
  },
  SET_PERSONAL(state, { field, data }) {
    state[field] = data;
  },
};

const getters = {
  // isLike: (state) => (id) => {
  //   const lind = state.likes.findIndex((l) => l === id);
  //   return lind !== -1;
  // },
  isInProcess: (state) => {
    return !!state.personalSelfie;
  },
};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters,
};
