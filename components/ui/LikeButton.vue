<template>
  <!-- <div v-if="user" class="container">
    <div
      :class="isLiked ? 'liked' : 'unliked'"
      :title="isLiked ? 'Убрать лайк' : 'Поставить лайк'"
    >
      <button @click.prevent="isLiked ? unlikeIt() : likeIt()">
        <component :is="isLiked ? 'Liked' : 'Unliked'" />
        <div v-if="count" class="count">{{ displayCount }}</div>
      </button>
    </div>
  </div> -->
  <a
    :class="isLiked ? 'liked' : 'unliked'"
    @click.prevent="isLiked ? unlikeIt() : likeIt()"
    href="#"
    >{{ displayCount || 0 }}</a
  >
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Liked from "@/assets/svg/profile-heart-fill.svg?inline";
import Unliked from "@/assets/svg/profile-heart-stroke.svg?inline";

export default {
  name: "LikeButton",
  props: {
    obj: {
      type: Object,
      required: true,
    },
  },
  components: {
    Liked,
    Unliked,
  },
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("like", ["isLike"]),
    isLiked() {
      return this.isLike(this.obj._id);
    },
    mine() {
      if (!this.user) return false;
      return (
        this.obj.userId === this.user._id ||
        this.obj.userId._id === this.user._id
      );
    },
    displayCount() {
      return this.count < 100 ? `${this.count}` : `99+`;
    },
  },
  methods: {
    ...mapActions("like", ["like", "unlike"]),
    async getLikesCount() {
      const { data } = await this.$api.get("/likes/" + this.obj._id);
      this.count = parseInt(data.count);
    },
    async likeIt() {
      await this.like(this.obj._id);
      await this.getLikesCount();
    },
    async unlikeIt() {
      await this.unlike(this.obj._id);
      await this.getLikesCount();
    },
  },
  async mounted() {
    // if (this.mine) {
    await this.getLikesCount();
    // }
  },
};
</script>

<style lang="scss" scoped>
.liked {
  background: url("~assets/img/post-icon5.svg") no-repeat 0 0 !important;
}
.unliked {
  background: url("~assets/img/post-icon3.svg") no-repeat 0 0 !important;
}
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
