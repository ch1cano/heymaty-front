<template>
  <div class="item">
    <div class="avatar">
      <i v-if="online" />
      <img :src="getAvatarUrl(item)" class="rounded" />
    </div>
    <div>
      <div class="name">
        {{ item.name }}
        <span v-if="messages.length">
          {{ $d(new Date(messages[messages.length - 1].createdAt), "short") }}
          <!-- {{ messages[messages.length - 1].createdAt | dateFromDate }} -->
        </span>
      </div>
      <p v-if="messages.length">
        <!-- {{ messages[messages.length - 1].message }} -->
        <span v-if="lastMessageFromMe">{{ $t("chatCard.you") }}</span>
        {{ lastMessage.text }}
      </p>
      <span v-if="newMessages.length" class="count">{{
        newMessages.length
      }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "ChatCard",
  data() {
    return {
      item: {},
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
    newMessages: {
      type: Array,
      default: () => [],
    },
    online: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("user", ["user"]),
    lastMessage() {
      return (
        this.messages &&
        this.messages.length && {
          text: this.messages[this.messages.length - 1].message,
          full: this.messages[this.messages.length - 1],
        }
      );
    },
    lastMessageFromMe() {
      return (
        this.lastMessage &&
        this.user &&
        this.user._id === this.lastMessage.full.from
      );
    },
  },
  filters: {
    dateFromDate: function(value) {
      if (!value) return "";
      return dayjs(value).format("DD.MM.YYYY");
    },
  },
  methods: {
    ...mapActions("user", ["getUserById"]),
  },
  async mounted() {
    if (this.id) {
      this.item = await this.getUserById({
        id: this.id,
      });
    }
    // console.log(this.messages);
  },
};
</script>
<style lang="scss" scoped>
.rounded {
  border-radius: 10000px;
  width: 70px;
  height: 70px;
  object-fit: cover;
}

.chat-page .menu .item {
  width: 100%;
  table-layout: fixed;
  p {
    // display: block;
  }
}
</style>
