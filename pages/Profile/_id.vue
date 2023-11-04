<template>
  <div>
    <nuxt-child />
    <profile-header v-if="!isChildShown" />
    <profile-body v-if="!isChildShown" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import ProfileHeader from "@/components/page-parts/profile/new/ProfileHeader.vue";
import ProfileBody from "@/components/page-parts/profile/new/ProfileBody.vue";

export default {
  name: "PageProfileId",
  components: {
    ProfileHeader,
    ProfileBody,
  },
  computed: {
    ...mapState("messages", ["onlineUsers"]),
    isChildShown() {
      return !!this.$route.params.postid;
    },
  },
  methods: {},
  async asyncData({ store, route, redirect, error }) {
    if (!route.params.id) {
      redirect("/");
      return;
    }
    let user;
    let mine = false;
    if (
      store.state.user.user &&
      (store.state.user.user._id === route.params.id ||
        store.state.user.user.profileNum === parseInt(route.params.id) ||
        store.state.user.user.profileUrl === route.params.id)
    ) {
      // redirect("/");
      // user = store.state.user.user;
      mine = true;
    }
    const response = await store.dispatch("user/getUserByUrl", {
      profileUrl: route.params.id,
    });
    // console.log(response);
    if (!response || (response && response.type === "error")) {
      // redirect("/");
      error({ statusCode: response.code, message: "Пользователь не найден" });
      return;
    }
    user = response;
    const count = await store.dispatch("user/getUserFavouriteCount", {
      modelId: user._id,
    });
    user.favouritesCount = count;
    if (user.role === "girl") {
      const { bundles } = await store.dispatch("model/getModelBundles", {
        modelId: user._id,
      });
      user.bundles = bundles;
    }
    await store.dispatch("post/resetPosts", null, { root: true });
    store.commit("post/SET_AUTHOR", user, { root: true });
    await store.dispatch("post/getOpenPosts", null, { root: true });
    await store.dispatch("post/getClosedPosts", null, { root: true });
    return { user, mine };
  },
};
</script>
