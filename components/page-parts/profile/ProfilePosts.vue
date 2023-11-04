<template>
  <div class="tab r-tabs-state-active">
    <!-- <div v-if="user && user.totalPosts > 0 && !isChildShown" class="flex">
      <div v-for="(item, i) in posts" :key="`o${i}`" class="post">
        <n-link :to="localePath(`/profile/${getLink(user)}/post/${item._id}`)">
          <div class="image">
            <img
              v-if="item.images.length > 0"
              :src="`${publicUrl}/media/${item.images[0].filename}`"
            />
            <video
              style="width: 100%; height: 100%; object-fit: cover"
              v-else-if="item.videos.length > 0"
              :src="`${publicUrl}/media/${item.videos[0].filename}`"
            ></video>

            <div
              v-show="item.images.length + item.videos.length > 1"
              class="more"
            >
              <n-link
                :to="localePath(`/profile/${getLink(user)}/post/${item._id}`)"
              >
                +{{ item.images.length + item.videos.length - 1 }}
              </n-link>
            </div>
          </div>
        </n-link>
        <div class="date">
          {{ $d(new Date(item.createdAt), "short") }}
          <span v-if="mine && item.isPublic"
            ><img
              style="width: 15px; height: 15px"
              src="@/assets/svg/look.svg"
              alt=""
          /></span>
        </div>
        <n-link
          :to="localePath(`/profile/${getLink(user)}/post/${item._id}`)"
          class="name"
        >
          {{ item.title }}
        </n-link>
        <p
          style="
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ item.description }}
        </p>
        <div v-if="mine" class="links">
          <n-link
            :to="localePath(`/profile/${getLink(user)}/post/${item._id}/edit`)"
          >
            {{ $t("profilePosts.edit") }}
          </n-link>
          <a @click.prevent="confirmDeletePost(item._id)" href="#">
            {{ $t("profilePosts.delete") }}
          </a>
        </div>
      </div>

      <div v-for="(item, i) in closedPostsPreview" :key="`c${i}`" class="post">
        <div class="image">
          <img v-if="item.images.length > 0" :src="item.images[0].path" />
        </div>
        {{ item.title }}
        <p>
          {{ item.description }}
        </p>
      </div>
    </div>

    <div v-if="user && !user.totalPosts && !isChildShown" class="flex">
      <p>{{ $t("profilePosts.noPosts") }}</p>
    </div> -->

    <div v-if="mine" class="new-post">
      <form>
        <p>{{ $t("profilePosts.createNewPost") }}</p>
        <v-input
          v-model="form.title"
          @input="clearError('title')"
          :error="errors.title"
          :holder="$t('profilePosts.newPostTitlePlaceholder')"
        />
        <v-txt
          v-model="form.description"
          @input="clearError('description')"
          :error="errors.description"
          :holder="$t('profilePosts.newPostDescrPlaceholder')"
        />
        <div v-show="user.subscriptionEnabled" class="public">
          <input
            id="ins"
            v-model="form.public"
            type="checkbox"
            class="checkbox"
          />
          <label for="ins"> {{ $t("profilePosts.newPostIsPublic") }} </label>
        </div>

        <div style="display: flex; flex-wrap: wrap">
          <div class="upload" style="margin-right: 1rem; margin-bottom: 0.5rem">
            <label for="uploadPost">
              <input
                id="uploadPost"
                @change="uploadPost"
                type="file"
                multiple
                accept="image/*,video/*"
              />
              <img src="@/assets/svg/btn5.svg" />
              {{ $t("profilePosts.newPostAddFileButton") }}
            </label>
          </div>
          <div class="create" style="margin-top: 2px; margin-bottom: 0.5rem">
            <button @click.prevent="submit()" type="submit">
              {{ $t("profilePosts.newPostPublishButton") }}
            </button>
          </div>
        </div>
        <span
          v-for="(item, i) in [...form.image, ...form.video]"
          :key="i"
          class="preview"
        >
          <img v-if="item.ready" :src="item.src" />
          <span
            style="
              position: relative;
              display: inline-block;
              width: 100%;
              height: 100%;
            "
            v-else
          >
            <img :src="previewplaceholder" />
            <span style="position: absolute; top: 25px; left: 15px"
              >{{ item.progress }}%</span
            >
          </span>
          <a @click.prevent="removePreview(item.name)" />
        </span>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConfirmPopup from "../../modals/ConfirmPopup.vue";

export default {
  name: "ProfilePosts",
  props: {
    mine: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {
      form: {
        title: "",
        description: "",
        image: [],
        video: [],
        public: true,
      },
      errors: {
        title: {
          status: false,
          text: "",
        },
        description: {
          status: false,
          text: "",
        },
      },
      loading: false,
      posts: [],
      user: {},
      videothumb: require(`@/assets/svg/play.svg`),
      previewplaceholder: require(`@/assets/img/index-first-block2.png`),
    };
  },
  computed: {
    ...mapGetters("subscribe", ["isActiveSubscription"]),
    publicUrl() {
      return process.env.PUBLIC_URL;
    },
    isSubActive() {
      return this.isActiveSubscription(this.id);
    },
    isChildShown() {
      return !!this.$route.params.postid;
    },
    closedPostsPreview() {
      if (this.mine || this.isSubActive || !this.user) return [];
      const closedPost = {
        title: this.$t("profilePosts.privatePostPreviewTitle"),
        description: this.$t("profilePosts.privatePostPreviewDescr"),
        images: [
          {
            path: this.previewplaceholder,
          },
        ],
        videos: [],
      };
      return new Array(this.user.closedPosts).fill(closedPost);
    },
  },
  watch: {
    isSubActive: {
      handler: function () {
        this.getPostsF();
      },
    },
  },
  mounted() {
    this.getPostsF();
  },
  methods: {
    ...mapActions("model", [
      "createPost",
      "getPublicPosts",
      "getAllMyPosts",
      "getAllPosts",
    ]),
    ...mapActions("user", ["getUserById"]),
    ...mapActions("post", ["postPost"]),

    async confirmDeletePost(id) {
      const that = this;
      this.$vfm.show({
        component: ConfirmPopup,
        bind: { message: that.$t("profilePosts.deleteConfirm") },
        on: {
          async confirm(close) {
            const response = await that.$api.delete(`/posts/${id}`);
            if (response && response.data) {
              that.$notify.success({
                message: that.$t("profilePosts.notifications.postDeleted"),
              });
            } else {
              that.$notify.error({
                message: response.message,
              });
            }
            close();
            await that.getPostsF();
          },
          cancel(close) {
            close();
          },
        },
      });
    },
    clearError(type) {
      this.errors[type].status = false;
      this.errors[type].text = "";
    },

    async getPostsF() {
      this.user = await this.getUserById({ id: this.id });
      let response;
      if (this.id && !this.mine && !this.isActiveSubscription(this.id)) {
        response = await this.getPublicPosts({
          id: this.id,
        });
      } else if (this.id && !this.mine && this.isActiveSubscription(this.id)) {
        response = await this.getAllPosts({
          id: this.id,
        });
      } else if (this.mine) {
        response = await this.getAllMyPosts();
      }
      if (response && response.type !== "error") {
        this.posts = response.posts;
      }
      if (!this.user.subscriptionEnabled) {
        this.posts = this.posts.filter((p) => p.isPublic);
      }
    },

    // Создать новый пост
    async submit() {
      if (
        (this.form.image.length &&
          !this.form.image.reduce((acc, curr) => acc && curr.ready, true)) ||
        (this.form.video.length &&
          !this.form.video.reduce((acc, curr) => acc && curr.ready, true))
      ) {
        this.$notify.error({
          message: this.$t(
            "profilePosts.notifications.awaitForFilesProcessing"
          ),
        });
        return;
      }
      if (!this.loading) {
        if (!this.form.title) {
          this.errors.title.status = true;
          this.errors.title.text = this.$t("profilePosts.errorEnterTitle");
          return false;
        }
        if (!this.form.description) {
          this.errors.description.status = true;
          this.errors.description.text = this.$t(
            "profilePosts.errorEnterDescr"
          );
          return false;
        }
        if (!this.form.image.length && !this.form.video.length) {
          this.$notify.error({
            title: this.$t("profilePosts.notifications.errorTitle"),
            message: this.$t("profilePosts.notifications.errorAddFiles"),
          });
          return false;
        }

        this.loading = true;

        const form = new FormData();
        form.append("title", this.form.title);
        form.append("description", this.form.description);
        this.form.image.forEach((item, i) => {
          const mediaFile = new File([item.file], item.name);
          form.append("images", mediaFile);
        });
        this.form.video.forEach((item, i) => {
          const mediaFile = new File([item.file], item.name);
          form.append("videos", mediaFile);
        });
        form.append("isPublic", this.form.public);
        const response = await this.postPost(form);
        this.loading = false;

        if (response && response.type === "error") {
          let text = this.$t("profilePosts.notifications.errorGeneric");
          if (response.message && this.$errors_types[response.message]) {
            text = this.$errors_types[response.message];
          }
          this.$notify.error({
            title: this.$t("profilePosts.notifications.errorTitle"),
            message: text,
          });
          return false;
        }
        this.$notify.success({
          message: this.$t("profilePosts.notifications.successPostCreated"),
        });
        this.form = {
          title: "",
          description: "",
          image: [],
          video: [],
          public: true,
        };
        this.getPostsF();
      }
    },

    async uploadPost(e) {
      // const files = e.target.files;
      // for (let i = 0; i < files.length; i++) {
      //   if (this.form.image.length >= 10) {
      //     this.$notify.error({
      //       title: "Лимит файлов",
      //       message: "Можно прикрепить не более 10 файлов",
      //     });
      //   } else {
      //     const response = await this.$funcs.returnPreview(files[i]);
      //     this.form.image.push({
      //       file: files[i],
      //       src: response,
      //     });
      //   }
      // }

      const files = e.target.files;
      console.log(files);
      if (
        this.form.image.length + this.form.video.length + files.length >=
        10
      ) {
        this.$notify.error({
          title: this.$t("profilePosts.notifications.errorFileLimitTitle"),
          message: this.$t("profilePosts.notifications.errorFileLimitMessage"),
        });
        return;
      }

      Array.from(files).forEach(async (f) => {
        // console.log(f);
        let fileType = "image";
        if (
          f.type.indexOf("video") !== -1 &&
          f.type.match(/avi|mkv|mov|quicktime|flv|vob|mp4|wmv|3gp|mpeg4/)
        ) {
          fileType = "video";
        }
        if (f.type.indexOf("image") !== -1 && !f.type.match(/png|jpg|jpeg/)) {
          this.$notify.error({
            message: this.$t(
              "profilePosts.notifications.errorInvalidFileType",
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
              "profilePosts.notifications.errorInvalidFileType",
              { filename: f.name }
            ),
          });
          return;
        }
        const onProgress = (p) => {
          // console.log(`${f.name} progress is ${p}%`);
          const ind = this.form[fileType].findIndex((mi) => mi.name === f.name);
          if (ind !== -1) {
            const mess = { ...this.form[fileType][ind], progress: p };
            this.$set(this.form[fileType], ind, mess);
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
        const postFile = {
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
        this.form[fileType].push(postFile);
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
        const ind = this.form[fileType].findIndex((mi) => mi.name === f.name);
        if (ind !== -1) {
          const mess = {
            ...this.form[fileType][ind],
            afterSize: compressedfile.size,
            afterType: compressedfile.type,
            ready: true,
            file: compressedfile,
            src: src,
            width: info?.width,
            height: info?.height,
          };
          this.$set(this.form[fileType], ind, mess);
          // console.log(mess);
        }
      });
    },

    removePreview(i) {
      const iind = this.form.image.findIndex((im) => im.name === i);
      if (iind !== -1) this.form.image.splice(iind, 1);
      const vind = this.form.video.findIndex((vi) => vi.name === i);
      if (vind !== -1) this.form.video.splice(vind, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.upload {
  label {
    background: #fff;
    font-size: 18px;
    color: #5171e4;
    border: 2px solid #5171e4;
    -webkit-border-radius: 36px;
    -moz-border-radius: 36px;
    border-radius: 36px;
    width: 240px;
    height: 58px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      display: none;
    }
    img {
      vertical-align: middle;
    }
  }
}
.preview {
  width: 58px;
  height: 58px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>