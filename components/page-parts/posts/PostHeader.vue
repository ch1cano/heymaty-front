<template>
  <div class="posts-top-block other" :style="coverStyle">
    <div class="wrap small">
      <n-link :to="localePath(`/profile/${getLink(author)}`)"
        ><i class="fa fa-angle-left"></i>
        {{ $t("postHeader.backToProfile") }}</n-link
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "PostHeader",
  data() {
    return {
      coverStyle: {},
    };
  },
  computed: {
    ...mapState("post", ["author"]),
    publicUrl() {
      return process.env.PUBLIC_URL;
    },
    coverUrl() {
      if (this.author.cover && this.author.cover.filename) {
        return `${this.publicUrl}/media/${this.author.cover.filename}`;
      } else {
        return require("~/assets/img/index-first-block.png");
      }
    },
  },
  mounted() {
    this.coverStyle = {
      backgroundImage: `url(${this.coverUrl})`,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-container {
  max-width: 260px;
  height: 260px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 7%;
  }
}
</style>
