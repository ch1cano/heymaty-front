<template>
  <silent-box :gallery="galleryItems" lazy-loading>
    <template v-slot:silentbox-item="{ silentboxItem }">
      <div v-if="silentboxItem.type === 'image'" class="photo">
        <div class="attachmentcont image">
          <img
            class="chatimage"
            :key="silentboxItem.uploaded"
            :data-src="
              silentboxItem.uploaded ? silentboxItem.url : imageplaceholder
            "
            v-lazy-load
          />
          <span v-if="silentboxItem.error" class="error">Ошибка</span>
          <span
            v-if="!silentboxItem.uploaded && !silentboxItem.error"
            class="loading"
            >Загрузка...</span
          >
        </div>
      </div>
      <div v-else-if="silentboxItem.type === 'video'" class="video">
        <div class="attachmentcont video">
          <video
            key="loaded"
            v-if="silentboxItem.uploaded"
            width="150"
            height="150"
            class="videoplayer"
            :data-src="silentboxItem.url"
            v-lazy-load
          ></video>
          <img
            key="loading"
            v-else
            :data-src="imageplaceholder"
            class="videoimage"
            v-lazy-load
          />
          <span v-if="silentboxItem.error" class="error">Ошибка</span>
          <span
            v-if="!silentboxItem.uploaded && !silentboxItem.error"
            class="loading"
            >Загрузка...</span
          >
          <div class="playpause"></div>
        </div>
      </div>
    </template>
  </silent-box>
</template>

<script>
export default {
  name: "ChatMessageGallery",
  props: {
    attachments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      videothumb: require(`@/assets/svg/play.svg`),
      imageplaceholder: require(`@/assets/img/index-first-block2.png`),
    };
  },
  computed: {
    galleryItems() {
      return this.attachments.map((a) => {
        a.src = a.uploaded ? a.url : this.imageplaceholder;
        if (a.type === "video") a.thumbnail = this.videothumb;
        a.thumbnailHeight = 150;
        a.thumbnailWidth = 150;
        return a;
      });
    },
  },
};
</script>

<style scoped>
.chatimage {
  width: 150px;
  height: 150px;
  object-fit: cover;
  position: absolute;
  top: 0px;
  left: 0px;
}
.videoimage {
  width: 150px;
  height: 150px;
  object-fit: cover;
  position: absolute;
  top: 0px;
  left: 0px;
}
.videoplayer {
  position: absolute;
  top: 0px;
  left: 0px;
  object-fit: cover;
}
.chatimage,
.videoplayer,
.videoimage {
  border-radius: 8px;
}
.attachmentcont {
  display: inline-block;
  position: relative;
  margin: 0 8px 0 0;
}
.attachmentcont.image {
  width: 150px;
  height: 150px;
}
.attachmentcont.video {
  width: 150px;
  height: 150px;
}
.attachmentcont .error {
  font-size: 1rem;
  position: absolute;
  top: 60px;
  left: 30px;
  color: red;
}
.attachmentcont .loading {
  font-size: 1rem;
  position: absolute;
  top: 60px;
  left: 30px;
  color: #777;
}
.playpause {
  /* background-image: url("~assets/img/playbutton.png"); */
  background-image: url("~assets/svg/play.svg");
  background-repeat: no-repeat;
  width: 50%;
  height: 50%;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  margin: auto;
  background-size: contain;
  background-position: center;
}
</style>