<template>
  <div class="comment">
    <div class="author">
      <div class="avatar">
        <img :src="getAvatarUrl(comment.userId)" />
      </div>
      <div>
        <n-link :to="localePath(`/profile/${getLink(comment.userId)}`)"
          >{{ comment.userId.name }} (@{{ getLink(comment.userId) }})</n-link
        >
        <span>
          {{ $d(new Date(comment.createdAt), "short") }}
          <!-- {{ $dayjs(comment.createdAt).format("DD.MM.YYYY") }} -->
        </span>
      </div>
    </div>
    <p>
      <template v-for="(part, index) of splitComment">
        <n-link
          class="mention"
          :key="index"
          v-if="part[0] == '@'"
          :to="localePath(`/profile/${part.slice(1)}`)"
          >{{ part }}</n-link
        >
        <template v-else>{{ part }}</template>
      </template>
    </p>
    <div class="flex">
      <div class="counts">
        <like-button :obj="comment" />
        <!-- <a href="#">45</a> -->
        <!-- <a href="#">23</a> -->
      </div>
      <div>
        <a
          @click.prevent="setMentionSuggestion(getLink(comment.userId))"
          href="#"
          class="answer"
          >{{ $t("commentView.reply") }}</a
        >
        <a
          v-if="mine"
          href="#"
          class="del"
          @click.prevent="deleteComment(comment._id)"
          >{{ $t("commentView.delete") }}</a
        >
      </div>
    </div>
  </div>
  <!-- <div class="comment">
    <div class="avatar">
      <n-link :to="`/profile/${getLink(comment.userId)}`">
        <img class="image" :src="getAvatarUrl(comment.userId)" />
      </n-link>
    </div>
    <div class="content">
      <div class="main">
        <span class="username">
          <n-link :to="`/profile/${getLink(comment.userId)}`">
            {{ getLink(comment.userId) }}
          </n-link>
        </span>
        <span class="text">
          <template v-for="(part, index) of splitComment">
            <n-link
              :key="index"
              v-if="part[0] == '@'"
              :to="`/profile/${part.slice(1)}`"
              >{{ part }}</n-link
            >
            <template v-else>{{ part }}</template>
          </template>
        </span>
      </div>
      <div class="meta">
        <span class="date">
          {{ $dayjs(comment.createdAt).format("DD.MM.YYYY") }}
        </span>
        <span class="links">
          <a
            href="#"
            @click.prevent="setMentionSuggestion(getLink(comment.userId))"
            >Ответить</a
          >
          <a v-if="mine" href="#" @click.prevent="deleteComment(comment._id)"
            >Удалить</a
          >
        </span>
      </div>
    </div>
    <div class="like">
      <like-button :obj="comment" />
    </div>
  </div>-->
</template>

<script>
import LikeButton from "../../ui/LikeButton.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: { LikeButton },
  name: "CommentView",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("comment", ["setMentionSuggestion", "deleteComment"]),
  },
  computed: {
    ...mapState("user", ["user"]),
    publicUrl() {
      return process.env.PUBLIC_URL;
    },
    // parsedComment() {
    //   const mentionsRegExp =
    //     /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:(?:@|＠)(?!\/))([a-z0-9/_]{1,35})(?:\b(?!@|＠)|$)/g;
    //   return this.comment.comment.replaceAll(
    //     mentionsRegExp,
    //     "<a class='mention' style='text-decoration: none; color:#b277ef' href='/profile/$1'>@$1</a>"
    //   );
    // },
    splitComment() {
      return this.comment.comment.split(/(@\w+)/g);
    },
    mine() {
      if (!this.user) return false;
      return (
        this.comment.userId === this.user._id ||
        this.comment.userId._id === this.user._id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  .author {
    .avatar {
      width: 40px;
      height: 40px;
      padding-right: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    a {
      text-decoration: none;
    }
  }
}
.del {
  text-decoration: none;
  font-size: 20px;
  line-height: 150%;
  color: #a3b2cc;
  padding: 0 0 0 30px;
  background: url("~assets/img/back.svg") no-repeat 0 0;
}
.mention {
  text-decoration: none;
  color: #b277ef;
}
</style>
