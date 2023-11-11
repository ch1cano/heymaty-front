<template>
  <div>
    <section class="index-first-block">
      <!-- <div class="wrap">
        <div class="text">
          <span> {{ $t("index.title") }} </span>
          <p>{{ $t("index.description") }}</p>
        </div>
      </div> -->
    </section>

    <div class="container-wrap">
      <client-only>
        <MainFilter />
      </client-only>

      <section class="index-catalog flex">
        <p v-if="models.length === 0" class="no-models">
          {{ $t("index.modelNotFound") }}
        </p>

        <transition name="fade" v-for="(item, i) in models" :key="i">
          <girl-card :item="item" />
        </transition>
      </section>
      <infinite-loading
        v-if="models.length"
        spinner="bubbles"
        @infinite="infiniteScroll"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import GirlCard from "@/components/page-parts/index/GirlCard";
import MainFilter from "@/components/page-parts/index/MainFilter";

export default {
  name: "PageIndex",
  components: {
    GirlCard,
    MainFilter,
  },
  computed: {
    ...mapState("models", [
      "models",
      "selectedCountry",
      "selectedCities",
      "selectedAges",
      "selectedLanguages",
      "hasNextPage",
      "searchName",
      "page"
    ]),
  },
  methods: {
    async infiniteScroll($state) {
      const data = {
          name: this.searchName,
          ages: this.selectedAges,
          languages: this.selectedLanguages.map(item => item?.value),
          cities: this.selectedCities.map(item => item?.value),
          country: this.selectedCountry?.value
        };
        await this.$store.dispatch("models/getModels", data);
      $state[this.hasNextPage && this.models.length > 1 ? "loaded" : "complete"]();
    },
  },
  async asyncData({ store, route }) {
    store.dispatch("models/resetModels");
    await store.dispatch("models/getModels",{});
  },
};
</script>

<style lang="scss">
.no-models {
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin-bottom: 25px;
}
</style>
