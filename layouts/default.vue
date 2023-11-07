<template>
  <div id="app">
    <the-header />

    <!-- <transition name="slide-left" mode="out-in"> -->
    
    <nuxt/>
    <!-- </transition> -->
    <the-footer />
    <modals-container></modals-container>
    <transition name="fade" mode="out-in">
      <sign-in v-if="signIn.box" />
      <sign-up v-if="signUp.box" />
      <forgot-password v-if="forgotPassword.box" />
      <recover-password v-if="recoverPassword.box" />
    </transition>
    <CookieControl :locale="$i18n.locale">
      <template v-slot:bar>
        <h3>{{ $cookies.text.barTitle }}</h3>
        <p>{{ $cookies.text.barDescription }}</p>
        <p>
          <n-link style="color:#fff" :to="localePath('/privacy')">{{
            $t("footer.privacyPolicy")
          }}</n-link>
          <n-link style="color:#fff" :to="localePath('/Terms')">{{
            $t("footer.rules")
          }}</n-link>
        </p>
      </template>
    </CookieControl>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import TheHeader from "@/components/layout/TheHeader";
import TheFooter from "@/components/layout/TheFooter";

export default {
  name: "DefaultLayout",
  components: {
    TheHeader,
    TheFooter,
    SignIn: () => import("@/components/modals/SignIn"),
    SignUp: () => import("@/components/modals/SignUp"),
    ForgotPassword: () => import("@/components/modals/ForgotPassword"),
    RecoverPassword: () => import("@/components/modals/RecoverPassword"),
  },
  data() {
    return {
      imageplaceholder: require(`@/assets/img/item-heymaty.svg`),
      defaultCover: require(`@/assets/img/index-first-block.png`),
      defaultGirl: require(`@/assets/img/item.png`),
      defaultMan: require(`@/assets/img/man.png`),
    };
  },
  computed: {
    ...mapState("layout", [
      "signIn",
      "signUp",
      "forgotPassword",
      "recoverPassword",
    ]),
    ...mapState("user", ["user"]),
    ...mapState("subscribe", ["subscribers"]),
  },
  mounted() {
    const { reset, verify, code, confirmEmail } = this.$route.query;
    if (reset !== undefined) {
      this.changeModal("recoverPassword", true);
    }
    if (verify !== undefined) {
      this.verifyProfile({
        id: code,
      });
    }
    if (confirmEmail !== undefined) {
      this.confirmEmail({
        id: code,
      });
    }
    //preloading placeholder images
    const preimage = new Image();
    preimage.src = this.imageplaceholder;
    const lazyimage = new Image();
    lazyimage.src = "/item-heymaty.svg";
    //end of preloading
    this.$root.defaultGirl = this.defaultGirl;
    this.$root.defaultMan = this.defaultMan;
    this.$root.defaultCover = this.defaultCover;
    this.$root.defaultImage = this.imageplaceholder;
    this.$root.socket = this.$nuxtSocket({
      name: "messages",
      persist: "messages",
    });
    this.$root.socket.on("newSubscription", (userId) => {
      if (this.user.role === "girl") {
        this.$notify.success({
          message: `У Вас новый подписчик!`,
        });
      }
    });
    if (this.user) this.requestMessages(this.user._id);
  },
  watch: {
    user(curr, prev) {
      if (!prev && curr) {
        this.requestMessages(this.user._id);
        this.getAllMyLikes();
        if (this.user.role === "user") this.getMySubscriptions();
        if (this.user.role === "girl") this.getMySubscribers();
        return;
      }
      if (!curr && prev) {
        this.resetMessages();
        this.resetAllSubs();
        this.resetAllMyLikes();
        return;
      }
    },
  },
  methods: {
    ...mapActions("user", ["verifyProfile", "confirmEmail"]),
    ...mapActions("messages", ["resetMessages"]),
    ...mapActions("subscribe", [
      "getMySubscriptions",
      "getMySubscribers",
      "resetAllSubs",
    ]),
    ...mapActions("like", ["getAllMyLikes", "resetAllMyLikes"]),
    async requestMessages(id) {
      await this.$store.dispatch(
        "$nuxtSocket/emit", // Remember, "emit" is namespaced to "$nuxtSocket"
        {
          label: "messages", // Use persisted socket "messages"
          evt: "userDetails",
          msg: {
            fromUser: id,
            // fromUser: "60eb10ffdea436547cdbe9c6",
            // toUser: "60eb0cdbdea436547cdbe9c4",
          },
          emitTimeout: 3000,
        }
      );
    },
  },
};
</script>

<style lang="scss">
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
#__nuxt {
  height: 100%;
  padding: 110px 0;
}
#__layout {
  height: 100%;
}
.footer {
  margin-top: auto;
}

@media (max-width: 767px) {
  #__nuxt {
  height: 100%;
  padding: 80px 0;
}
}
// .cookieControl__BarButtons {
//   button:nth-child(1) {
//     display: none;
//   }
// }
</style>
