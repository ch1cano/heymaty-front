<template>
  <profile-card :profile="user" :mine="true" />
</template>

<script>
import { mapState, mapActions } from "vuex";

import ProfileCard from "@/components/page-parts/profile/ProfileCard";

export default {
  name: "PageProfile",
  components: {
    ProfileCard,
  },
  async asyncData({ store, route }) {
    const response = await store.dispatch("user/getMyProfile");
    return { response };
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {},
  mounted() {},
};
</script>
