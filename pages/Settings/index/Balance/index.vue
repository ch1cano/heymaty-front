<template>
  <div>
    <profile-balance :user="user" />
  </div>
</template>

<script>
import ProfileBalance from "@/components/page-parts/profile/ProfileBalance.vue";
export default {
  name: "BalanceSettingsPage",
  components: { ProfileBalance },
  async asyncData({ store, error }) {
    if (!store.state.user.user) {
      error({ statusCode: 403, message: "Доступ запрещен" });
      return;
    }
    return { user: store.state.user.user };
  },
};
</script>

<style lang="scss" scoped>
</style>