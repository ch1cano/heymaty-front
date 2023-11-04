<template>
  <div>
    <profile-girls />
  </div>
</template>

<script>
import ProfileGirls from "@/components/page-parts/profile/ProfileGirls.vue";
export default {
  name: "ModelsSettingsPage",
  components: { ProfileGirls },
  async asyncData({ store, error }) {
    if (store.state.user.user && store.state.user.user.role !== "user") {
      error({ statusCode: 403, message: "Доступ запрещен" });
      return;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>