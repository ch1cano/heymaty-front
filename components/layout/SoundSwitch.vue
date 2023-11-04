<template>
  <div class="ls-container">
    <a href="#" @click.prevent.stop="toggleSoundAllowed">
      <SoundOn v-if="isSoundAllowed" class="soundicon" />
      <SoundOff v-else class="soundicon" />
    </a>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SoundOn from "@/assets/img/soundon.svg?inline"
import SoundOff from "@/assets/img/soundoff.svg?inline"
export default {
  name: "SoundSwitch",
  components: {
    SoundOn, SoundOff
  },
  computed: {
    ...mapState("messages", ["isSoundAllowed"]),
  },
  methods: {
    ...mapActions("messages", ["toggleSoundAllowed"]),
  }
};
</script>

<style lang="scss" scoped>
.soundicon {
  width: 25px;
  height: 25px;
}
.ls-container {
  position: absolute;
  right: 50px;
  top: 7px;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
      border-bottom: initial;
    }
  }
}
</style>