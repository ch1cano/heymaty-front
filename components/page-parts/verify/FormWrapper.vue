<template>
  <div class="verify-page">
    <h1>{{ $t("verifyPage.verification") }}</h1>
    <h2>{{ $t("verifyPage.verificationDescription") }}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MultiPageVerifyForm",
  data() {
    return {};
  },
};
</script>
