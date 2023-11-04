<template>
  <div class="item">
    <!-- <div v-if="loading">Загрузка...</div> -->
    <div class="top-block flex">
      <div class="name">
        <div>
          <n-link :to="localePath(`/profile/${getLink(creator)}`)">
            <img :src="getAvatarUrl(creator)" /></n-link>
        </div>
        <div>
          <span>{{ creator.name }}</span>
            @{{ creator.name }}
        </div>
      </div>
     <!-- <a href="#" @click.prevent.stop="isMenuShown = !isMenuShown" class="menu-invoker link">
        <transition :duration="200" name="fade">
          <ul v-show="isMenuShown">
            <li v-for="opt in menuOptionsToShow" :key="opt.id" @click.prevent="handleMenuClick(opt.id)">
              {{ opt.name }}
            </li>
          </ul>
        </transition>
      </a>-->
    </div>
    <client-only>
      <div v-swiper:mediaSwiper="swiperOptions" class="slider">
        <div class="swiper-wrapper">
          <div v-for="(attachment, index) in attachments" :key="index" class="swiper-slide slide"
            :class="{ lock: !isSubscribed && !post.isPublic && !mine }">
            <img v-if="attachment.type === 'image'" :src="createMediaUrl(attachment.filename)" v-lazy-load @click="openImageInPopup(attachment.filename)"/>
            <video controls v-if="attachment.type === 'video'" :src="createMediaUrl(attachment.filename)" v-lazy-load/>
            <!-- <a v-if="attachment.type === 'video'" href="#" class="play"></a> -->
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
      <div v-if="showImagePopup" class="image-popup" @click="showImagePopup = false">
      <div class="close-icon"></div>
      <img :src="selectedImage" alt="Popup Image"/>
    </div>
    </client-only>
    <div class="text">
      <div class="counts">
        <like-button :obj="post" :key="post._id" />
        <!-- <a href="#">45</a> -->
        <n-link :to="localePath(`/profile/${getLink(creator)}/post/${post._id}`)">{{ compCommentsCount }}</n-link>
      </div>
      <p>
        {{
          post.isPublic || isSubscribed || mine
          ? post.description
          : $t("post.thisIsPrivatePost")
        }}
      </p>
      <div class="date">
        {{ $d(new Date(post.createdAt), "short") }}
        <!-- {{ $dayjs(post.createdAt).format("DD.MM.YYYY") }} -->
      </div>
      <button @click.prevent="showSubscribePopup" v-if="!isSubscribed && !post.isPublic && !mine && !amIGirl">
        {{ $t("post.subscribeToSee") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import SubscribePopup from "@/components/modals/SubscribePopup.vue";
import CommentsButton from "../../ui/CommentsButton.vue";
import LikeButton from "../../ui/LikeButton.vue";
import ConfirmPopup from "@/components/modals/ConfirmPopup.vue";
export default {
  components: { LikeButton, CommentsButton },
  name: "Post",
  props: {
    p: {
      type: Object,
      required: true,
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
      post: {},
      showImagePopup: false,
      selectedImage: '',
      commentsCount: 0,
      loading: false,
      menuOptions: [
        {
          name: this.$t("post.menuView"),
          id: "view",
        },
        {
          name: this.$t("post.menuEdit"),
          id: "edit",
          mine: true,
        },
        {
          name: this.$t("post.menuDelete"),
          id: "delete",
          mine: true,
        },
      ],
      isMenuShown: false,
    };
  },
  methods: {
    ...mapActions("post", ["getPost", "deletePost"]),
    openImageInPopup(filename) {
      console.log(filename)
      this.selectedImage = this.createMediaUrl(filename);
      this.showImagePopup = true;
    },
    async confirmDeletePost(post) {
      const that = this;
      this.$vfm.show({
        component: ConfirmPopup,
        bind: { message: that.$t("post.deleteConfirm") },
        on: {
          async confirm(close) {
            const response = await that.deletePost(post);
            if (response && response.data) {
              that.$notify.success({
                message: that.$t("post.notifications.postDeleted"),
              });
              that.goTo(
                that.localePath(`/profile/${that.getLink(that.author)}`)
              );
            } else {
              that.$notify.error({
                message: response.message,
              });
            }
            close();
          },
          cancel(close) {
            close();
          },
        },
      });
    },
    async getCommentsCount() {
      try {
        const { data } = await this.$api.get(
          "/comments/count/post/" + this.p._id
        );
        this.commentsCount = data.count;
      } catch (error) {
        console.log("Can't load comments count");
      }
    },
    createMediaUrl(filename) {
      if (filename) {
        return `${this.publicUrl}/media/${filename}`;
      } else {
        return require("~/assets/img/photo6.png");
      }
    },
    showSubscribePopup() {
      if (!this.auth) {
        this.$notify.info({
          message: this.$t("post.notifications.youShouldLogIn"),
        });
        return false;
      }
      if (this.user && this.user.role !== "user") {
        this.$notify.info({
          message: this.$t("post.notifications.onlyFansCouldSubscribe"),
        });
        return false;
      }
      this.$vfm.show({
        component: SubscribePopup,
        bind: { id: this.post.userId._id },
      });
    },
    handleMenuClick(id) {
      if (id === "view")
        this.goTo(
          this.localePath(
            `/profile/${this.getLink(this.post.userId)}/post/${this.p._id}`
          )
        );
      if (id === "edit")
        this.goTo(
          this.localePath(
            `/profile/${this.getLink(this.post.userId)}/post/${this.p._id}/edit`
          )
        );
      if (id === "delete") this.confirmDeletePost(this.p);
    },
  },
  watch: {
    async isSubscribed() {
      if (!this.post.isPublic) {
        this.loading = true;
        try {
          const post = await this.getPost(this.post._id);
          this.post = post;
        } catch (error) {
          this.$notify.error({
            message: this.$t("post.notifications.cantLoadPost"),
          });
        }
        this.loading = false;
      }
    },
    p() {
      this.post = this.p;
    },
  },
  computed: {
    ...mapState("post", ["author"]),
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["auth"]),
    ...mapGetters("subscribe", ["isActiveSubscription"]),
    ...mapState("comment", ["totalDocs"]),
    compCommentsCount() {
      if (!this.totalDocs) return this.commentsCount;
      return this.totalDocs;
    },
    isSubscribed() {
      return this.isActiveSubscription(this.author._id);
    },
    mine() {
      return this.author && this.user && this.author._id === this.user._id;
    },
    amIGirl() {
      return this.user && this.user.role === "girl";
    },
    isGirl() {
      return this.author && this.author.role === "girl";
    },
    publicUrl() {
      return process.env.PUBLIC_URL;
    },
    attachments() {
      const ret = [];
      this.post.images.forEach((im) => {
        im.type = "image";
        ret.push(im);
      });
      this.post.videos.forEach((vid) => {
        vid.type = "video";
        ret.push(vid);
      });
      return ret;
    },
    creator() {
      return this.post.userId;
    },
    menuOptionsToShow() {
      return this.menuOptions.filter((m) => {
        return !m.mine || this.mine;
      });
    },
  },
  created() {
    this.post = this.p;
    this.getCommentsCount();
  },
};
</script>

<style lang="scss" scoped>

.image-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-image: url('./../../../assets/svg/close.svg');
  background-size: contain;
  background-repeat: no-repeat;
}

.image-popup img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}

.name {
  div {
    width: 80px;
    height: 80px;
    padding-right: 10px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}

.slide {
  video {
    width: 100%;
  }
}

.menu-invoker {
  position: relative;

  ul {
    width: 120px;
    position: absolute;
    top: 100%;
    right: -10px;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 15px 0 rgb(170, 177, 194);
    border: 1px solid rgba(199, 202, 247, 0.2);
    padding: 0 16px;
    z-index: 100;

    &::after {
      content: "";
      position: absolute;
      top: -8px;
      right: 18px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 8px solid #fff;
    }

    li {
      cursor: pointer;
      padding: 16px 0;
      display: flex;
      align-items: center;
      font-size: 16px;
      line-height: 24px;
      font-weight: 500;
      color: #2a3041;
      border-bottom: 1px solid rgba(199, 202, 247, 0.4);
    }
  }
}
</style>
