<template>
  <div>
    <Loader v-if="publicPostsLoading" />

    <div v-if="!publicPostsLoading">
      <template>
        <div class="wrapper">
          <Tabs />
          <div class="wrap_ganeral">
            <div class="content">
              <div>
                <div class="favorites_title">
                  <p>Made for you</p>
                </div>
                <div v-if="openPosts.length <= 0" class="entryPosts">
                  <p>Oh, your matys have no posts yet Keep tuning!</p>
                </div>
                <NoMatys v-if="favorites.length <= 0" />
                <div v-if="openPosts.length > 0" class="post-wrapper">
                  <Post
                    v-for="item in openPosts"
                    :key="item.id"
                    :images="item.images"
                    :name="item.name"
                    :description="item.description"
                    :createdAt="item.createdAt"
                    :isPublic="item.isPublic"
                    :avatar="item.path"
                  />
                </div>
              </div>
            </div>
            <div class="suggestions_1">
              <div class="suggestions_2">
                <p>Suggestions</p>
              </div>
              <div class="cards">
                <div class="card">
                  <div class="card_header">
                    <div class="card_com">
                      <button class="card_btn">
                        <img alt="com" src="../../assets/svg/cardcom.svg" />
                      </button>
                    </div>
                    <div class="card_like">
                      <button class="card_btn">
                        <img alt="like" src="../../assets/svg/cardlike.svg" />
                      </button>
                    </div>
                  </div>
                  <div class="card_info">
                    <div class="card_img">
                      <img alt="com" src="../../assets/img/avatar.png" />
                    </div>
                    <div class="card_name">
                      <p>jane stark, 20</p>
                    </div>
                    <div class="card_local">
                      <p class="card_localitem">
                        <img alt="#" src="../../assets/svg/loca.svg" /> Paris,
                        France
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="card_1"></div>
							<div class="card_1"></div>
							<div class="card_1"></div> -->
            </div>
          </div>
        </div>
      </template>
      {{ data }}
    </div>
  </div>
</template>

<script>
import Loader from "../../components/LoaderFavorites/Loader.vue";
import NoMatys from "../../pages/NoMatys";
import Post from "../../components/page-parts/post";
import { mapState } from "vuex";
import GirlCard from "@/components/page-parts/index/GirlCard";
import Tabs from "../../components/page-parts/tab";

export default {
  name: "PageFeed",
  components: {
    Loader,
    GirlCard,
    Post,
    NoMatys,
    Tabs,
  },

  data() {
    return {
      isLoading: true,
      items: [],
    };
  },

  async asyncData({ store, route }) {
    const response = await store.dispatch("favorites/getMyFavorites");

    await store.dispatch("post/resetPosts", null, { root: true });

    const posts = await store.dispatch("post/getAllPublicPosts", null, {
      root: true,
    });

    console.log("posts", posts);

    console.log("response", response);

    return response;
  },

  async mounted() {
    this.loadData();

    await this.$store.dispatch("post/resetPosts", null, { root: true });
    await this.$store.dispatch("post/getAllPublicPosts", null, { root: true });
  },
  methods: {
    async asyncData() {
      await store.dispatch("favorites/getMyFavorites");
    },

    async loadData() {
      this.isLoading = false;
    },
  },
  computed: {
    ...mapState("post", ["pageOpen", "openPosts", "publicPostsLoading"]),
    ...mapState("favorites", ["favorites"]),

    isChildShown() {
      return !!this.$route.params.postid;
    },
    isFavoritesNoPosts() {
      return (
        !this.publicPostsLoading &&
        this.favorites.length > 0 &&
        this.openPosts.length === 0
      );
    },
    isNotHaveFavorites() {
      return !this.publicPostsLoading && this.openPosts.length === 0;
    },
    isLoading() {
      return !this.publicPostsLoading && !this.openPosts;
    },
  },
};
</script>

<style>
.entryPosts {
  color: var(--grayscale-black, #161718);
  text-align: center;
  font-family: Nunito Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  margin: auto;
}
.wrapper {
  max-width: 1148px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.wrap_ganeral {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
}

.content {
  max-width: 750px;
  width: 100%;
}

.favorites_title {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 12px;
}

.suggestions_1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80dvh;
}

.suggestions_1 p {
  width: 343px;
}
.suggestions_2 {
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.5px;
}

.card {
  position: relative;
  max-width: 343px;
  /* height: 100%; */
  padding: 15px;
  border-radius: 20px;
  margin-top: 8px;
  z-index: 0;
}
.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(../../assets/img/girl.png);
  background-position: center;
  filter: blur(3px);
  border-radius: 20px;
  z-index: -1; /* Устанавливаем z-index ниже основного содержимого карточки */
}
.card_header {
  display: flex;
  justify-content: space-between;
  z-index: 100;
}
.card_btn {
  border-radius: 12px;
  background: var(--effects-gray-20, rgba(126, 125, 125, 0.001));
  backdrop-filter: blur(18.5px);
}

.card_info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.card_name {
  color: var(--grayscale-white, #fff);
  text-align: center;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.5px;
}
.card_local {
  margin-top: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--grayscale-light-gray, #e1e1e1);
  font-size: 14px;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.5px;
}

.card_localitem {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
