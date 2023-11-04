<template>
  <div>
    <client-only>
      <light-box
        ref="lb"
        :showThumbs="false"
        :showLightBox="showLightBox"
        :media="media"
        :siteLoading="imageplaceholder"
      ></light-box>
    </client-only>
    <vue-justified-layout :items="galleryItems" v-slot="{ item, index }">
      <div
        @click="showHandler(index)"
        class="attachmentcont image"
        v-if="item.type === 'image'"
      >
        <img class="chatimage" :data-src="item.url" v-lazy-load />
        <span v-if="item.error" class="error">Ошибка</span>
        <!-- <span v-if="!item.uploaded && !item.error" class="loading"
          >Загрузка...</span
        > -->
      </div>
      <div
        @click="showHandler(index)"
        class="attachmentcont video"
        v-if="item.type === 'video'"
      >
        <video
          key="loaded"
          v-if="item.uploaded"
          class="videoplayer"
          :data-src="item.url"
          v-lazy-load
        ></video>
        <img
          class="videoimage"
          key="loading"
          v-else
          :data-src="imageplaceholder"
          v-lazy-load
        />
        <span v-if="item.error" class="error">Ошибка</span>
        <!-- <span v-if="!item.uploaded && !item.error" class="loading"
          >Загрузка...</span
        > -->
        <div class="playpause"></div>
      </div>
    </vue-justified-layout>
  </div>
</template>

<script>
export default {
  name: "ChatMessageJustifiedLayout",
  props: {
    attachments: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      videothumb: require(`@/assets/svg/play.svg`),
      // imageplaceholder: require(`@/assets/img/index-first-block2.png`),
      imageplaceholder: require(`@/assets/img/item-heymaty.svg`),
      showLightBox: false,
    };
  },
  methods: {
    showHandler(ind) {
      this.$refs.lb.showImage(ind);
    },
  },
  computed: {
    galleryItems() {
      return this.attachments.map((a) => {
        a.url = a.url;
        a.width = a.width ? a.width : 1;
        a.height = a.height ? a.height : 1;
        return a;
      });
    },
    media() {
      return this.attachments.map((a) => {
        let ret = {};
        if (a.type === "image") {
          ret.src = a.url;
          ret.thumb = a.url;
        }
        if (a.type === "video") {
          ret.sources = [
            {
              src: a.url,
            },
          ];
          ret.type = "video";
          // ret.width = a.width ? a.width : 1;
          ret.width = "100%";
          // ret.height = a.height ? a.height : 1;
          ret.height = "100%";
          ret.thumb = this.videothumb;
          ret.autoplay = true;
        }
        return ret;
      });
    },
  },
};
</script>

<style scoped>
.justified-item img,
.justified-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.justified-container {
  width: 100%;
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
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
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
