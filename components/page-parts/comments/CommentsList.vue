<template>
  <div class="container">
    <!-- <div class="comments"> -->
    <!-- </div> -->
    <div v-if="commentsLoading" class="loading">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="more">
      <a
        v-if="hasNextPage && !commentsLoading"
        href="#"
        @click.prevent="getMore"
      >{{ $t("commentsList.showMore") }}</a>
    </div>
    <comment-view v-for="c in sortedComments" :key="c._id" :comment="c" />

    <div class="new">
      <new-comment-form />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import CommentView from "./CommentView.vue";
import NewCommentForm from "./NewCommentForm.vue";
export default {
  name: "CommentsList",
  props: {
    obj: {
      type: Object,
      required: true,
    },
  },
  components: { NewCommentForm, CommentView },
  computed: {
    ...mapGetters("comment", ["sortedComments"]),
    ...mapState("comment", [
      "hasNextPage",
      "page",
      "totalDocs",
      "commentsLoading",
    ]),
  },
  methods: {
    ...mapActions("comment", ["getComments", "resetComments"]),
    ...mapMutations("comment", ["SET_POST_ID"]),
    async getMore() {
      await this.getComments();
    },
  },
  mounted() {
    this.SET_POST_ID(this.obj._id);
    this.getMore();
  },
  beforeDestroy() {
    this.resetComments();
  },
};
</script>

<style lang="scss" scoped>
.container {
  .more {
    display: flex;
    justify-content: center;
    padding-top: 15px;
  }
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
