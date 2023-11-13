<template>
  <div class="comment" v-if="isCommentVisible">
    <div class="newcom" v-for="comment in comments" :key="comment.id">
      <div class="comcontent">
        <img
          class="avatarcom"
          alt="#"
          src="../../../../assets/img/avatar.png"
        />
        <div>
          <p class="namecom">Jane Stark</p>
          {{ comment.text }}
          <p class="timecom">today at 16:03</p>
        </div>
      </div>
      <div class="likes">
        <svg
          @click="decrementLikes1"
          v-if="isLiked1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.645 20.9107L11.6384 20.9072L11.6158 20.8949C11.5965 20.8844 11.5689 20.8693 11.5336 20.8496C11.4629 20.8101 11.3612 20.7524 11.233 20.6769C10.9765 20.5261 10.6132 20.3039 10.1785 20.015C9.31074 19.4381 8.15122 18.5901 6.9886 17.5063C4.68781 15.3615 2.25 12.1751 2.25 8.25C2.25 5.32194 4.7136 3 7.6875 3C9.43638 3 11.0023 3.79909 12 5.0516C12.9977 3.79909 14.5636 3 16.3125 3C19.2864 3 21.75 5.32194 21.75 8.25C21.75 12.1751 19.3122 15.3615 17.0114 17.5063C15.8488 18.5901 14.6893 19.4381 13.8215 20.015C13.3868 20.3039 13.0235 20.5261 12.767 20.6769C12.6388 20.7524 12.5371 20.8101 12.4664 20.8496C12.4311 20.8693 12.4035 20.8844 12.3842 20.8949L12.3616 20.9072L12.355 20.9107L12.3523 20.9121C12.1323 21.0289 11.8677 21.0289 11.6477 20.9121L11.645 20.9107Z"
            fill="#FF005C"
          />
        </svg>

        <svg
          @click="incrementLikes1"
          v-else
          class="empty"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 2">
            <path
              id="Union"
              d="M21 8.25C21 5.76472 18.9013 3.75 16.3125 3.75C14.3769 3.75 12.7153 4.87628 12 6.48342C11.2847 4.87628 9.62312 3.75 7.6875 3.75C5.09867 3.75 3 5.76472 3 8.25C3 15.4706 12 20.25 12 20.25C12 20.25 21 15.4706 21 8.25Z"
              stroke="#A8B2C5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>

        <p class="likecom">{{ likeCount1 }}</p>
      </div>
    </div>
    <!-- Форма для отправки комментария -->
    <form class="form_comts">
      <div>
        <img class="comts_ava" src="../../../../assets/img/avatar3.png" />
      </div>
      <div class="wrapper_form">
        <svg
          class="skobka"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M18.375 12.739L10.682 20.432C8.92462 22.1893 6.07538 22.1893 4.31802 20.432C2.56066 18.6746 2.56066 15.8254 4.31802 14.068L15.2573 3.12868C16.4289 1.95711 18.3283 1.95711 19.4999 3.12868C20.6715 4.30025 20.6715 6.19975 19.4999 7.37132L8.55158 18.3197M8.56066 18.3107C8.55764 18.3137 8.55462 18.3167 8.55158 18.3197M14.2498 8.37865L6.43934 16.1893C5.85355 16.7751 5.85355 17.7249 6.43934 18.3107C7.02211 18.8934 7.9651 18.8964 8.55158 18.3197"
            stroke="#5E48C9"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <input
          class="input_comts"
          v-model="newComment"
          placeholder="Enter message"
        />
        <button
          class="send_btn"
          type="submit"
          @click.prevent="() => submit(postId)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5.99996 12L3.26904 3.12451C9.88417 5.04617 16.0278 8.07601 21.4857 11.9997C16.0279 15.9235 9.88425 18.9535 3.26913 20.8752L5.99996 12ZM5.99996 12L13.5002 12"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Comments",
  props: {
    addComment: Function,
    isCommentVisible: Boolean,
    commentsList: { type: Array, require: true },
    newComment: String,
    likeCount1: Number,
    isLiked1: Boolean,
    decrementLikes1: Function,
    incrementLikes1: Function,
    comment: String,
    postId: String,
    post: Object,
  },

  computed: {
    ...mapState("user", ["user"]),
    ...mapState("comment", ["mentionSuggestion"]),
    ...mapGetters("comments", ["sortedComments"]),
    ...mapState("comments", [
      "hasNextPage",
      "page",
      "totalDocs",
      "commentsLoading",
    ]),
  },
  methods: {
    ...mapActions("comment", ["postComment"]),
    ...mapActions("comment", ["setMentionSuggestion"]),

    ...mapActions("comments", ["getComments", "resetComments"]),
    ...mapMutations("comments", ["SET_POST_ID"]),

    getMore() {
      this.getComments();
    },

    async submit() {
      await this.postComment({
        comment: this.newComment,
        postId: this.postId,
      });
    },
  },
  async mounted() {
    await this.SET_POST_ID(this.postId);

    const test = await this.getMore();
    console.log("test", test);
  },
  beforeDestroy() {
    this.resetComments();
  },
};
</script>
