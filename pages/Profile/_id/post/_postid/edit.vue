<template>
  <div class="profile-page">
    <div class="tabs">
      <div class="tab r-tabs-state-active">
        <div v-if="mine" class="new-post">
          <div>
            <n-link
              :to="localePath(`/profile/${getLink(author)}/post/${post._id}`)"
              >{{ $t("postEdit.backToPost") }}</n-link
            >
          </div>
          <form>
            <p>{{ $t("postEdit.editPost") }}</p>
            <v-input
              v-model="form.title"
              @input="clearError('title')"
              :error="errors.title"
              :holder="$t('postEdit.titlePlaceholder')"
            />
            <v-txt
              v-model="form.description"
              @input="clearError('description')"
              :error="errors.description"
              :holder="$t('postEdit.descrPlaceholder')"
            />
            <div v-show="author.subscriptionEnabled" class="public">
              <input
                id="ins"
                v-model="form.public"
                type="checkbox"
                class="checkbox"
              />
              <label for="ins"> {{ $t("postEdit.isPublic") }} </label>
            </div>

            <div class="existedfiles">
              <div v-for="im in post.images" :key="im.filename" class="image">
                <img :src="`${publicUrl}/media/${im.filename}`" alt="" />
                <a @click.prevent="removeExistedFile(im.filename)" />
              </div>
              <div v-for="vid in post.videos" :key="vid.filename" class="video">
                <video
                  :src="`${publicUrl}/media/${vid.filename}`"
                  alt=""
                ></video>
                <a @click.prevent="removeExistedFile(vid.filename)" />
              </div>
            </div>

            <div class="upload">
              <label for="uploadPost">
                <input
                  id="uploadPost"
                  @change="uploadPost"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                />
                <img src="~/assets/svg/btn5.svg" />
                {{ $t("postEdit.addAttachments") }}
              </label>
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
            </div>

            <div class="create">
              <button @click.prevent="submit()" type="submit">
                {{ $t("postEdit.saveButton") }}
              </button>
            </div>
            <div class="cancel">
              <button @click.prevent="$router.go(-1)">
                {{ $t("postEdit.cancelButton") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "PostEditPage",
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
      videothumb: require(`@/assets/svg/play.svg`),
      previewplaceholder: require(`@/assets/img/index-first-block2.png`),
    };
  },
  async asyncData({ store, route, redirect, error }) {
    if (!route.params.postid) {
      redirect("/");
    }
    if (!store.state.user.user) {
      error({ statusCode: 403, message: "Доступ закрыт" });
    }
    const post = await store.dispatch("model/getPost", {
      id: route.params.postid,
    });
    if (!post.post || (post && post.type === "error")) {
      error({ statusCode: post.code, message: "Ошибка" });
      return;
    }

    let mine = false;
    let author = null;
    if (
      store.state.user.user &&
      store.state.user.user._id === post.post.userId._id
    ) {
      mine = true;
      author = store.state.user.user;
    }

    if (!mine) {
      error({ statusCode: 403, message: "Доступ закрыт" });
      return;
    }
    return { post: post.post, mine, author };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["auth"]),
    publicUrl() {
      return process.env.PUBLIC_URL;
    },
  },
  methods: {
    ...mapActions("post", ["editPost"]),
    clearError(type) {
      this.errors[type].status = false;
      this.errors[type].text = "";
    },
    // Редактировать пост
    async submit() {
      if (
        (this.form.image.length &&
          !this.form.image.reduce((acc, curr) => acc && curr.ready, true)) ||
        (this.form.video.length &&
          !this.form.video.reduce((acc, curr) => acc && curr.ready, true))
      ) {
        this.$notify.error({
          message: this.$t("postEdit.notifications.awaitForFilesProcessing"),
        });
        return;
      }
      if (!this.loading) {
        if (!this.form.title) {
          this.errors.title.status = true;
          this.errors.title.text = this.$t("postEdit.errorEnterTitle");
          return false;
        }
        if (!this.form.description) {
          this.errors.description.status = true;
          this.errors.description.text = this.$t("postEdit.errorEnterDescr");
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
        form.append("existedImages", JSON.stringify(this.post.images));
        form.append("existedVideos", JSON.stringify(this.post.videos));
        form.append("isPublic", this.form.public);
        const response = await this.editPost({ id: this.post._id, data: form });
        this.loading = false;

        if (response && response.type === "error") {
          let text = this.$t("postEdit.notifications.errorGeneric");
          if (response.message && this.$errors_types[response.message]) {
            text = this.$errors_types[response.message];
          }
          this.$notify.error({
            title: this.$t("postEdit.notifications.errorTitle"),
            message: text,
          });
          return false;
        }
        this.$notify.success({
          message: this.$t("postEdit.notifications.successPostEdited"),
        });
        this.post = response;
        this.form.image = [];
        this.form.video = [];
        // this.$router.go(-1);
        this.goTo(
          this.localePath(
            `/profile/${this.getLink(this.author)}/post/${
              this.post._id
            }?updated`
          )
        );
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
        this.post.images.length +
          this.post.videos.length +
          this.form.image.length +
          this.form.video.length +
          files.length >=
        10
      ) {
        this.$notify.error({
          title: this.$t("postEdit.notifications.errorFileLimitTitle"),
          message: this.$t("postEdit.notifications.errorFileLimitMessage"),
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
              "postEdit.notifications.errorInvalidFileType",
              f.name
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
              "postEdit.notifications.errorInvalidFileType",
              f.name
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
    removeExistedFile(name) {
      const iind = this.post.images.findIndex((im) => im.filename === name);
      if (iind !== -1) this.post.images.splice(iind, 1);
      const vind = this.post.videos.findIndex((vi) => vi.filename === name);
      if (vind !== -1) this.post.videos.splice(vind, 1);
    },
  },
  mounted() {
    this.form.title = this.post.title;
    this.form.description = this.post.description;
    this.form.public = this.post.isPublic;
  },
};
</script>
<style lang="scss" scoped>
.profile-page {
  padding: 0px 0 46px !important;
}
.profile-page .tabs .tab .new-post {
  margin: 0px 0 -46px !important;
}
.existedfiles {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  .image {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: 25px;
    margin-bottom: 1rem;
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
      border-radius: 5px;
    }
    a {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -20px;
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url("@/assets/svg/close.svg");
    }
  }
  .video {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: 25px;
    margin-bottom: 1rem;
    width: 100px;
    height: 100px;
    video {
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
      border-radius: 5px;
    }
    a {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -20px;
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url("@/assets/svg/close.svg");
    }
  }
}
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
.cancel {
  margin-top: 20px;
}
.create {
  margin-top: 20px;
}
</style>