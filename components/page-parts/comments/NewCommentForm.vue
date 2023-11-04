<template>
  <form>
    <emoji-selector @emoji="insertEmoji" />
    <textarea
      v-model="form.comment"
      @input="clearError('comment')"
      :error="errors.comment"
      @keyup.ctrl.enter="submit()"
      :placeholder="$t('newCommentsForm.textPlaceholder')"
    ></textarea>
    <button @click.prevent="submit()"></button>
    <!-- <a class="smile"></a> -->
  </form>
  <!-- <div class="cont">
    <emoji-selector @emoji="insertEmoji" />
    <v-input
      v-model="form.comment"
      @input="clearError('comment')"
      :error="errors.comment"
      holder="Комментарий"
      @keyup.enter="submit()"
    />
    <button @click.prevent="submit()">Отправить</button>
  </div> -->
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import EmojiSelector from "./EmojiSelector.vue";

export default {
  components: { EmojiSelector },
  name: "NewCommentForm",
  data() {
    return {
      form: {
        comment: "",
        mentions: [],
      },
      errors: {
        comment: {
          status: false,
          text: "",
        },
      },
    };
  },
  methods: {
    ...mapActions("comment", ["postComment"]),
    ...mapActions("comment", ["setMentionSuggestion"]),
    clearError(type) {
      this.errors[type].status = false;
      this.errors[type].text = "";
    },
    async submit() {
      if (!this.form.comment.trim()) {
        this.errors.comment.status = true;
        this.errors.comment.text = this.$t("newCommentsForm.errorNoMessage");
        return;
      }
      const mentionsRegExp =
        /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:(?:@|＠)(?!\/))([a-z0-9/_]{1,35})(?:\b(?!@|＠)|$)/g;
      const matches = this.form.comment.matchAll(mentionsRegExp);
      for (const match of matches) {
        this.form.mentions.push(match[1]);
      }
      const postData = {
        comment: this.form.comment,
        mentions: this.form.mentions,
      };

      const data = await this.postComment(postData);
      if (data.newComment) {
        this.form.comment = "";
        this.form.mentions = [];
      }
    },
    insertEmoji(emoji) {
      this.form.comment += emoji;
    },
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("comment", ["mentionSuggestion"]),
  },
  watch: {
    mentionSuggestion() {
      if (this.mentionSuggestion) {
        this.form.comment = `@${this.mentionSuggestion}, ${this.form.comment}`;
        this.setMentionSuggestion("");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cont {
  width: 100%;
  display: flex;
  position: relative;
  .inpt {
    width: 100%;
    border: 1px solid #b277ef;
    padding: 10px 2px;
    border-radius: 5px;
  }
  button {
    padding: 10px 20px;
  }
}
</style>
