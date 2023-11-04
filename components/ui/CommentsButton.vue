<template>
  <div v-if="user" class="container">
    <div>
      <button @click.prevent="scrollToComments">
        <component :is="'CommentsIcon'" />
        <div v-if="totalDocs" class="count">{{ displayCount }}</div>
      </button>
    </div>
    <div id="scroll"></div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import CommentsIcon from "@/assets/svg/comment.svg?inline";

export default {
  name: "LikeButton",
  components: {
    CommentsIcon,
  },
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("comment", ["totalDocs"]),
    displayCount() {
      return this.totalDocs < 100 ? `${this.totalDocs}` : `99+`;
    },
  },
  methods: {
    scrollToComments() {
      const options = {
        container: ".container",
        easing: "ease-in",
        lazy: false,
        // force: true,
      };
      this.$scrollTo("#scroll", 300, options);
    },
  },
  async mounted() {},
};
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  margin: 0;
  padding: 0;
  // width: 200px;
  // height: 200px;
  div {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    button {
      position: relative;
      background-color: transparent;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      svg {
        width: 100%;
        height: 100%;
      }
      .count {
        display: inline-block;
        width: 25%;
        height: 25%;
        position: absolute;
        // top: 50%;
        // left: 50%;
        right: 0;
        color: #b87cf1;
        // transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 50%;
        border: 1px solid #b87cf1;
        padding: 4px;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
