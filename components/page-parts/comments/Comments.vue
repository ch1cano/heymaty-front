<template>
  <div class="comments">
    <div class="name">{{ $t("comments.comments") }}</div>
    <comments-list :obj="obj" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import LikeButton from "../../ui/LikeButton.vue";
import CommentsButton from "../../ui/CommentsButton.vue";
import CommentsList from "./CommentsList.vue";
export default {
  components: { CommentsList, LikeButton, CommentsButton },
  name: "Comments",
  props: {
    obj: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("comment", ["totalDocs"]),
  },
};
</script>

<style lang="scss" scoped>
</style>