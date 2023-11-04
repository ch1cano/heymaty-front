<template>
  <div>
    <div class="posts-top-block" :style="coverStyle">
      <label for="uploadCover">
        <input id="uploadCover" @change="uploadCover" type="file" accept="image/*" />
        {{ $t("profileCard.changeCover") }}
      </label>
      <div class="wrap small">
        <n-link :to="localePath('/')">
          <i class="fa fa-angle-left"></i>
          {{ $t("profileHeader.backToMain") }}
        </n-link>
        <div class="photo other avatar-container">
          <label for="uploadAvatar">
            <input id="uploadAvatar" @change="uploadAvatar" type="file" accept="image/*" />
            {{ $t("profileCard.changeAvatar") }}
          </label>
          <img :src="avatarUrl" />
        </div>
      </div>
    </div>
    <div class="posts-page other">
      <div class="wrap small flex">
        <div class="list">
          <div class="top-info">
            <div class="top-ballanse">
              <span>{{ toMoney(user.balance || 0) }}</span> HDC
              <br />
              <nuxt-link
                :to="localePath('/Settings/Balance')"
              >{{ $t("profileCard.balanceHistory") }}</nuxt-link>
            </div>
            <div class="name">
              <span>{{ user.name }}</span>
              <span class="userage">
                {{
                  $tc("profileCard.userAge", user.realAge)
                }}
              </span>
              <!-- <button
                class="other"
                @click.prevent="goTo(localePath('/Settings/Balance'))"
              >
                {{ $t("profileCard.withdrawFunds") }}
              </button>-->
            </div>
            <div class="insta">
              <a href="#">@{{ getLink(user) }}</a>
            </div>
            <div class="count" v-if="user.role === 'girl'">
              {{ $tc("profileBody.totalPosts", totalPosts) }}
              &bull;
              {{ $tc("profileBody.favouritesCount", favCount) }}
            </div>
            <p>{{ user.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap small">
      <div class="profile-page other">
        <div class="tabs r-tabs" id="tabs">
          <ul class="flex other r-tabs-nav">
            <li
              v-for="item in menuItems"
              :key="item.id"
              class="r-tabs-tab"
              :class="{ 'r-tabs-state-active': isPathActive(item.path) }"
            >
              <n-link :to="localePath(item.path)">
                {{ item.title }}
                <span v-if="item.count">{{ item.count }}</span>
              </n-link>
            </li>
          </ul>
          <div class="current-tab">
            <nuxt-child></nuxt-child>
          </div>
        </div>
      </div>
    </div>

    <!-- <nuxt-link :to="localePath('/Settings')">Main sett</nuxt-link>
    <nuxt-link :to="localePath('/Settings/Posts')">Posts</nuxt-link>
    <nuxt-link :to="localePath('/Settings/Bundles')">Bundles</nuxt-link>
    <nuxt-link :to="localePath('/Settings/Settings')">Settings</nuxt-link>
    <nuxt-link :to="localePath('/Settings/Balance')">Balance</nuxt-link>
    <nuxt-link :to="localePath('/Settings/Models')">Models</nuxt-link>-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "SettingsPage",
  data() {
    return {
      coverStyle: {},
      avatarUrl: null
    };
  },
  async asyncData({ store, route, error, redirect, localePath, i18n }) {
    // console.log(i18n.t);
    if (!store.state.user.user) {
      error({ statusCode: 403, message: "Доступ запрещен" });
      return;
    }
    const menuItems = [
      {
        id: "settings",
        title: i18n.t("profileCard.settingsTabTitle"),
        path: "/Settings/Personal",
      },
      {
        id: "balance",
        title: i18n.t("profileCard.balanceTabTitle"),
        path: "/Settings/Balance",
      },
    ];
    const favCount = await store.dispatch("user/getUserFavouriteCount", {
      modelId: store.state.user.user._id,
    });
    const { bundles } = await store.dispatch("model/getModelBundles", {
      modelId: store.state.user.user._id,
    });
    await store.dispatch("post/resetPosts", null, { root: true });
    store.commit("post/SET_AUTHOR", store.state.user.user, { root: true });
    await store.dispatch("post/getOpenPosts", null, { root: true });
    await store.dispatch("post/getClosedPosts", null, { root: true });
    if (store.state.user.user.role === "girl") {
      menuItems.unshift({
        id: "bundles",
        title: i18n.t("profileCard.bundlesTabTitle"),
        path: "/Settings/Bundles",
        count: bundles.length,
      });
      menuItems.unshift({
        id: "posts",
        title: i18n.t("profileCard.postsTabTitle"),
        path: "/Settings/Posts",
        count:
          (parseInt(store.state.post.totalDocsOpen) || 0) +
          (parseInt(store.state.post.totalDocsClosed) || 0),
      });
    }
    if (store.state.user.user.role === "user") {
      menuItems.unshift({
        id: "models",
        title: i18n.t("profileCard.modelsTabTitle"),
        path: "/Settings/Models",
      });
    }
    if (route.matched.length === 1) {
      redirect(localePath("/Settings/Personal"));
    }

    return { menuItems, favCount, bundles };
  },
  methods: {
    ...mapActions("user", ["updateUserAvatar", "updateUserCover"]),
    ...mapActions("model", ["updateModelAvatar", "updateModelCover"]),
    isPathActive(path) {
      return this.$route.path === this.localePath(path);
    },
    async uploadAvatar(e) {
      const file = e.target.files[0];

      const form = new FormData();
      form.append("profile", file);

      let response = "";
      if (this.user.role === "user") {
        response = await this.updateUserAvatar(form);
      } else if (this.user.role === "girl") {
        response = await this.updateModelAvatar(form);
      }

      if (response && response.type === "error") {
        this.$notify.error({
          title: this.$t("profileCard.notifications.errorTitle"),
          message: this.$t("profileCard.notifications.errorUploadingAvatar"),
        });
        return false;
      }
      this.$notify.success({
        message: this.$t("profileCard.notifications.successUploadingAvatar"),
      });
    },
    async uploadCover(e) {
      const file = e.target.files[0];

      const form = new FormData();
      form.append("cover", file);

      let response = "";
      if (this.user.role === "user") {
        response = await this.updateUserCover(form);
      } else if (this.user.role === "girl") {
        response = await this.updateModelCover(form);
      }

      if (response && response.type === "error") {
        this.$notify.error({
          title: this.$t("profileCard.notifications.errorTitle"),
          message: this.$t("profileCard.notifications.errorUploadingCover"),
        });
        return false;
      }
      this.$notify.success({
        message: this.$t("profileCard.notifications.successUploadingCover"),
      });
    },
  },
  computed: {
    ...mapState("user", ["user", "coverFileName", "profileFileName"]),
    ...mapState("post", ["totalDocsOpen", "totalDocsClosed"]),
    // profileCover() {
    //   const defaultCover = require("~/assets/img/index-first-block.png");
    //   return this.user?.cover?.filename ? this.getPublicMedia(this.user.cover.filename) : defaultCover;
    // },
    // compUser() {
    //   return this.user
    // },
    // coverUrl() {
    //   return this.compUser["cover"]
    // },
    totalPosts() {
      return (
        (parseInt(this.totalDocsOpen) || 0) +
        (parseInt(this.totalDocsClosed) || 0)
      );
    },
  },
  mounted() {
    this.coverStyle = {
      backgroundImage: `url(${this.getCoverUrl(this.user)})`,
    };
    this.avatarUrl = this.getAvatarUrl(this.user);
  },
  watch: {
    // profileCover() {
    //   this.coverStyle = {
    //     backgroundImage: `url(${this.profileCover})`,
    //   };
    // },
    // user: {
    //   deep: true,
    //   immediate: true,
    //   handler(u) {
    //     console.log(u)
    //     this.coverStyle = {
    //       backgroundImage: `url(${this.getCoverUrl(u)})`,
    //     };
    //   }
    // },
    coverFileName() {
      this.coverStyle = {
        backgroundImage: `url(${this.getCoverUrl(this.user)})`,
      };
    },
    profileFileName() {
      this.avatarUrl = this.getAvatarUrl(this.user);
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-container {
  max-width: 260px;
  height: 260px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    border-radius: 15px;
    transition: opacity 0.3s;
  }
  &:hover::after {
    opacity: 1;
  }
  &:hover {
    label {
      display: flex;
    }
  }
  label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #5171e4;
    font-weight: 500;
    font-size: 18px;
    color: #fff;
    border: 1px solid #5171e4;
    border-radius: 36px;
    width: 200px;
    height: 53px;
    display: none;
    -ms-align-items: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    input {
      display: none;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 7%;
  }
}
.posts-top-block {
  position: relative;
  > label {
    position: absolute;
    top: 5%;
    right: 1%;
    // transform: translate(-50%, -50%);
    background: #5171e4;
    font-weight: 500;
    font-size: 18px;
    color: #fff;
    border: 1px solid #5171e4;
    border-radius: 36px;
    width: 255px;
    height: 53px;
    display: flex;
    -ms-align-items: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    input {
      display: none;
    }
  }
}
.name {
  .userage {
    font-size: 0.5em;
    opacity: 0.7;
  }
}
</style>
