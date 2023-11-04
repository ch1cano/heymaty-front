<template>
  <div class="photo">
    <!-- <img src="@/assets/img/photo2.png" /> -->
    <n-link :to="localePath(`/profile/${getLink(item)}`)" class="image">
      <img class="preview" :src="getAvatarUrl(item)" />
    </n-link>
  </div>
</template>

<script>
export default {
  name: "GirlCardPreview",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.preview {
  aspect-ratio: 1/1;
  border-radius: 10000px;
  object-fit: cover;
}
</style>
