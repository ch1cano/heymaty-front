export default {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    const token = this.$cookiz.get("token");

    if (token && token !== null) {
      this.$api.setHeader("Authorization", `Bearer ${token}`);

      const response = await dispatch("user/getMyProfile", null, {
        root: true,
      });
      if (response && response.type === "error") {
        this.$cookiz.remove("token");
      } else {
        await dispatch("favorites/getMyFavorites", null, { root: true });
        if (response.role === "user")
          await dispatch("subscribe/getMySubscriptions", null, { root: true });
        if (response.role === "girl")
          await dispatch("subscribe/getMySubscribers", null, { root: true });
      }
    }

    await dispatch("layout/getServices", null, { root: true });
    await dispatch("layout/getLangs", null, { root: true });
    await dispatch("layout/getCountries", null, { root: true });
    await dispatch("layout/getCities", null, { root: true });
    await dispatch("layout/getAges", null, { root: true });
  },
};
