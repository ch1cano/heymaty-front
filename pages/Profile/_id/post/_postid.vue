<template>
  <div>
    <post-header />
    <post-body :p="post" />
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import PostHeader from "@/components/page-parts/posts/PostHeader.vue";
import PostBody from "@/components/page-parts/posts/PostBody.vue";

export default {
  name: "PostPage",
  props: {},
  watchQuery: true,
  components: { PostHeader, PostBody },
  async asyncData({ store, route, redirect, error }) {
    if (!route.params.postid) {
      redirect("/");
    }
    // if (!store.state.user.user) {
    //   error({ statusCode: 401, message: "Требуется авторизация" });
    // }
    const post = await store.dispatch("model/getPost", {
      id: route.params.postid,
    });
    if (!post.post || (post && post.type === "error")) {
      error({ statusCode: post.code, message: "Пост не найден" });
      return;
    }
    return { post: post.post };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["auth"]),
    ...mapGetters("subscribe", ["isActiveSubscription"]),
    isActSub() {
      return this.isActiveSubscription(this.author._id);
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
