<template>
  <div class="posts-page">
    <div class="wrap small flex">
      <div class="list">
        <div class="top-info">
          <div class="top-links">
            <!-- <a href="#"></a> -->
            <a
              v-show="user && !mine"
              @click.prevent="!isLikeF ? addFavoriteF() : deleteFavoriteF()"
              href="#"
              :class="{ fav: isLikeF, notfav: !isLikeF }"
            >
              <!-- <img v-show="!isLikeF" src="@/assets/img/posts-link1.svg" /> -->
              <!-- <img v-show="isLikeF" src="@/assets/svg/profile-heart-fill.svg" /> -->
            </a>
            <a
              ref="proflink"
              @click.prevent="doCopy($refs.proflink.href)"
              :href="localePath(`/profile/${getLink(author)}`)"
            ></a>
            <n-link v-if="mine" :to="localePath(`/Settings/Personal`)" class="editprofile"></n-link>
          </div>
          <div class="name">
            <span class="username">{{ author.name }}</span>
            <span class="userage">
              {{
                $tc("profileBody.userAge", author.realAge)
              }}
            </span>
            <span class="itsyou" v-if="mine">
              {{
                $t("profileBody.itsYou")
              }}
            </span>
            <!-- <button
              @click.prevent="showSubscribePopup"
              v-if="
                isGirl &&
                user &&
                user.role !== 'girl' &&
                author.subscriptionEnabled
              "
            >
              {{
                isActiveSubscription(author._id)
                  ? $t("profileBody.subscribeButtonProlong")
                  : $t("profileBody.subscribeButtonSub")
              }}
            </button>-->
          </div>
          <div class="insta">
            <n-link :to="localePath(`/profile/${getLink(author)}`)">@{{ getLink(author) }}</n-link>
            <!-- была 17 минут назад -->
          </div>
          <div v-if="isGirl" class="count">
            {{ $tc("profileBody.totalPosts", totalPosts || 0) }}
            &bull;
            {{
              $tc("profileBody.favouritesCount", author.favouritesCount || 0)
            }}
          </div>
          <div v-if="isGirl && isAuthorBlocked" class="count blocked">
            <div>{{ $t("profileBody.userBlocked") }}</div>
          </div>
          <p v-if="author.description">
            {{ author.description }}
            <!-- <a href="#"
              >Показать больше инфо <i class="fa fa-angle-right"></i
            ></a>-->
          </p>
          <!-- <div class="links">
            <a href="#">Фото</a>
            <a href="#">Видео</a>
            <a href="#">Голосовые</a>
          </div>-->
          <button
            v-if="isGirl"
            :disabled="mine || isAuthorBlocked"
            @click.prevent="auth ? goTo(localePath(`/dialoges?id=${author._id}`)) : showPleaseLoginPopup()"
          >{{ $t("profileBody.chatButton") }}</button>
          <div v-if="isGirl" class="price">
            <span>{{ toMoney(author.pricePerMessage) }}</span>
            HDC
            {{ $t("profileBody.perMessage") }}
          </div>
          <!-- <div class="price-swiper">
            <div v-swiper:mediaSwiper="swiperOptions" class="swiper1">
              <div class="swiper-wrapper">
                <div
                  v-if="isGirl && author.subscriptionEnabled"
                  class="price swiper-slide"
                  key="ppd"
                >
                  <span>{{ toMoney(author.pricePerDay) }}</span> HDC
                  {{ $t("profileBody.perMonth") }}
                </div>
                <div v-if="isGirl" class="price swiper-slide" key="ppm">
                  <span>{{ toMoney(author.pricePerMessage) }}</span> HDC
                  {{ $t("profileBody.perMessage") }}
                </div>
              </div>
            </div>
          </div>-->
        </div>
        <div v-if="author.bundles && author.bundles.length" class="bundles">
          <div v-swiper:bundlesSwiper="swiperOptionsBundles" class="swiper2">
            <div class="swiper-wrapper">
              <bundle
                class="swiper-slide"
                v-for="bundle in author.bundles"
                :key="bundle._id"
                :bundle="bundle"
              >
                <button
                  v-if="!amIGirl"
                  class="buy-bundle-btn"
                  @click.prevent="showBuyBundlePopup(bundle)"
                >{{ $t("profileBody.buyBundleButton") }}</button>
              </bundle>
            </div>
            <div class="swiper-pagination2"></div>
            <!-- <div class="swiper-button-next2"></div>
            <div class="swiper-button-prev2"></div>-->
          </div>
        </div>

        <posts v-if="isGirl" :item="author" />
      </div>
      <!-- <popular-widget /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import SubscribePopup from "@/components/modals/SubscribePopup.vue";
import BuyBundlePopup from "@/components/modals/BuyBundlePopup.vue";
import PleaseLoginPopup from "@/components/modals/PleaseLoginPopup.vue";
import Posts from "@/components/page-parts/posts/Posts.vue";
import PopularWidget from "@/components/ui/PopularWidget.vue";
import Bundle from "../../bundles/Bundle.vue";
import dayjs from "dayjs";

export default {
  name: "ProfileBody",
  components: { SubscribePopup, Posts, PopularWidget, Bundle },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination1",
        },
        loop: true,
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next1",
          prevEl: ".swiper-button-prev1",
        },
        autoplay: {
          delay: 3000,
        },
        // Some Swiper option/callback...
      },
      swiperOptionsBundles: {
        pagination: {
          el: ".swiper-pagination2",
          clickable: true,
        },
        // loop: true,
        // preventClicks: false,
        // preventClicksPropagation: false,
        slidesPerView: 1,
        // slidesPerView: "auto",
        // direction: "vertical",
        // height: 50,
        // navigation: {
        //   nextEl: ".swiper-button-next2",
        //   prevEl: ".swiper-button-prev2",
        // },
        // effect: "fade",
        // fadeEffect: {
        //   crossFade: true,
        // },
        // effect: "coverflow",
        // coverflowEffect: {
        //   rotate: 30,
        //   slideShadows: false,
        // },
        // effect: "flip",
        // flipEffect: {
        //   slideShadows: false,
        // },
        // Responsive breakpoints
        breakpoints: {
          // when window width is >= 640px
          743: {
            slidesPerView: 2,
          },
        },
        autoplay: {
          delay: 5000,
          pauseOnMouseEnter: true,
        },
        // freeMode: {
        //   enabled: true,
        //   sticky: true,
        // },
        // Some Swiper option/callback...
      },
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("post", ["author", "totalDocsOpen", "totalDocsClosed"]),
    ...mapGetters("user", ["auth"]),
    ...mapGetters("subscribe", ["isActiveSubscription"]),
    ...mapGetters("favorites", ["isLike", "getFavoriteId"]),
    mine() {
      return this.author && this.user && this.author._id === this.user._id;
    },
    isGirl() {
      return this.author && this.author.role === "girl";
    },
    isLikeF() {
      return this.isLike(this.author._id);
    },
    totalPosts() {
      return (
        (parseInt(this.totalDocsOpen) || 0) +
        (parseInt(this.totalDocsClosed) || 0)
      );
    },
    amIGirl() {
      return this.user && this.user.role === "girl";
    },
    isAuthorBlocked() {
      return this.isBlocked(this.author);
    },
  },
  methods: {
    ...mapActions("favorites", ["addFavorite", "deleteFavorite"]),
    showSubscribePopup() {
      if (!this.auth) {
        this.$notify.info({
          message: this.$t("profileBody.notifications.youShouldLogIn"),
        });
        return false;
      }
      if (this.user && this.user.role !== "user") {
        this.$notify.info({
          message: this.$t("profileBody.notifications.onlyFansCouldSubscribe"),
        });
        return false;
      }
      this.$vfm.show({
        component: SubscribePopup,
        bind: { id: this.author._id },
      });
    },
    showPleaseLoginPopup() {
      const that = this;
      this.$vfm.show({
        component: PleaseLoginPopup,
        bind: { message: "" },
        on: {
          confirm(close) {
            that.changeModal('signIn', true)
            close();
          },
          cancel(close) {
            close();
          },
        },
      });
    },
    showBuyBundlePopup(bundle) {
      if (!this.auth) {
        this.$notify.info({
          message: this.$t("profileBody.notifications.youShouldLogIn"),
        });
        return false;
      }
      if (this.user && this.user.role !== "user") {
        this.$notify.info({
          message: this.$t("profileBody.notifications.onlyFansCouldBuyBundle"),
        });
        return false;
      }
      this.$vfm.show({
        component: BuyBundlePopup,
        bind: { id: this.author._id, bundle },
      });
    },
    // Добавление модели в избранное
    async addFavoriteF() {
      if (!this.auth) {
        this.$notify.info({
          message: this.$t("profileBody.notifications.youShouldLogIn"),
        });
        return false;
      }
      //if (this.user && this.user.role !== "user") {
      //  this.$notify.info({
      //    message: this.$t("profileBody.notifications.onlyFansCouldAddToFav"),
      //  });
      //  return false;
      //}
      if (this.isLikeF) {
        this.$notify.success({
          message: this.$t("profileBody.notifications.alreadyInFav"),
        });
        return false;
      }
      const response = await this.addFavorite({
        modelId: this.author._id,
      });
      if (response && response.type === "error") {
        this.$notify.error({
          title: this.$t("profileBody.notifications.errorTitle"),
          message: this.$t("profileBody.notifications.errorAddingToFav"),
        });
        return false;
      }
      this.$notify.success({
        message: this.$t("profileBody.notifications.successAddingToFav"),
      });
    },
    // Удаление модели из избранного
    async deleteFavoriteF() {
      if (!this.auth || (this.user && this.user.role !== "user")) {
        return false;
      }
      const response = await this.deleteFavorite({
        id: this.getFavoriteId(this.author._id),
      });
      if (response && response.type === "error") {
        this.$notify.error({
          title: this.$t("profileBody.notifications.errorTitle"),
          message: this.$t("profileBody.notifications.errorRemovingFromFav"),
        });
        return false;
      }
      this.$notify.success({
        message: this.$t("profileBody.notifications.successRemovingFromFav"),
      });
    },
    doCopy(val) {
      if (!val.trim()) return;
      this.$copyText(val).then(
        (e) => {
          this.$notify.success({
            message: `${val} ${this.$t(
              "profileBody.notifications.copySuccess"
            )}`,
          });
        },
        (e) => {
          this.$notify.error({
            message: this.$t("profileBody.notifications.copyFail"),
          });
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.blocked {
  background: #e46974;
  color: #fff !important;
  display: flex;
  justify-content: center;
  padding: 10px 20px 10px 20px;
  border-radius: 20px;
}
.editprofile {
  display: inline-block;
  width: 48px;
  height: 48px;
  margin-right: 15px;
  background: url("~assets/img/edit1.svg");
}
.list {
  width: 100%;
}
.fav {
  background: url("~assets/img/posts-link3.svg") !important;
}
.notfav {
  background: url("~assets/img/posts-link1.svg") !important;
}
.name {
  span.itsyou {
    font-size: 1rem;
    font-weight: 300;
    color: gray;
  }
  span.userage {
    font-size: 0.5em;
    opacity: 0.7;
  }
}
.price-swiper {
  width: 300px;
  display: inline-block;
  vertical-align: middle;
}
.bundles {
  margin-top: 1rem;
}
.swiper-pagination2 {
  text-align: center;
  padding: 24px 0 48px;
}
// .buy-bundle-btn {
//   width: 100% !important;
//   height: 50px !important;
// }
</style>
