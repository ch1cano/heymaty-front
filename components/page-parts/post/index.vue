<template>
  <div class="post_ganeral_wrap">
    <div class="post_wrapper">
      <div class="avatar_box">
        <div class="info_box">
          <div>
            <img
              class="avatar_ganeral"
              src="../../../assets/img/avatar.png"
              alt="photo"
            />
          </div>
          <div class="flex_info">
            <p class="name">{{ name }}</p>
            <p class="time">Today at 4:20</p>
          </div>
        </div>
      </div>
      <div class="svg_set">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.5 12C4.5 11.1716 5.17157 10.5 6 10.5C6.82843 10.5 7.5 11.1716 7.5 12C7.5 12.8284 6.82843 13.5 6 13.5C5.17157 13.5 4.5 12.8284 4.5 12ZM10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12ZM16.5 12C16.5 11.1716 17.1716 10.5 18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12Z"
            fill="#A8B2C5"
          />
        </svg>
      </div>
    </div>
    <div>
      <p class="massege_post">
        {{ description }}
      </p>
    </div>
    <div class="post_photos_box">
      <div v-for="item in images" :key="item.path">
        <img
          class="photo_post"
          src="../../../assets/img/post-photo1.png"
          width="300px"
          alt=""
        />
      </div>
    </div>
    <div class="likes_comts">
      <div class="likes">
        <svg
          @click="decrementLikes"
          v-if="isLiked"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.645 20.9107L11.6384 20.9072L11.6158 20.8949C11.5965 20.8844 11.5689 20.8693 11.5336 20.8496C11.4629 20.8101 11.3612 20.7524 11.233 20.6769C10.9765 20.5261 10.6132 20.3039 10.1785 20.015C9.31074 19.4381 8.15122 18.5901 6.9886 17.5063C4.68781 15.3615 2.25 12.1751 2.25 8.25C2.25 5.32194 4.7136 3 7.6875 3C9.43638 3 11.0023 3.79909 12 5.0516C12.9977 3.79909 14.5636 3 16.3125 3C19.2864 3 21.75 5.32194 21.75 8.25C21.75 12.1751 19.3122 15.3615 17.0114 17.5063C15.8488 18.5901 14.6893 19.4381 13.8215 20.015C13.3868 20.3039 13.0235 20.5261 12.767 20.6769C12.6388 20.7524 12.5371 20.8101 12.4664 20.8496C12.4311 20.8693 12.4035 20.8844 12.3842 20.8949L12.3616 20.9072L12.355 20.9107L12.3523 20.9121C12.1323 21.0289 11.8677 21.0289 11.6477 20.9121L11.645 20.9107Z"
            fill="#FF005C"
          />
        </svg>

        <svg
          @click="incrementLikes"
          v-else
          class="empty"
          width="24"
          height="24"
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

        <p>{{ likeCount }}</p>
      </div>
      <div class="comts" @click="toggleCommentVisibility">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 20.25C16.9706 20.25 21 16.5563 21 12C21 7.44365 16.9706 3.75 12 3.75C7.02944 3.75 3 7.44365 3 12C3 14.1036 3.85891 16.0234 5.2728 17.4806C5.70538 17.9265 6.01357 18.5192 5.85933 19.121C5.68829 19.7883 5.368 20.3959 4.93579 20.906C5.0918 20.9339 5.25 20.9558 5.40967 20.9713C5.60376 20.9903 5.80078 21 6 21C7.28201 21 8.47016 20.5979 9.44517 19.9129C10.2551 20.1323 11.1125 20.25 12 20.25Z"
            stroke="#A8B2C5"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p></p>
      </div>
    </div>

    <Comments
      v-if="postId"
      :isCommentVisible="isCommentVisible"
      :commentsList="comments"
      :newComment="newComment"
      :likeCount1="likeCount1"
      :post="post"
      :isLiked1="isLiked1"
      :addComment="addComment"
      :comment="comment"
      :decrementLikes1="decrementLikes1"
      :incrementLikes1="incrementLikes1"
      :postId="postId"
    />
  </div>
</template>

<script>
import Comments from "./components/comments.vue";
export default {
  components: { Comments },
  props: {
    images: {
      type: Array,
      required: true,
    },
    name: String,
    description: String,
    createdAt: String,
    isPublic: Boolean,
    avatar: String,
    postId: String,
    post: Object,
  },
  data() {
    return {
      isCommentVisible: false,
      comment: "",
      comments: [],
      newComment: "",
      currentColor: "",
      isLiked: false,
      likeCount: 0,
      likeCount1: 0,
      isLiked1: false,
    };
  },

  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked;
    },
    toggleLike1() {
      this.isLiked1 = !this.isLiked1;
    },
    toggleCommentVisibility() {
      this.isCommentVisible = !this.isCommentVisible;
    },
    changeColor(color) {
      this.currentColor = color;
    },

    addComment() {
      this.comments.push({ id: Date.now(), text: this.newComment });
      this.newComment = "";
    },
    incrementLikes() {
      this.isLiked = !this.isLiked;
      this.likeCount += 1;
    },
    incrementLikes1() {
      this.isLiked1 = !this.isLiked1;
      this.likeCount1 += 1;
    },
    decrementLikes() {
      this.isLiked = !this.isLiked;
      this.likeCount -= 1;
    },
    decrementLikes1() {
      this.isLiked1 = !this.isLiked1;
      this.likeCount1 -= 1;
    },
  },
};
</script>

<style>
.post_ganeral_wrap {
  max-width: 750px;
}
</style>
