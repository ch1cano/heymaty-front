<template>
  <div>
    <div class="page-top-name">
      <div class="wrap">
        <h1>{{ $t("about.title") }}</h1>
      </div>
    </div>
    <div class="wrap">
      <div class="search-page">
        <div class="flex">
          <girl-card-preview
            v-for="item in modelsData"
            :key="item._id"
            :item="item"
          />
        </div>

        <p>
          {{ $t("about.description") }}
        </p>
        <button @click.prevent="goTo(localePath('/'))">
          {{ $t("about.buttonText") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import GirlCardPreview from "@/components/page-parts/about/GirlCardPreview";
export default {
  name: "PageAbout",
  components: {
    GirlCardPreview,
  },
  async asyncData({ store, route }) {
    let data = await store.dispatch("models/getModels");
    let modelsData = Array.from(data.models);
    modelsData = modelsData
      .sort((a, b) => 0.5 - Math.random())
      // .filter((i) => i.profile) // filter by profile image
      .slice(0, 6);
    return { modelsData };
  },
  methods: {},
};
</script>
