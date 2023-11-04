<template>
  <div>
    <div>
      <post v-for="post in posts" :key="post._id" :item="author" :p="post" />
    </div>
    <div v-if="loading" class="loading">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <infinite-loading v-if="posts.length" spinner="bubbles" @infinite="infiniteScroll"></infinite-loading>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Post from "./Post.vue";
export default {
  components: { Post },
  name: "PostsList",
  props: {
    closed: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    ...mapGetters("subscribe", ["isActiveSubscription"]),
    ...mapState("post", [
      "author",
      "totalDocsOpen",
      "totalDocsClosed",
      "hasNextPageOpen",
      "hasNextPageClosed",
      "openPostsLoading",
      "closedPostsLoading",
      "pageOpen",
      "pageClosed"
    ]),
    ...mapGetters("post", ["sortedOpenPosts", "sortedClosedPosts"]),
    ...mapActions("post", ["getOpenPosts", "getClosedPosts","resetPosts"]),
    isSubActive() {
      return this.isActiveSubscription(this.author._id);
    },
    isMorePosts() {
      if (this.closed) return this.hasNextPageClosed;
      return this.hasNextPageOpen;
    },
    posts() {
      if (this.closed) return this.sortedClosedPosts;
      return this.sortedOpenPosts;
    },
    loading() {
      if (this.closed) return this.closedPostsLoading;
      return this.openPostsLoading;
    },
    currentPage() {
      if (this.closed) return this.pageClosed;
      return this.pageOpen;
    },
  },
  methods: {
    infiniteScroll($state) {
      setTimeout(async () => {  // This is already an arrow function, so 'this' context should be fine
        await this.getPosts(); // next page
        if (this.sortedOpenPosts.length > 1 && this.hasNextPageOpen) { // check if any left
          $state.loaded();
        } else {
          $state.complete();
        }
      }, 500);
    },

    async getPosts() {
      try {
        if (!this.isPublic) await this.$store.dispatch('post/getOpenPosts', null, { root: true });
        else if (this.hasNextPageOpen) await this.$store.dispatch('post/getAllPublicPosts', null, { root: true });
        else return [];
      } catch (error) {
        console.error("An error occurred while fetching posts:", error);
      } finally {
      }
    }
  },

  async mounted() {
    if (!this.isPublic) this.$store.dispatch('post/getOpenPosts', null, { root: true });
  }
};

</script>

<style lang="scss" scoped>
.more {
  display: flex;
  justify-content: center;
}

.loading {
  display: flex;
  justify-content: center;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #434ca5;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
