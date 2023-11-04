<template>
  <div class="posts-page">
    <div class="wrap small flex">
      <div class="list mt">
        <nuxt-child />
        <post v-if="!isChildShown" :p="p" />
        <comments v-if="!isChildShown" :obj="p" />
      </div>
      <!-- <popular-widget v-if="!isChildShown" /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import PopularWidget from "../../ui/PopularWidget.vue";
import Comments from "../comments/Comments.vue";
import Post from "./Post.vue";

export default {
  name: "PostBody",
  props: {
    p: {
      type: Object,
      required: true,
    },
  },
  components: { Post, Comments, PopularWidget },
  computed: {
    ...mapState("post", ["author"]),
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["auth"]),
    ...mapGetters("subscribe", ["isActiveSubscription"]),
    mine() {
      if (this.author && this.user && this.author._id === this.user._id)
        return true;
      return false;
    },
    isGirl() {
      return this.author && this.author.role === "girl";
    },
    isChildShown() {
      return this.$route.name === "Profile-id-post-postid-edit";
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
}
</style>
