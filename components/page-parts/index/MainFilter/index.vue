<template>
<div>
  <!-- <div class="index-filter flex">
    <SearchSelector />
  </div> -->
  <div class="index-filter flex">
    <CountriesSelector />
    <CitiesSelector />
    <AgesSelector />
    <LanguagesSelector />
    <button @click="onClick">
      {{ $t("index.searchButtonText") }}
    </button>
  </div>
</div>
</template>
<script>
import CountriesSelector from "./CountriesSelector";
import SearchSelector from "./SearchSelector";
import CitiesSelector from "./CitiesSelector";
import AgesSelector from "./AgesSelector";
import LanguagesSelector from "./LanguagesSelector";

export default {
  name: "MainFilter",
  components: {
    SearchSelector,
    CountriesSelector,
    CitiesSelector,
    AgesSelector,
    LanguagesSelector,
  },
  methods: {
    onClick() {
      this.$emit("doFilter");
    },
  },
};
</script>
<style lang="scss"></style>
