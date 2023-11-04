<template>
  <div>
    <profile-posts :mine="true" :id="user._id" />
    <div class="posts-page">
      <div class="wrap small flex">
        <div class="list">
          <posts :item="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfilePosts from "@/components/page-parts/profile/ProfilePosts.vue";
import Posts from "@/components/page-parts/posts/Posts.vue";
export default {
  components: { ProfilePosts, Posts },
  name: "PostsSettingsPage",
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
.posts-page {
  padding: initial !important;
  .list {
    padding: initial !important;
  }
}
</style>