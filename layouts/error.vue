<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;
      margin-top: auto;
    "
  >
    <h1 v-if="error.statusCode === 404">{{ $t("errorPage.404") }}</h1>
    <h1 v-else-if="error.statusCode === 401">{{ $t("errorPage.401") }}</h1>
    <h1 v-else-if="error.statusCode === 403">{{ $t("errorPage.403") }}</h1>
    <h1 v-else>{{ $t("errorPage.generic") }}</h1>
    <NuxtLink :to="localePath('/')">{{ $t("errorPage.goBackHome") }}</NuxtLink>
  </div>
</template>
<script>
export default {
  props: ["error"],
};
</script>