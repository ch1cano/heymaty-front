<template>
  <div>
    <div class="wrap">
      <div class="profile-page">
        <div v-if="mine" class="ballanse">
          <p>Баланс</p>
          <div class="price">
            <span>{{ $funcs.priceFormat(author.balance || 0) }}</span>
          </div>
          <button @click="activeNav = 5">Вывести</button>
          <div class="link">
            <a @click.prevent="activeNav = 5" href="#"> История баланса </a>
          </div>
        </div>
        <div v-else class="top-links">
          <a
            v-if="!mine && author.role !== 'user'"
            @click.prevent="!isLikeF ? addFavoriteF() : deleteFavoriteF()"
            href="#"
          >
            <img
              v-show="!isLikeF"
              src="@/assets/svg/profile-heart-stroke.svg"
            />
            <img v-show="isLikeF" src="@/assets/svg/profile-heart-fill.svg" />
            <span> Нравится </span>
          </a>
          <a
            href="#"
            @click.prevent="goTo(localePath(`/dialoges?id=${author._id}`))"
          >
            <img src="@/assets/svg/profile-icon2.svg" />
            <span> Сообщение </span>
          </a>
        </div>

        <div class="flex">
          <div class="photo">
            <div class="name">
              {{ author.name }}, {{ author.age }}
              {{ $funcs.decOfNum(author.age, ["год", "года", "лет"]) }}
              <i v-if="online" />
            </div>
            <div :class="{ 'change-image': mine }" class="image">
              <label v-if="mine" for="uploadAvatar">
                <input
                  id="uploadAvatar"
                  @change="uploadAvatar"
                  type="file"
                  accept="image/*"
                />
                Изменить аватар
              </label>
              <img :src="profileAvatar" />
              <div v-if="!mine" class="links">
                <a
                  v-show="author.role !== 'user'"
                  @click.prevent="addFavoriteF()"
                  href="#"
                />
                <a
                  @click.prevent="
                    goTo(localePath(`/dialoges?id=${author._id}`))
                  "
                  href="#"
                />
              </div>
            </div>
          </div>

          <div :class="{ mine: mine }" class="info">
            <div class="name">
              {{ author.name }}, {{ author.age }}
              {{ $funcs.decOfNum(author.age, ["год", "года", "лет"]) }}
              <i v-if="online" />
            </div>
            <p>
              {{ author.description }}
            </p>
            <div class="tags" />

            <div v-if="!mine && author.role !== 'user'" class="price">
              <button @click.prevent="showSubscribePopup">
                {{ isActiveSubscription ? "Продлить" : "Подписаться" }}
              </button>
              <span>{{ author.pricePerDay }}</span> в сутки
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PostPage",
  components: {},
  async asyncData({ store, route, redirect, error }) {
    if (!route.params.id) {
      redirect("/");
    }
    const post = await store.dispatch("model/getPost", { id: route.params.id });
    if (!post || (post && post.type === "error")) {
      error({ statusCode: 404, message: "Пост не найден" });
    }

    let mine = false;
    let author = null;
    if (
      store.state.user.user &&
      store.state.user.user._id === post.post.userId._id
    ) {
      mine = true;
      author = store.state.user.user;
    }

    let isActiveSubscription = false;
    if (!mine) {
      isActiveSubscription = store.getters["subscribe/isActiveSubscription"](
        post.post.userId._id
      );
      author = await store.dispatch("user/getUserById", {
        id: post.post.userId._id,
      });
    }
    // if (
    //   store.state.user.user &&
    //   store.state.user.user._id === route.params.id
    // ) {
    //   redirect("/");
    // }
    return { post: post.post, mine, isActiveSubscription, author };
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    profileAvatar() {
      if (this.mine && this.author.profile.path) {
        return `/${this.author.profile.path}`;
      } else if (
        this.author &&
        this.author.profile &&
        this.author.profile.path
      ) {
        return `/${this.author.profile.path}`;
      }
      return this.author.role === "user"
        ? require("@/assets/img/item-heymaty.svg")
        : require("@/assets/img/item-heymaty.svg");
    },
  },
  mounted() {
    console.log(this.post, this.mine, this.isActiveSubscription);
  },
};
</script>
