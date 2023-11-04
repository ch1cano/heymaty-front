<template>
  <footer class="footer">
    <div class="wrap flex">
      <ul>
        <li v-for="(item, i) in list" :key="i">
          <n-link :to="localePath(item.link)"> {{ item.title }} </n-link>
        </li>
        <li key="tel">
          <a href="tel:+35796164034">+35796164034</a>
        </li>
      </ul>
      <div class="payment">
        <img src="@/assets/img/payment.svg" />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      // list: [
      //   { title: this.$t("footer.privacyPolicy"), link: "/privacy" },
      //   { title: this.$t("footer.rules"), link: "/Terms" },
      // ],
    };
  },
  computed: {
    list() {
      return [
        { title: this.$t("footer.privacyPolicy"), link: "/privacy" },
        { title: this.$t("footer.rules"), link: "/Terms" },
      ];
    },
  },
};
</script>
