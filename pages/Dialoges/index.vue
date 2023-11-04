<template>
  <div>
    <div class="page-top-name">
      <div class="wrap">
        <h1>{{ $t("dialoges.title") }}</h1>
      </div>
    </div>
    <div class="chat-page">
      <div class="wrap flex">
        <nav class="menu" :class="{ hidden: opened }">
          <div class="input">
            <input
              type="text"
              v-model="searchTerm"
              :placeholder="$t('dialoges.searchPlaceholder')"
            />
          </div>

          <chat-card
            v-for="resp in respondents"
            :id="resp.respid"
            :online="resp.responline"
            :messages="getRespMessages(resp.respid, searchTerm)"
            :newMessages="getRespNewMessages(resp.respid)"
            :key="resp.respid"
            @click.native="setCurrentChat(resp.respid)"
          />
        </nav>

        <chat-messages
          v-if="currentChat"
          :id="currentChat"
          :messages="getRespMessages(currentChat, searchTerm)"
          :opened="opened"
          :online="getRespOnline(currentChat)"
          @onSearch="onSearch"
          @onClose="opened = false"
        />

        <div v-else class="chat">
          <div class="with-who choose">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="88"
                height="88"
                fill="none"
              >
                <g transform="matrix(-1 0 0 1 88 0)">
                  <rect width="88" height="88" rx="44" fill="#fff" />
                  <rect
                    width="88"
                    height="88"
                    rx="44"
                    fill="#177de5"
                    fill-opacity=".04"
                  />
                </g>
                <g clip-path="url(#A)">
                  <path
                    fill-rule="evenodd"
                    d="M27.234 38.695c-1.733-1.537-.685-4.4 1.63-4.457l34.255-.83c1.187-.03 1.935 1.267 1.317 2.28L46.59 64.938c-1.206 1.977-4.21 1.452-4.675-.817l-.787-3.844c-.69-3.365-1.868-6.585-3.484-9.566l7.597-5.46-8.528 3.85c-1.773-2.9-3.973-5.522-6.542-7.8l-2.936-2.603zm2.077-1.767l2.65 2.35c2.344 2.08 4.403 4.43 6.14 6.993l12.566-5.137a.86.86 0 0 1 .851 1.475l-10.732 8.314a37.34 37.34 0 0 1 2.987 8.813l.7 3.47L60.985 36.16l-31.674.768z"
                    fill="#177de6"
                  />
                </g>
                <defs>
                  <clipPath id="A">
                    <path
                      fill="#fff"
                      transform="matrix(.866025 -.5 .5 .866025 11.1562 37.2153)"
                      d="M0 0h48v48H0z"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span>{{ $t("dialoges.chooseRespondent") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import ChatCard from "@/components/page-parts/dialoges/ChatCard";
import ChatMessages from "../../components/page-parts/dialoges/ChatMessages.vue";

export default {
  name: "PageDialoges",
  components: {
    ChatCard,
    ChatMessages,
  },
  data() {
    return {
      currentChat: null,
      searchTerm: "",
      opened: false,
    };
  },
  mounted() {
    if (this.$route.query && this.$route.query.id) {
      this.currentChat = this.$route.query.id;
      this.opened = true;
    }
    this.setChatHeight();
    window.addEventListener("resize", this.setChatHeight);
  },
  watch: {
    /* messages(val) {
      if (val.length > 0) {
        this.setChatHeight();
        window.addEventListener("resize", this.setChatHeight);
      }
    }, */
  },
  computed: {
    ...mapState("messages", ["respondents", "messages"]),
    ...mapGetters("messages", ["getRespMessages", "getRespNewMessages"]),
  },
  methods: {
    ...mapGetters("messages", ["getRespondents"]),
    getRespOnline(id) {
      const ind = this.respondents.findIndex((r) => r.respid === id);
      if (ind === -1) return false;
      return this.respondents[ind].responline;
    },
    onSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
    setCurrentChat(id) {
      this.currentChat = id;
      this.opened = true;
    },
    setChatHeight() {
      console.log("rezise");
      const headerHeight = document.querySelector(".header").offsetHeight;
      const height = Math.max(
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const chatHeight = height - headerHeight;
      document.querySelector(".chat-page").style.height = chatHeight + "px";
      /*  document.querySelector(".chat-page .wrap").style.height =
        chatHeight + "px"; */
    },
    // sendMessage() {
    // eslint-disable-next-line standard/object-curly-even-spacing
    // this.socket.emit("chatMessage", {
    //   from: "60eb10ffdea436547cdbe9c6",
    //   to: "60eb0cdbdea436547cdbe9c4",
    //   message: "Hey!",
    // });
    // },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setChatHeight);
  },
};
</script>

<style lang="scss">
.chat-page {
  box-sizing: border-box;
  padding-bottom: 30px !important;
  @media only screen and (max-width: 850px) {
    padding-bottom: 0px !important;
  }
  .wrap {
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    @media only screen and (max-width: 991px) {
      width: 100%;
    }
  }
  .menu {
    height: 100%;
    overflow: auto;
    border-bottom-left-radius: 24px;
    @media only screen and (max-width: 850px) {
      border-bottom-left-radius: 0;
    }
  }
  .chat {
    height: 100%;
    display: flex !important;
    flex-direction: column;
    .with-who.choose {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #d5dbe7;
      border-bottom-right-radius: 24px;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        svg {
          margin-bottom: 5px;
        }
      }
    }
    .messages {
      min-height: none !important;
      max-height: none !important;
    }
    form {
      margin-top: auto;
    }
  }
}
</style>
