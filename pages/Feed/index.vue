<template>
  <div class="tabs">
    <div class="posts-page">
      <div class="wrap small flex">
        <div class="list" v-if="">
          <div class="spinner"></div>
        </div>
        <div class="list empty-state" v-if="isFavoritesNoPosts">
          Oh, your matys have no posts yet. Keep tuning!
        </div>
        <div class="list empty-state" v-else-if="isNotHaveFavorites">
          Oh, you have no matys! Let's start a search together.
        </div>
        <div class="list" v-else>
          <transition name="slide-left" mode="out-in">
            <posts-list key="publicPosts" isPublic />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "./../../components/ui/Spinner";
import { mapState, mapActions } from "vuex";
import PostsList from "@/components/page-parts/posts/PostsList.vue";

export default {
  name: "PageIndex",
  components: {
    PostsList,
    Spinner, // Ensure Spinner is imported correctly
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapState("post", ["pageOpen", "openPosts", "publicPostsLoading"]),
    ...mapState("favorites", ["favorites"]),
    isChildShown() {
      return !!this.$route.params.postid;
    },
    isFavoritesNoPosts() {
      return (
        !this.publicPostsLoading &&
        this.favorites.length > 0 &&
        this.openPosts.length === 0
      );
    },
    isNotHaveFavorites() {
      return !this.publicPostsLoading && this.openPosts.length === 0;
    },
    isLoading() {
      return !this.publicPostsLoading && !this.openPosts;
    },
  },
  async mounted() {
    await this.$store.dispatch("post/resetPosts", null, { root: true });
    await this.$store.dispatch("post/getAllPublicPosts", null, { root: true });
  },
};
</script>

<style>
/* Improved styling */
.tabs {
  padding: 20px;
}

.wrap.small.flex {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.empty-state {
  margin-bottom: 100px;
  font-weight: bold;
  font-size: 42px;
  line-height: 120%;
  text-align: center;
  color: #55555b;
}
</style>
