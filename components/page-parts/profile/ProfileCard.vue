<template>
  <div>
    <div class="posts-top-block" :style="coverStyle">
      <label v-if="mine" for="uploadCover">
        <input id="uploadCover" @change="uploadCover" type="file" accept="image/*" />
        {{ $t("profileCard.changeCover") }}
      </label>
      <div class="wrap">
        <n-link :to="localePath('/')">
          <i class="fa fa-angle-left"></i>
          {{ $t("profileHeader.backToMain") }}
        </n-link>
        <div class="photo avatar-container">
          <label v-if="mine" for="uploadAvatar">
            <input id="uploadAvatar" @change="uploadAvatar" type="file" accept="image/*" />
            {{ $t("profileCard.changeAvatar") }}
          </label>
          <img :src="getAvatarUrl(profile)" />
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="profile-page">
        <div v-if="mine && !isChildShown" class="ballanse">
          <p>{{ $t("profileCard.balance") }}</p>
          <div class="price">
            <span>
              {{ toMoney(profile.balance || 0) }}
              <span>$</span>
            </span>
          </div>
          <button @click="activeNav = 5">{{ $t("profileCard.withdrawFunds") }}</button>
          <div class="link">
            <a @click.prevent="activeNav = 5" href="#">{{ $t("profileCard.balanceHistory") }}</a>
          </div>
        </div>
        <div v-else-if="!mine" class="top-links">
          <a
            v-if="
              !mine &&
              profile.role !== 'user' &&
              this.user &&
              this.user.role !== 'girl'
            "
            @click.prevent="!isLikeF ? addFavoriteF() : deleteFavoriteF()"
            href="#"
          >
            <img v-show="!isLikeF" src="@/assets/svg/profile-heart-stroke.svg" />
            <img v-show="isLikeF" src="@/assets/svg/profile-heart-fill.svg" />
            <span>{{ $t("profileCard.like") }}</span>
          </a>
          <a
            v-if="
              !mine &&
              profile.role !== 'user' &&
              this.user &&
              this.user.role !== 'girl'
            "
            href="#"
            @click.prevent="goTo(localePath(`/dialoges?id=${profile._id}`))"
          >
            <img src="@/assets/svg/profile-icon2.svg" />
            <span>{{ $t("profileCard.goToChat") }}</span>
          </a>
        </div>

        <div class="flex">
          <div class="photo">
            <div class="name">
              {{ profile.name }},
              <!-- {{ profile.age }}
              {{ $funcs.decOfNum(profile.age, ["год", "года", "лет"]) }}-->
              {{ $tc("profileCard.userAge", profile.realAge) }}
              <i v-if="online" />
            </div>
            <!-- <div v-swiper:mediaSwiper="swiperOptions" class="slider">
              <div class="swiper-wrapper">
                <div
                  :class="{ 'change-image': mine }"
                  class="image swiper-slide"
                  key="avatar"
                >
                  <label v-if="mine" for="uploadAvatar">
                    <input
                      id="uploadAvatar"
                      @change="uploadAvatar"
                      type="file"
                      accept="image/*"
                    />
                    {{ $t("profileCard.changeAvatar") }}
                  </label>
                  <img :src="profileAvatar" />
                  <div
                    v-if="
                      !mine &&
                      profile.role !== 'user' &&
                      this.user &&
                      this.user.role !== 'girl'
                    "
                    class="links"
                  >
                    <a
                      v-show="profile.role !== 'user'"
                      @click.prevent="addFavoriteF()"
                      href="#"
                    />
                    <a
                      @click.prevent="
                        goTo(localePath(`/dialoges?id=${profile._id}`))
                      "
                      href="#"
                    />
                  </div>
                </div>
                <div
                  :class="{ 'change-image': mine }"
                  class="image swiper-slide"
                  key="cover"
                >
                  <label v-if="mine" for="uploadCover">
                    <input
                      id="uploadCover"
                      @change="uploadCover"
                      type="file"
                      accept="image/*"
                    />
                    {{ $t("profileCard.changeCover") }}
                  </label>
                  <img :src="profileCover" />
                </div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>-->
          </div>

          <div :class="{ mine: mine }" class="info">
            <div class="name">
              {{ profile.name }},
              <!-- {{ profile.age }}
              {{ $funcs.decOfNum(profile.age, ["год", "года", "лет"]) }}-->
              {{ $tc("profileCard.userAge", profile.realAge) }}
              <i v-if="online" />
            </div>
            <p>{{ profile.description }}</p>
            <div class="tags" />
            <!-- <div
              v-if="profile.role === 'girl'"
              class="tags"
            >
              <a href="#">
                3 размер
              </a>
              <a href="#">
                английский C1
              </a>
              <a href="#">
                литература
              </a>
              <a href="#">
                спорт
              </a>
              <a href="#">
                путешествия
              </a>
              <a href="#">
                массаж
              </a>
              <a href="#">
                модель
              </a>
            </div>-->

            <div
              v-if="
                !mine &&
                profile.role !== 'user' &&
                this.user &&
                this.user.role !== 'girl'
              "
              class="price"
            >
              <button @click.prevent="showSubscribePopup">
                {{
                  isActiveSubscription(profile._id)
                    ? $t("profileCard.subscribeButtonProlong")
                    : $t("profileCard.subscribeButtonSub")
                }}
              </button>
              <span>
                {{ toMoney(profile.pricePerDay) }}
                <span>$</span>
              </span>
              {{ $t("profileCard.perDay") }}
            </div>
          </div>
        </div>

        <nuxt-child />

        <div v-if="!isChildShown" class="tabs r-tabs">
          <ul
            :class="[
              { other2: profile.role === 'user' && mine },
              { other: profile.role === 'girl' && mine },
            ]"
            class="flex r-tabs-nav"
          >
            <li
              v-if="
                item.mine ? mine : item.role === profile.role ? true : false
              "
              v-for="(item, i) in nav"
              :key="i"
              :class="{ 'r-tabs-state-active': activeNav === item.id }"
              class="r-tabs-tab r-tabs-state-default"
            >
              <a
                @click.prevent="activeNav = item.id"
                href="#"
                class="r-tabs-anchor"
              >{{ item.title }}</a>
            </li>
          </ul>

          <transition-group name="slide-left" mode="out-in">
            <div key="1" v-if="profile.role === 'girl'">
              <div
                :class="
                  activeNav === 1
                    ? 'r-tabs-state-active'
                    : 'r-tabs-state-default'
                "
                class="r-tabs-accordion-title"
              >
                <a
                  @click.prevent="
                    activeNav === 1 ? (activeNav = null) : (activeNav = 1)
                  "
                  href="#"
                  class="r-tabs-anchor"
                >{{ $t("profileCard.postsTabTitle") }}</a>
              </div>
              <profile-posts v-if="activeNav === 1" :mine="mine" :id="profile._id" />
            </div>
            <div key="2" v-if="profile.role === 'girl'">
              <div
                :class="
                  activeNav === 2
                    ? 'r-tabs-state-active'
                    : 'r-tabs-state-default'
                "
                class="r-tabs-accordion-title"
              >
                <a
                  @click.prevent="
                    activeNav === 2 ? (activeNav = null) : (activeNav = 2)
                  "
                  href="#"
                  class="r-tabs-anchor"
                >{{ $t("profileCard.bundlesTabTitle") }}</a>
              </div>
              <!-- <profile-info v-if="activeNav === 2" :user="profile" /> -->
              <profile-bundles v-if="activeNav === 2" :mine="mine" :id="profile._id" />
            </div>
            <div key="3" v-if="profile.role === 'user'">
              <div
                :class="
                  activeNav === 3
                    ? 'r-tabs-state-active'
                    : 'r-tabs-state-default'
                "
                class="r-tabs-accordion-title"
              >
                <a
                  @click.prevent="
                    activeNav === 3 ? (activeNav = null) : (activeNav = 3)
                  "
                  href="#"
                  class="r-tabs-anchor"
                >{{ $t("profileCard.modelsTabTitle") }}</a>
              </div>
              <profile-girls v-if="activeNav === 3" />
            </div>
            <div key="4" v-if="mine">
              <div
                :class="
                  activeNav === 4
                    ? 'r-tabs-state-active'
                    : 'r-tabs-state-default'
                "
                class="r-tabs-accordion-title"
              >
                <a
                  @click.prevent="
                    activeNav === 4 ? (activeNav = null) : (activeNav = 4)
                  "
                  href="#"
                  class="r-tabs-anchor"
                >{{ $t("profileCard.settingsTabTitle") }}</a>
              </div>
              <profile-settings v-if="activeNav === 4" :user="profile" />
            </div>
            <div key="5" v-if="mine">
              <div
                :class="
                  activeNav === 5
                    ? 'r-tabs-state-active'
                    : 'r-tabs-state-default'
                "
                class="r-tabs-accordion-title"
              >
                <a
                  @click.prevent="
                    activeNav === 5 ? (activeNav = null) : (activeNav = 5)
                  "
                  href="#"
                  class="r-tabs-anchor"
                >{{ $t("profileCard.balanceTabTitle") }}</a>
              </div>
              <profile-balance v-if="activeNav === 5" :user="profile" />
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <div v-if="profile.role === 'girl' && !mine" class="bottom-subscribe-block">
      <div class="wrap">
        <div class="text">
          <div class="name">{{ $t("profileCard.bottomPartTitle") }}</div>
          <p>{{ $t("profileCard.bottomPartDescription") }}</p>
          <button>{{ $t("profileCard.bottomPartButton") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import ProfilePosts from "./ProfilePosts";
import ProfileInfo from "./ProfileInfo";
import ProfileGirls from "./ProfileGirls";
import ProfileSettings from "./ProfileSettings";
import ProfileBalance from "./ProfileBalance";
import ProfileBundles from "./ProfileBundles";
import SubscribePopup from "../../modals/SubscribePopup.vue";

export default {
  name: "ProfileCard",
  components: {
    ProfilePosts,
    ProfileInfo,
    ProfileGirls,
    ProfileSettings,
    ProfileBalance,
    ProfileBundles,
  },
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
    mine: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        // loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // Some Swiper option/callback...
      },
      activeNav: 1,
      nav: [
        { id: 1, title: this.$t("profileCard.postsTabTitle"), role: "girl" },
        { id: 2, title: this.$t("profileCard.bundlesTabTitle"), role: "girl" },
        { id: 3, title: this.$t("profileCard.modelsTabTitle"), role: "user" },
        { id: 4, title: this.$t("profileCard.settingsTabTitle"), mine: true },
        { id: 5, title: this.$t("profileCard.balanceTabTitle"), mine: true },
      ],
      coverStyle: {},
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["auth"]),
    ...mapGetters("favorites", ["isLike", "getFavoriteId"]),
    ...mapGetters("subscribe", ["isActiveSubscription"]),
    ...mapGetters("messages", ["isUserOnline"]),
    publicUrl() {
      return process.env.PUBLIC_URL;
    },
    isChildShown() {
      return !!this.$route.params.postid;
    },
    online() {
      return this.isUserOnline(this.profile._id);
    },
    profileCover() {
      if (this.profile && this.profile.cover && this.profile.cover.filename) {
        return this.getPublicMedia(this.profile.cover.filename);
      }
      return require("~/assets/img/index-first-block.png");
    },
    isLikeF() {
      return this.isLike(this.profile._id);
    },
  },
  mounted() {
    this.setActiveNav();
    this.coverStyle = {
      backgroundImage: `url(${this.profileCover})`,
    };
  },
  watch: {
    profileCover() {
      this.coverStyle = {
        backgroundImage: `url(${this.profileCover})`,
      };
    },
  },
  methods: {
    ...mapActions("user", ["updateUserAvatar", "updateUserCover"]),
    ...mapActions("model", ["updateModelAvatar", "updateModelCover"]),
    ...mapActions("favorites", ["addFavorite", "deleteFavorite"]),

    showSubscribePopup() {
      if (!this.auth) {
        this.$notify.info({
          message: this.$t("profileCard.youShouldLogIn"),
        });
        return false;
      }
      if (this.user && this.user.role !== "user") {
        this.$notify.info({
          message: this.$t("profileCard.onlyFansCouldSubscribe"),
        });
        return false;
      }
      // this.$modal.show(
      //   SubscribePopup,
      //   { id: this.profile._id },
      //   { adaptive: true, width: "50%" }
      // );
      this.$vfm.show({
        component: SubscribePopup,
        bind: { id: this.profile._id },
      });
    },
    setActiveNav() {
      if (this.profile.role === "user" && this.mine) {
        this.activeNav = 3;
      }
    },

    // Добавление модели в избранное
    async addFavoriteF() {
      if (!this.auth) {
        this.$notify.info({
          message: this.$t("profileCard.youShouldLogIn"),
        });
        return false;
      }
      //if (this.user && this.user.role !== "user") {
      //  this.$notify.info({
      //    message: this.$t("profileCard.onlyFansCouldAddToFav"),
      //  });
      //  return false;
      //}
      if (this.isLikeF) {
        this.$notify.success({
          message: this.$t("profileCard.alreadyInFav"),
        });
        return false;
      }
      const response = await this.addFavorite({
        modelId: this.profile._id,
      });
      if (response && response.type === "error") {
        this.$notify.error({
          title: this.$t("profileCard.errorTitle"),
          message: this.$t("profileCard.errorAddingToFav"),
        });
        return false;
      }
      this.$notify.success({
        message: this.$t("profileCard.successAddingToFav"),
      });
    },

    async deleteFavoriteF() {
      if (!this.auth || (this.user && this.user.role !== "user")) {
        return false;
      }
      const response = await this.deleteFavorite({
        id: this.getFavoriteId(this.profile._id),
      });
      if (response && response.type === "error") {
        this.$notify.error({
          title: this.$t("profileCard.errorTitle"),
          message: this.$t("profileCard.errorRemovingFromFav"),
        });
        return false;
      }
      this.$notify.success({
        message: this.$t("profileCard.successRemovingFromFav"),
      });
    },

    async uploadAvatar(e) {
      if (this.mine) {
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
            title: this.$t("profileCard.errorTitle"),
            message: this.$t("profileCard.errorUploadingAvatar"),
          });
          return false;
        }
        this.$notify.success({
          message: this.$t("profileCard.successUploadingAvatar"),
        });
      }
    },
    async uploadCover(e) {
      if (this.mine) {
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
            title: this.$t("profileCard.errorTitle"),
            message: this.$t("profileCard.errorUploadingCover"),
          });
          return false;
        }
        this.$notify.success({
          message: this.$t("profileCard.successUploadingCover"),
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.flex {
  justify-content: initial !important;
}
.photo {
  width: initial !important;
}
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
    background: #fff;
    font-weight: 500;
    font-size: 18px;
    color: #b87cf1;
    border: 1px solid #b87cf1;
    border-radius: 36px;
    width: 255px;
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
    background: #fff;
    font-weight: 500;
    font-size: 18px;
    color: #b87cf1;
    border: 1px solid #b87cf1;
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
</style>
