<template>
  <div class="item">
    <a
      @click.prevent="isLikeF ? deleteFavoriteF() : addFavoriteF()"
      :class="{ active: isLikeF }"
      class="like"
    />

    <n-link :to="localePath(`/profile/${getLink(item)}`)" class="image">
      <img :src="getAvatarUrl(item)" />
    </n-link>

    <div class="name">
      <span>
        {{ item.name }}, {{ item.realAge }}
        <i v-if="online" />
      </span>
      {{ item.personalCity ? `${item.personalCity},` : "" }}
      {{ item.personalCountry ? item.personalCountry : "" }}
    </div>

    <div class="flex buttons">
      <!-- <button @click.prevent="goTo(localePath(`/profile/${getLink(item)}`))">
        {{ $t("girlCard.goToProfileButtonText") }}
      </button>
      <button
        @click.prevent="goToIfAuth(localePath(`/dialoges?id=${item._id}`))"
      /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "GirlCard",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["auth"]),
    ...mapGetters("messages", ["isUserOnline"]),
    ...mapGetters("favorites", ["isLike", "getFavoriteId"]),

    isLikeF() {
      return this.isLike(this.item._id);
    },
    online() {
      return this.isUserOnline(this.item._id);
    },
  },
  methods: {
    ...mapActions("favorites", ["addFavorite", "deleteFavorite"]),
    async deleteFavoriteF() {
      if (!this.auth || (this.user && this.user.role !== "user")) {
        return false;
      }
      const response = await this.deleteFavorite({
        id: this.getFavoriteId(this.item._id),
      });
      if (response && response.type === "error") {
        this.$notify.error({
          title: this.$t("girlCard.notifications.errorTitle"),
          message: this.$t("girlCard.notifications.errorRemovingFromFav"),
        });
        return false;
      }
      this.$notify.success({
        message: this.$t("girlCard.notifications.successRemovingFromFav"),
      });
    },

    async addFavoriteF() {
      if (!this.auth) {
        this.$notify.info({
          message: this.$t("girlCard.notifications.youShouldLogIn"),
        });
        return false;
      }
      //if (this.user && this.user.role !== "user") {
      //  this.$notify.info({
      //    message: this.$t("girlCard.notifications.onlyFansCouldAddToFav"),
      //  });
      //  return false;
      //}
      const response = await this.addFavorite({
        modelId: this.item._id,
      });
      if (response && response.type === "error") {
        this.$notify.error({
          title: this.$t("girlCard.notifications.errorTitle"),
          message: this.$t("girlCard.notifications.errorAddingToFav"),
        });
        return false;
      }
      this.$notify.success({
        message: this.$t("girlCard.notifications.successAddingToFav"),
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.image {
  img {
    // height: 100px;
    aspect-ratio: 379/329;
    object-fit: cover;
    border-radius: 15px;
  }
}
.name i {
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background: #4bc150;
  margin-left: 5px;
  margin-bottom: 2px;
}
</style>
