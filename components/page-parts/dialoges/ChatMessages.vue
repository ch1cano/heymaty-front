<template>
  <div class="chat" :class="{ opened: opened }">
    <div class="with-who">
      <div>
        <img style="max-height: 70px" :src="getAvatarUrl(item)" class="rounded" />
      </div>
      <div v-if="user && user.role === 'user'">
        <span>
          {{ item.name }},
          {{ $tc("chatMessages.userAge", item.realAge) }}
          <!-- {{ item.age }} лет  -->
          <i v-if="online" />
        </span>
        <div v-if="canChat">
          <p v-if="messagesInBundleCount">
            {{
              $t("chatMessages.youSpentBundle", {
                messages: messagesInBundleCount,
              })
            }}
          </p>
          <p v-else>
            {{
              $t("chatMessages.youSpentBalance", {
                pricePerMessage: toMoney(item.pricePerMessage),
                balance: toMoney(user.balance),
              })
            }}
          </p>
        </div>
        <div v-else>
          <template v-if="!isOtherBlocked">
            {{ $t("chatMessages.notEnoughFunds") }}
            <n-link :to="localePath('/Settings/Balance')">
              {{
                $t("chatMessages.recharge")
              }}
            </n-link>
            {{ $t("chatMessages.orWord") }}
            <n-link :to="localePath(`/profile/${getLink(item)}`)">
              {{
                $t("chatMessages.buyBundle")
              }}
            </n-link>
          </template>
          <template v-else>{{ $t("chatMessages.userBlocked") }}</template>
        </div>
      </div>
      <div class="donate-button" v-if="canChat && user && user.role === 'user'">
        <button @click.prevent="handleDonatePopup">{{ $t("chatMessages.donateButton") }}</button>
      </div>
      <div v-if="user && user.role === 'girl'">
        <span>
          {{ item.name }},
          {{ $tc("chatMessages.userAge", item.realAge) }}
          <!-- {{ item.age }} лет  -->
          <i />
        </span>
      </div>
    </div>
    <div v-if="user && user.role === 'user'" class="back-link">
      <a href="#" class="link" @click="$emit('onClose')" />
      <img :src="getAvatarUrl(item)" class="avatar rounded" />
      <span>{{ item.name }}, {{ $tc("chatMessages.userAge", item.realAge) }}</span>
      <div v-if="canChat">
        <p v-if="messagesInBundleCount">
          {{
            $t("chatMessages.youSpentBundle", {
              messages: messagesInBundleCount,
            })
          }}
        </p>
        <p v-else>
          {{
            $t("chatMessages.youSpentBalance", {
              pricePerMessage: toMoney(item.pricePerMessage),
              balance: toMoney(user.balance),
            })
          }}
        </p>
      </div>
      <div v-else>
        <p v-if="!isOtherBlocked">
          {{ $t("chatMessages.notEnoughFunds") }}
          <n-link :to="localePath('/Settings/Balance')">
            {{
              $t("chatMessages.recharge")
            }}
          </n-link>
          {{ $t("chatMessages.orWord") }}
          <n-link :to="localePath(`/profile/${getLink(item)}`)">
            {{
              $t("chatMessages.buyBundle")
            }}
          </n-link>
        </p>
        <p v-else>{{ $t("chatMessages.userBlocked") }}</p>
      </div>
      <div class="donate-button" v-if="canChat && user && user.role === 'user'">
        <button @click.prevent="handleDonatePopup">{{ $t("chatMessages.donateButton") }}</button>
      </div>
    </div>
    <div v-if="user && user.role === 'girl'" class="back-link">
      <a href="#" class="link" @click="$emit('onClose')" />
      <img :src="getAvatarUrl(item)" class="avatar rounded" />
      <span>{{ item.name }}, {{ $tc("chatMessages.userAge", item.realAge) }}</span>
    </div>

    <div class="input">
      <input type="text" v-model="searchTerm" :placeholder="$t('chatMessages.searchPlaceholder')" />
    </div>

    <div class="messages" ref="messages">
      <div
        v-for="messageDay in formattedMessages"
        :key="messageDay.date"
        :id="'md' + messageDay.date.replaceAll('.', '')"
      >
        <div class="date">{{ messageDay.date }}</div>
        <chat-message
          v-for="message in messageDay.messages"
          :key="message._id"
          :id="'message' + message._id"
          class="item"
          :class="{ other: message.other }"
          :message="message"
          :me="user"
          :notme="item"
        />
      </div>
      <span id="thebottom" ref="thebottom"></span>
    </div>
    <form class="newmessageform" autocomplete="off" v-if="canChat">
      <!-- <input type="text" placeholder="Заголовок" /> -->
      <span v-for="(item, i) in messageImages" :key="i" class="preview">
        <img v-if="item.ready" :src="item.src" />
        <span style="position: relative; display: inline-block" v-else>
          <img :src="previewplaceholder" />
          <span style="position: absolute; top: 25px; left: 25px">{{ item.progress }}%</span>
        </span>

        <a @click.prevent="removePreview(i)">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" fill="#E9E9E9" stroke="white" />
            <path
              d="M20 10L9 21M20 21L9 10L20 21Z"
              stroke="#353535"
              stroke-width="1.375"
              stroke-linecap="round"
            />
          </svg>
        </a>
      </span>
      <div class="textareacont">
        <emoji-selector @emoji="insertEmoji" style="right:60px" />
        <label for="uploadPost" class="uploadlabel">
          <input
            ref="fileinput"
            id="uploadPost"
            @change="uploadPost"
            type="file"
            multiple
            accept="image/*, video/*"
            class="uploadinput"
          />
          <svg
            class="uploadimg"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
          >
            <g clip-path="url(#mf-add-files)">
              <path
                d="M20.363 10.27v11.54c0 2.28-1.67 4.308-3.938 4.527-2.607.25-4.788-1.79-4.788-4.34V8.515c0-1.43 1.025-2.727 2.443-2.87a2.73 2.73 0 0 1 3.011 2.716v11.453c0 .6-.49 1.09-1.09 1.09s-1.09-.49-1.09-1.09V10.27c0-.447-.37-.818-.818-.818s-.818.37-.818.818v9.39c0 1.43 1.025 2.727 2.443 2.87 1.636.164 3.01-1.112 3.01-2.716V8.548c0-2.28-1.67-4.308-3.938-4.527C12.193 3.77 10 5.8 10 8.362v13.384c0 3.13 2.29 5.934 5.4 6.228C19 28.3 22 25.51 22 21.997V10.27c0-.447-.37-.818-.818-.818s-.818.37-.818.818z"
                fill="#a5a5a5"
              />
            </g>
            <defs>
              <clipPath id="mf-add-files">
                <path fill="#fff" transform="translate(4 4)" d="M0 0h24v24H0z" />
              </clipPath>
            </defs>
          </svg>
          <!--  <img src="@/assets/svg/btn5.svg" class="uploadimg" /> -->
        </label>
        <!--  <textarea-autosize
          v-model="messageText"
          @keyup.ctrl.enter.prevent="sendMessage"
          placeholder="Введите текст сообщения"
          :min-height="50"
          :max-height="350"
        />-->
        <input
          id="text"
          autocomplete="off"
          v-model="messageText"
          :placeholder="$t('chatMessages.enterYourMessagePlaceholder')"
        />
        <button @click.prevent="sendMessage">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
            <path
              class="inactive"
              fill-rule="evenodd"
              d="M8.79 6.214c-.488-1.465 1.07-2.77 2.427-2.03l20.054 10.94a1 1 0 0 1 0 1.756l-20.054 10.94c-1.355.74-2.915-.565-2.427-2.03l.827-2.482c.724-2.172 1.116-4.425 1.177-6.684L17 16l-6.207-.62c-.06-2.26-.453-4.512-1.177-6.684L8.79 6.214zm1.788-.328l.747 2.24c.66 1.982 1.065 4.026 1.213 6.084l8.967 1.223c.284.04.495.28.495.568s-.212.53-.495.567L12.537 17.8c-.148 2.058-.553 4.102-1.213 6.084l-.747 2.24L29.12 16 10.577 5.886z"
              fill="#a5a5a5"
            />
            <!-- <path
              class="active"
              d="M10.785 27.026L30.84 16.088a.1.1 0 0 0 0-.176L10.785 4.974c-.638-.348-1.372.266-1.142.955l.827 2.482a24 24 0 0 1 1.155 5.675l9.88 1.347c.284.04.495.28.495.568s-.212.53-.495.567l-9.88 1.347c-.154 1.92-.54 3.825-1.155 5.675l-.827 2.482c-.23.69.504 1.303 1.142.955z"
              fill="#177de6"
            ></path>-->
          </svg>
        </button>
      </div>
      <!-- <button>
        <img src="@/assets/svg/btn5.svg" />
        Прикрепить файл
      </button>-->
    </form>
    <div class="notsub" v-else>
      <div class="message" v-if="!isOtherBlocked">
        {{ $t("chatMessages.notEnoughFunds") }}
        <n-link :to="localePath('/Settings/Balance')">
          {{
            $t("chatMessages.recharge")
          }}
        </n-link>
        {{ $t("chatMessages.orWord") }}
        <n-link :to="localePath(`/profile/${getLink(item)}`)">
          {{
            $t("chatMessages.buyBundle")
          }}
        </n-link>
      </div>
      <div v-else>{{ $t("chatMessages.userBlocked") }}</div>
    </div>
    <transition name="fade-slide">
      <div v-show="showScrollToBottomButton" class="gotolast">
        <a href="#" @click.prevent="scrollToLast">V</a>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import ChatMessage from "./ChatMessage.vue";
import DonatePopup from "../../modals/DonatePopup.vue";
import dayjs from "dayjs";
import EmojiSelector from "../comments/EmojiSelector.vue";

export default {
  components: { ChatMessage, DonatePopup, EmojiSelector },
  name: "ChatMessages",
  data() {
    return {
      item: {},
      messageText: "",
      messageImages: [],
      socket: null,
      uploader: null,
      observer: null,
      showScrollToBottomButton: true,

      sendbutton: require(`@/assets/svg/textarea.svg`),
      videothumb: require(`@/assets/svg/play.svg`),
      // previewplaceholder: require(`@/assets/img/index-first-block2.png`),
      previewplaceholder: require(`@/assets/img/item-heymaty.svg`),
      searchTerm: "",
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    messages: {
      type: Array,
      default: () => [],
    },
    opened: {
      type: Boolean,
      default: false,
    },
    online: {
      type: Boolean,
      default: false,
    },
  },
  filters: {},
  computed: {
    ...mapState("user", ["user"]),
    formattedMessages() {
      const premess = this.messages.map((m) => {
        if (m.from !== this.id) m.other = true;
        m.date = dayjs(m.createdAt).format("DD.MM.YYYY");
        m.time = dayjs(m.createdAt).format("HH:mm");
        return m;
      });
      const retmess = [];
      premess.forEach((m) => {
        const ind = retmess.findIndex((mm) => mm.date === m.date);
        if (ind !== -1) {
          retmess[ind].messages.push(m);
        } else {
          retmess.push({
            date: m.date,
            messages: [m],
          });
        }
      });
      return retmess;
    },
    mesagesCount() {
      return this.messages.length;
    },
    messagesInBundleCount() {
      const bund = this.user.messageBundles.find(
        (mb) => mb.model === this.item._id
      );
      if (!bund) return;
      return bund["messages"];
    },
    isOtherBlocked() {
      return this.isBlocked(this.item);
    },
    canChat() {
      return (
        !this.isOtherBlocked &&
        (this.user.role === "girl" ||
          this.user.balance > this.item.pricePerMessage ||
          (this.user.messageBundles.find((mb) => mb.model === this.item._id) &&
            this.user.messageBundles.find((mb) => mb.model === this.item._id)[
            "messages"
            ]))
      );
    },
    isUsingBundle() {
      return (
        this.user.messageBundles.find((mb) => mb.model === this.item._id) &&
        this.user.messageBundles.find((mb) => mb.model === this.item._id)[
        "messages"
        ]
      );
    },
    isUsingBalance() {
      return (
        !this.isUsingBundle && this.user.balance > this.item.pricePerMessage
      );
    },
  },
  methods: {
    ...mapActions("user", ["getUserById"]),
    ...mapMutations("user", ["SET_USER_MESSAGEBUNDLES"]),
    onTheBottomObserved(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        this.showScrollToBottomButton = !isIntersecting;
      });
    },
    insertEmoji(emoji) {
      this.messageText += emoji;
    },
    handleDonatePopup() {
      this.$vfm.show({
        component: DonatePopup,
        bind: { id: this.item._id },
      });
    },
    async sendMessage() {
      if (!this.canChat) {
        this.$notify.error({
          message: this.$t("chatMessages.notifications.notEnoughFunds"),
        });
        return;
      }
      if (!this.messageText && !this.messageImages.length) {
        this.$notify.error({
          message: this.$t("chatMessages.notifications.pleaseEnterTheMessage"),
        });
        return;
      }
      if (
        this.messageImages.length &&
        !this.messageImages.reduce((acc, curr) => acc && curr.ready, true)
      ) {
        this.$notify.error({
          message: this.$t(
            "chatMessages.notifications.awaitForFilesProcessing"
          ),
        });
        return;
      }
      let msg = {
        from: this.user._id,
        // from: "60eb10ffdea436547cdbe9c6",
        to: this.item._id,
        // to: "60eb0cdbdea436547cdbe9c4",
        message: this.messageText,
      };
      if (this.messageImages.length) {
        msg.withFiles = true;
        msg.messagefiles = this.messageImages.map((m) => {
          const name = m.file.name.toLowerCase().split(".");
          const fileEnd = name[name.length - 1];
          const savedname = `${Date.now().toString()}${Math.random()
            .toString(36)
            .substr(2, 6)}.${fileEnd}`;

          let type = false;
          if (fileEnd.match(/png|jpg|jpeg/)) {
            type = "image";
          } else if (fileEnd.match(/avi|mkv|mov|flv|vob|mp4|wmv|3gp|mpeg4/)) {
            type = "video";
          }
          return {
            size: m.afterSize,
            width: m.width,
            height: m.height,
            name: savedname,
            originalname: m.file.name,
            uploaded: false,
            error: false,
            type,
          };
        });
      }

      // try {
      //   await this.$store.dispatch(
      //     "$nuxtSocket/emit", // Remember, "emit" is namespaced to "$nuxtSocket"
      //     {
      //       label: "messages", // Use persisted socket "messages"
      //       evt: "chatMessage",
      //       msg: msg,
      //       emitTimeout: 3000,
      //     }
      //   );
      // } catch (error) {
      //   console.log(error);
      // }

      this.$root.socket.emit("chatMessage", msg, (resp) => {
        if (resp.ok) {
          if (this.messageImages.length) {
            this.uploader.submitFiles(
              this.messageImages.map((m) => {
                const fileSubmitted = msg.messagefiles.find(
                  (f) => f.originalname === m.file.name
                );
                m.file.meta = {};
                m.file.meta.count = 1;
                m.file.meta.idUser = this.user._id;
                m.file.meta.from = this.user._id;
                m.file.meta.to = this.item._id;
                m.file.meta.size = m.afterSize;
                m.file.meta.width = m.width;
                m.file.meta.height = m.height;
                m.file.meta.nameToSave = fileSubmitted.name;
                m.file.meta.type = fileSubmitted.type;
                return m.file;
              })
            );
          }
          if (resp.savedSender) this.SET_USER_MESSAGEBUNDLES(resp.savedSender);
        } else {
          this.$notify.error({
            message: this.$t("chatMessages.notifications.errorSendingMessage"),
          });
        }
        this.messageText = "";
        this.messageImages = [];
        this.$refs.fileinput.value = "";
      });
    },
    scrollToLast() {
      const options = {
        container: ".messages",
        easing: "ease-in",
        lazy: false,
        // force: true,
      };
      this.$scrollTo("#thebottom", 300, options);
    },
    async getRespondentData() {
      if (this.id) {
        this.item = await this.getUserById({
          id: this.id,
        });
      }
    },
    async uploadPost(e) {
      const files = e.target.files;
      console.log(files);
      if (this.messageImages.length + files.length >= 10) {
        this.$notify.error({
          title: this.$t("chatMessages.notifications.errorFileLimitTitle"),
          message: this.$t("chatMessages.notifications.errorFileLimitMessage"),
        });
        return;
      }

      Array.from(files).forEach(async (f) => {
        // console.log(f);
        if (f.type.indexOf("image") !== -1 && !f.type.match(/png|jpg|jpeg/)) {
          this.$notify.error({
            message: this.$t(
              "chatMessages.notifications.errorInvalidFileType",
              { filename: f.name }
            ),
          });
          return;
        }
        if (
          f.type.indexOf("video") !== -1 &&
          !f.type.match(/avi|mkv|mov|quicktime|flv|vob|mp4|wmv|3gp|mpeg4/)
        ) {
          this.$notify.error({
            message: this.$t(
              "chatMessages.notifications.errorInvalidFileType",
              { filename: f.name }
            ),
          });
          return;
        }
        const onProgress = (p) => {
          // console.log(`${f.name} progress is ${p}%`);
          const ind = this.messageImages.findIndex((mi) => mi.name === f.name);
          if (ind !== -1) {
            const mess = {
              beforeSize: this.messageImages[ind].beforeSize,
              beforeType: this.messageImages[ind].beforeType,
              afterSize: this.messageImages[ind].afterSize,
              afterType: this.messageImages[ind].afterType,
              name: this.messageImages[ind].name,
              ready: this.messageImages[ind].ready,
              progress: p,
              file: this.messageImages[ind].file,
              src: this.messageImages[ind].src,
              width: this.messageImages[ind].width,
              height: this.messageImages[ind].height,
            };
            this.$set(this.messageImages, ind, mess);
          }
        };
        const options = {
          maxSizeMB: process.env.IMAGE_COMP_MAXSIZEMB || 1,
          maxWidthOrHeight: process.env.IMAGE_COMP_MAXWIDTHORHEIGHT || 1920,
          useWebWorker: true,
          initialQuality: process.env.IMAGE_COMP_INITIALQUALITY || 1,
          // fileType: "image/jpeg",
          onProgress: onProgress,
        };
        const messageImage = {
          beforeSize: f.size,
          beforeType: f.type,
          afterSize: null,
          afterType: null,
          name: f.name,
          ready: false,
          progress: 0,
          file: null,
          src: null,
          width: null,
          height: null,
        };
        this.messageImages.push(messageImage);
        let compressedfile;
        let src;
        let info;
        try {
          compressedfile = await this.$icomp(f, options);
        } catch (error) {
          // console.log(error);
          compressedfile = f;
          onProgress(100);
        }
        try {
          info = await this.$funcs.returnPreview(compressedfile);
          src = info.src;
        } catch (error) {
          // console.log(error);
          src = this.videothumb;
        }
        const ind = this.messageImages.findIndex((mi) => mi.name === f.name);
        if (ind !== -1) {
          const mess = {
            beforeSize: this.messageImages[ind].beforeSize,
            beforeType: this.messageImages[ind].beforeType,
            afterSize: compressedfile.size,
            afterType: compressedfile.type,
            name: this.messageImages[ind].name,
            ready: true,
            progress: this.messageImages[ind].progress,
            file: compressedfile,
            src: src,
            width: info?.width,
            height: info?.height,
          };
          this.$set(this.messageImages, ind, mess);
          // console.log(mess);
        }
      });
    },
    removePreview(i) {
      this.messageImages.splice(i, 1);
      if (!this.messageImages.length) this.$refs.fileinput.value = "";
    },
  },
  watch: {
    async id() {
      await this.getRespondentData();
      // this.scrollToLast();
    },
    mesagesCount() {
      this.scrollToLast();
    },
    searchTerm() {
      this.$emit("onSearch", this.searchTerm);
    },
  },
  async mounted() {
    // this.socket = this.$nuxtSocket({
    //   persist: "messages",
    // });
    this.observer = new IntersectionObserver(this.onTheBottomObserved, {
      root: this.$refs.messages,
      rootMargin: "500px",
      threshold: 1.0,
    });
    this.observer.observe(this.$refs.thebottom);
    this.uploader = new this.$siofu(this.$root.socket);
    this.$root.socket.on("file-error", (message) => {
      this.$notify.error({
        message,
      });
    });
    await this.getRespondentData();
    this.scrollToLast();
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
};
</script>
<style lang="scss">
.fade-slide-enter {
  opacity: 0;
  transform: translateX(100px);
}
// .fade-slide-enter-to {
//   // opacity: 0.5;
// }
// .fade-slide-leave {
//   // opacity: 0.5;
// }
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.fade-slide-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.rounded {
  border-radius: 10000px;
  width: 70px;
  height: 70px;
  object-fit: cover;
  border: 1px solid #fff;
}
.uploadlabel {
}
.uploadinput {
  display: none;
}
.uploadimg {
  vertical-align: middle;
  cursor: pointer;

  &:hover {
    g {
      path {
        transition: all 0.3s ease;
        fill: #7d8fe9 !important;
      }
    }
  }
}
.newmessageform {
  position: relative;
}
.textareacont {
  position: relative;
  display: flex;
}
.textareacont button {
  position: absolute;
  right: 19px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  margin: 0;
  border-radius: 36px;
  background: initial !important;
  font-weight: initial !important;
  font-size: initial !important;
  color: initial !important;
  border: initial !important;
  width: initial !important;
  height: initial !important;
  svg {
    transition: all 0.3s ease;
  }
  &:hover {
    svg {
      path {
        transition: all 0.3s ease;
        fill: #7d8fe9 !important;
      }
    }
  }
}
.chat {
  position: relative;
  .gotolast {
    position: absolute;
    bottom: 80px;
    right: 40px;
    opacity: 0.5;
    a {
      text-decoration: none;
      display: inline-block;
      background-color: #5171e4;
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      font-size: 16px;
      line-height: 48px;
      vertical-align: middle;
      width: 48px;
      text-align: center;
    }
  }
  .messages {
    overflow: auto;
  }
  .with-who {
    a {
      margin-left: initial !important;
      display: inline-block !important;
      text-decoration: none !important;
      font-size: 1em !important;
      line-height: 100% !important;
      color: #b87cf1 !important;
    }
    .donate-button {
      button {
        color: #fff;
        font-weight: 500;
        font-size: 20px;
        width: 220px;
        height: 50px;
        background: #5171e4;
        border-radius: 30px;
        margin-right: 30px;
        vertical-align: middle;
        &:hover {
          background: #e46974;
        }
      }
      // font-size: 1rem;
      padding-left: 2rem;
      // width: 100%;
      // margin: 1rem;
    }
  }
  .back-link {
    .donate-button {
      button {
        color: #fff;
        font-weight: 500;
        font-size: 16px;
        width: 120px;
        height: 40px;
        background: #434ca5;
        border-radius: 100px;
        margin-right: 30px;
        vertical-align: middle;
      }
      // font-size: 1rem;
      padding-top: 0.5rem;
      // width: 100%;
      // margin: 1rem;
    }
  }
  .notsub {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* position: absolute; */
    /* top: 50%; */
    margin-top: auto;
    /* margin: 50px; */
    background: #fff;
    /* z-index: 1000; */
    border: 1px solid #b87cf1;
    /* border-radius: 20px; */
    border-bottom-right-radius: 20px;
    padding: 30px;
    /* transform: translateY(-100%); */
    font-size: 1rem;
    .message {
      a {
        margin-left: initial !important;
        display: inline-block !important;
        text-decoration: none !important;
        font-size: 1em !important;
        line-height: 100% !important;
        color: #b87cf1 !important;
      }
    }
    button {
      display: block;
      color: #fff;
      font-weight: 500;
      font-size: 20px;
      border-radius: 36px;
      background: linear-gradient(272.29deg, #b277ef 0%, #dd94f9 98.03%);
      width: 255px;
      height: 54px;
      margin-right: 1rem;
      margin-top: 1rem;
    }
  }
}
.chat form {
  padding: 0 !important;
  background: #ffffff !important;
  .preview {
    position: relative;
    margin-top: 15px !important;
    margin-bottom: 15px !important;

    img {
      border-radius: 10px;
    }
    a {
      top: -8px;
      right: -12px;
      width: 26px;
      height: 26px;
      background: none !important;
      position: absolute;
      svg {
        display: block;
        width: 20px;
        height: 20px;
      }
    }
  }
}
.textareacont label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 19px;
}
.textareacont input {
  width: 100%;
  background: #ffffff !important;
  resize: none;
  height: 60px !important;
  border-radius: 0 !important;
  border-bottom-right-radius: 20px !important;
  margin-bottom: 0 !important;
  padding: 20px 100px 20px 60px !important;
  margin-top: auto;
  color: #000;
  font-weight: 400;
  border: 1px solid #d5dbe7;
  @media only screen and (max-width: 850px) {
    border-bottom-right-radius: 0 !important;
  }
}
</style>
