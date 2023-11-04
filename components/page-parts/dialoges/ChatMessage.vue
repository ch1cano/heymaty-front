<template>
  <div>
    <n-link
      v-if="message.other"
      :to="localePath(`/profile/${getLink(me)}`)"
      class="image"
    >
      <img :src="getAvatarUrl(me)" class="avatar rounded" />
    </n-link>
    <n-link v-else :to="localePath(`/profile/${getLink(notme)}`)" class="image">
      <img :src="getAvatarUrl(notme)" class="avatar rounded" />
    </n-link>
    <div class="text" :class="{ donation: !!message.donation }">
      <div>{{ message.message }}</div>
      <div v-if="message.donation" class="donation-text">
        {{
          $t("chatMessage.donation", {
            donation: toMoney(message.donation.amount),
          })
        }}
      </div>
      <!-- <chat-message-attachments :attachments="attachments" /> -->
      <chat-message-gallery
        v-if="GalleryMode === 'tiles'"
        :attachments="attachments"
      />
      <chat-message-justified-layout
        v-if="GalleryMode === 'flikr' && attachments.length"
        :attachments="attachments"
      />
      <!-- <chat-message-justified-layout-2
        v-if="attachments.length"
        :attachments="attachments"
      />-->
      <div class="date">{{ message.time }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import ChatMessageAttachments from "@/components/page-parts/dialoges/ChatMessageAttachments";
import ChatMessageGallery from "@/components/page-parts/dialoges/ChatMessageGallery";
import ChatMessageJustifiedLayout from "@/components/page-parts/dialoges/ChatMessageJustifiedLayout.vue";
import ChatMessageJustifiedLayout2 from "@/components/page-parts/dialoges/ChatMessageJustifiedLayout2.vue";

export default {
  name: "ChatMessage",
  data() {
    return {
      GalleryMode: "flikr",
      // GalleryMode: "tiles",
    };
  },
  components: {
    // ChatMessageAttachments,
    ChatMessageGallery,
    ChatMessageJustifiedLayout,
    ChatMessageJustifiedLayout2,
  },
  props: {
    me: {
      type: Object,
    },
    notme: {
      type: Object,
    },
    message: {
      type: Object,
    },
  },
  filters: {
    timeFromDate: function(value) {
      if (!value) return "";
      const dt = new Date(value);
      return `${dt.getHours()}:${dt.getMinutes()}`;
    },
  },
  computed: {
    images() {
      if (this.message.attachment) {
        return this.message.attachment
          .filter((i) => i.type === "image")
          .map((i) => {
            i.url = `${process.env.BASE_URL}/messages/${this.message.from}/${i.name}`;
            return i;
          });
      }
      return null;
    },
    videos() {
      if (this.message.attachment) {
        return this.message.attachment
          .filter((i) => i.type === "video")
          .map((v) => {
            v.url = `${process.env.BASE_URL}/messages/${this.message.from}/${v.name}`;
            return v;
          });
      }
      return null;
    },
    attachments() {
      if (this.message.attachment) {
        return this.message.attachment.map((v) => {
          v.url = `${process.env.BASE_URL}/messages/${this.message.from}/${v.name}`;
          return v;
        });
      }
      return null;
    },
  },
  methods: {
    ...mapActions("messages", ["readMessage"]),
    changeGalleryMode() {
      if (this.GalleryMode === "tiles") {
        this.GalleryMode = "flikr";
      } else if (this.GalleryMode === "flikr") {
        this.GalleryMode = "tiles";
      }
    },
  },
  async mounted() {
    await this.readMessage(this.message._id);
  },
};
</script>
<style scoped lang="scss">
.rounded {
  border-radius: 10000px;
  width: 70px;
  height: 70px;
  object-fit: cover;
  border: 1px solid #ffffff;
}
.chat {
  .text {
    max-width: 100%;
    word-break: break-word;
  }
}
.donation {
  background-color: rgba(218, 185, 0, 0.24) !important;
}
.donation-text {
  text-align: right;
  font-size: 0.85rem;
}
</style>
