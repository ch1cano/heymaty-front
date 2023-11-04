<template>
  <div class="tabs">
    <ul class="tabNavigation">
      <li v-for="tab in tabs" :key="tab.id">
        <a
          @click.prevent="tab.enabled && setTab(tab.id)"
          href="#"
          :class="{ selected: activeTab === tab.id }"
          >{{ tab.title }} <span>{{ postsCount[tab.id] || 0 }}</span>
        </a>
      </li>
    </ul>
    <transition name="slide-left" mode="out-in">
      <posts-list v-if="activeTab === 'openPosts'" key="openPosts" />
      <posts-list v-if="activeTab === 'closedPosts'" key="closedPosts" closed />
    </transition>
  </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";
import PostsList from "./PostsList.vue";
export default {
  components: { PostsList },
  name: "Posts",
  data() {
    return {
      // tabs: [
      //   {
      //     title: this.$t("posts.publicPosts"),
      //     id: "openPosts",
      //   },
      //   {
      //     title: this.$t("posts.privatePosts"),
      //     id: "closedPosts",
      //   },
      // ],
      activeTab: "openPosts",
    };
  },
  computed: {
    ...mapGetters("subscribe", ["isActiveSubscription"]),
    ...mapState("post", ["author", "totalDocsOpen", "totalDocsClosed"]),
    tabs() {
      // author.subscriptionEnabled
      const tbs = [];
      tbs.push({
        title: this.$t("posts.publicPosts"),
        id: "openPosts",
        enabled: true,
      });
      if (this.author.subscriptionEnabled) {
        tbs.push({
          title: this.$t("posts.privatePosts"),
          id: "closedPosts",
          enabled: !!this.postsCount.closedPosts,
        });
      }
      return tbs;
    },
    publicUrl() {
      return process.env.PUBLIC_URL;
    },
    isSubActive() {
      return this.isActiveSubscription(this.author._id);
    },
    isChildShown() {
      return !!this.$route.params.postid;
    },
    postsCount() {
      return {
        openPosts: this.totalDocsOpen,
        closedPosts: this.totalDocsClosed,
      };
    },
  },
  methods: {
    setTab(tabId) {
      this.activeTab = tabId;
    },
  },
};
</script>

<style lang="scss" scoped></style>
