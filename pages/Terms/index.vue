<template>
  <div class="wrap">
    <div class="search-page">
      <TermsContent />
      <button @click.prevent="goTo(localePath('/'))">
        {{ $t("rules.goFindButton") }}
      </button>
    </div>
  </div>
</template>

<script>
import TermsContent from "@/components/page-parts/terms/TermsContent.vue";
export default {
  name: "PageRules",
  components: { TermsContent },
};
</script>

<style lang="scss" scoped></style>
