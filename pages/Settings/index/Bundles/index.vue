<template>
  <div>
    <profile-bundles :mine="true" :id="user._id" />
  </div>
</template>

<script>
import ProfileBundles from "@/components/page-parts/profile/ProfileBundles.vue";
export default {
  name: "BundlesSettingsPage",
  components: { ProfileBundles },
  async asyncData({ store, error }) {
    if (store.state.user.user && store.state.user.user.role !== "girl") {
      error({ statusCode: 403, message: "Доступ запрещен" });
      return;
    }
    return { user: store.state.user.user };
  },
};
</script>

<style lang="scss" scoped>
</style>