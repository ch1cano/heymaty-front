import Vue from "vue";
import { mapMutations } from "vuex";
import dayjs from "dayjs";

// Global functions
Vue.mixin({
  components: {},
  methods: {
    ...mapMutations("layout", ["CHANGE_STATE"]),

    changeModal(type, data, params) {
      this.CHANGE_STATE({
        type,
        data: {
          bg: data,
          box: data,
          ...params,
        },
      });
    },

    getLink(item) {
      if (item.profileUrl) return item.profileUrl;
      if (item.profileNum) return item.profileNum;
      return item._id;
    },

    toMoney(amount) {
      return (parseInt(amount) / 100).toFixed(2);
    },

    toCents(amount) {
      return parseInt(amount * 100);
    },

    getPublicMedia(filename) {
      return `${process.env.PUBLIC_URL}/media/${filename}`;
    },

    getAvatarUrl(item) {
      if (item && item.profile && item.profile.filename) {
        return this.getPublicMedia(item.profile.filename);
      }
      return require(`@/assets/img/item-heymaty.svg`);
    },
    getCoverUrl(item) {
      if (item && item.cover && item.cover.filename) {
        return this.getPublicMedia(item.cover.filename);
      }
      return require("~/assets/img/index-first-block.png");
    },
    isBlocked(item) {
      return (
        item && item.blockExpires && dayjs(item.blockExpires).isAfter(dayjs())
      );
    },

    goTo(link) {
      this.$router.push(link);
    },

    goToIfAuth(link) {
      if (this.$store.getters["user/auth"]) return this.$router.push(link);
      return this.changeModal("signUp", true);
    },
  },
});
