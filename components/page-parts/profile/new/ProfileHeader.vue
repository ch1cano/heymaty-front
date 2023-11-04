<template>
  <div class="posts-top-block" :style="coverStyle">
    <div class="wrap small">
      <n-link :to="localePath('/')"
        ><i class="fa fa-angle-left"></i>
        {{ $t("profileHeader.backToMain") }}</n-link
      >
      <div class="photo avatar-container">
        <img :src="getAvatarUrl(author)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "ProfileHeader",
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
      if (this.author && this.author.cover && this.author.cover.filename) {
        return this.getPublicMedia(this.author.cover.filename);
      } else {
        return require("~/assets/img/index-first-block.png");
      }
    },
  },
  methods: {},
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
    border-radius: 50%;
    // border-radius: 7%;
  }
}
</style>
