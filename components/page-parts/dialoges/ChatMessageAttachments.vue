<template>
  <div class="attachments">
    <div
      v-for="attachment in attachments"
      :key="attachment.name"
      class="attachment"
    >
      <div v-if="attachment.type === 'image'" class="photo">
        <div class="attachmentcont image">
          <!-- <transition name="fade" :duration="10000"> -->
          <img
            class="chatimage"
            :key="attachment.uploaded"
            :data-src="attachment.uploaded ? attachment.url : imageplaceholder"
            v-lazy-load
          />
          <!-- <img
                  :key="attachment.uploaded"
                  :src="attachment.uploaded ? attachment.url : imageplaceholder"
                  class="chatimage"
                /> -->
          <!-- </transition> -->
          <span v-if="attachment.error" class="error">Ошибка</span>
          <span v-if="!attachment.uploaded" class="loading">Загрузка...</span>
        </div>
      </div>
      <div v-else-if="attachment.type === 'video'" class="video">
        <div class="attachmentcont video">
          <!-- <transition name="fade" :duration="10000"> -->
          <video
            key="loaded"
            v-if="attachment.uploaded"
            controls
            width="300"
            height="150"
            class="videoplayer"
            :data-poster="imageplaceholder"
            v-lazy-load
            :data-src="attachment.url"
          >
            <!-- <source :data-src="attachment.url" v-lazy-load /> -->
          </video>
          <img
            key="loading"
            v-else
            :data-src="imageplaceholder"
            class="videoimage"
            v-lazy-load
          />
          <!-- </transition> -->
          <span v-if="attachment.error" class="error">Ошибка</span>
          <span v-if="!attachment.uploaded" class="loading">Загрузка...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMessageAttachments",
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
  width: 300px;
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
}
.attachment {
  display: inline-block;
}
.attachmentcont {
  display: inline-block;
  position: relative;
}
.attachmentcont.image {
  width: 150px;
  height: 150px;
}
.attachmentcont.video {
  width: 300px;
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
</style>