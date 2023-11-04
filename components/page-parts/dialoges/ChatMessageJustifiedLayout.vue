<template>
  <div>
    <client-only>
      <light-box
        ref="lb"
        :show-thumbs="false"
        :show-light-box="showLightBox"
        :media="media"
        :site-loading="imageplaceholder"
      ></light-box>
    </client-only>
    <vue-justified-layout :items="galleryItems" v-slot="{ item, index }">
      <div
        @click="item.uploaded && isLoaded(index) && showHandler(index)"
        class="attachmentcont image"
        v-if="item.type === 'image'"
      >
        <img
          :ref="'att' + index"
          class="chatimage"
          :key="item.uploaded"
          :data-src="item.uploaded ? item.url : imageplaceholder"
          v-lazy-load
        />
        <!-- <div v-if="isLoading(index)" class="wait"></div> -->
        <div v-if="item.error" class="error">Ошибка</div>
        <div v-if="!item.uploaded && !item.error" class="loading"></div>
      </div>
      <div
        @click="item.uploaded && isLoaded(index) && showHandler(index)"
        class="attachmentcont video"
        v-if="item.type === 'video'"
      >
        <video
          :ref="'att' + index"
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
        <!-- <div v-if="isLoading(index)" class="wait"></div> -->
        <div v-if="item.uploaded && !item.error" class="playpause"></div>
        <div v-if="item.error" class="error">Ошибка</div>
        <div v-if="!item.uploaded && !item.error" class="loading"></div>
      </div>
    </vue-justified-layout>
  </div>
</template>

<script>
// import videothumb from "@/assets/svg/play.svg";
// import imageplaceholder from "@/assets/img/item.svg";
// import imageplaceholder from "@/assets/img/photo3.png";
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
      // videothumb: require(`@/assets/svg/play.svg`),
      videothumb: this.$root.defaultImage,
      // imageplaceholder: require(`@/assets/img/index-first-block2.png`),
      // imageplaceholder: require(`@/assets/img/item.svg`),
      imageplaceholder: this.$root.defaultImage,
      showLightBox: false,
    };
  },
  methods: {
    showHandler(ind) {
      this.$refs.lb.showImage(ind);
    },
    isLoaded(ind) {
      return this.$refs["att" + ind].classList.contains("isLoaded");
    },
  },
  computed: {
    isLoading() {
      return (ind) =>
        this.$refs["att" + ind] &&
        this.$refs["att" + ind].classList.contains("isLoading");
    },
    galleryItems() {
      return this.attachments.map((a) => {
        // a.url = a.url;
        // a.width = a.width ? a.width : 1;
        // a.height = a.height ? a.height : 1;
        return {
          ...a,
          url: a.url,
          width: a.width ? a.width : 1,
          height: a.height ? a.height : 1,
        };
      });
    },
    media() {
      return this.attachments.map((a) => {
        let ret = {};
        if (a.type === "image") {
          ret.src = a.uploaded ? a.url : this.imageplaceholder;
          ret.thumb = a.uploaded ? a.url : this.imageplaceholder;
        }
        if (a.type === "video") {
          if (a.uploaded) {
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
          } else {
            ret.src = this.imageplaceholder;
            ret.thumb = this.imageplaceholder;
          }
        }
        return ret;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.justified-item {
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
.chatimage,
.videoplayer {
  &.isLoading {
    // background-image: url("~assets/img/item.svg");
    // background-repeat: no-repeat;
    // background-size: contain;
    // background-position: center;
    // border: 10px solid red;
  }
}
.attachmentcont {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  .error {
    font-size: 1rem;
    position: absolute;
    display: inline-block;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    color: red;
    background-color: rgba(213, 219, 231, 0.84);
    border: 1px solid red;
    padding: 3px 6px;
    border-radius: 6px;
  }
  .loading {
    font-size: 1rem;
    position: absolute;
    display: inline-block;
    width: 80px;
    height: 80px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    &::after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 2px;
      border-radius: 50%;
      border: 6px solid #5171e4;
      border-color: #5171e4 transparent #5171e4 transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
    // &::after {
    //   content: " ";
    //   display: block;
    //   border-radius: 50%;
    //   width: 0;
    //   height: 0;
    //   // margin: 8px;
    //   box-sizing: border-box;
    //   border: 40px solid #fff;
    //   border-color: #fff transparent #fff transparent;
    //   animation: lds-hourglass 1.2s infinite;
    // }
  }
  .playpause {
    /* background-image: url("~assets/img/playbutton.png"); */
    background-image: url("~assets/svg/play.svg");
    background-repeat: no-repeat;
    position: absolute;
    display: inline-block;
    width: 80px;
    height: 80px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-size: contain;
    background-position: center;
  }
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}

.wait {
  background-image: url("~assets/img/favicon.png");
  // background-image: url("~assets/svg/play.svg");
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
