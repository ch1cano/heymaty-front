<template>
  <tr>
    <td>
      <div v-if="loading" class="name">{{ $t("modelMessagesLeft.loading") }}</div>
      <div v-else class="name">
        <div>
          <n-link :to="localePath(`/profile/${getLink(model)}`)" class="image">
            <img class="girlavatar" :src="getAvatarUrl(model)" />
          </n-link>
        </div>
        <div>
          <n-link
            style="text-decoration: none"
            :to="localePath(`/profile/${getLink(model)}`)"
          >{{ model.name }}, {{ model.realAge }}</n-link>
          <div class="price"></div>
        </div>
      </div>
    </td>
    <td>
      <div class="price">
        <span>{{ mb.messages }}</span>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ModelMessagesLeft",
  props: {
    mb: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      model: {},
    };
  },
  methods: {
    ...mapActions("user", ["getUserById"]),
  },
  async mounted() {
    this.model = await this.getUserById({ id: this.mb.model });
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.girlavatar {
  width: 80px;
  height: 80px;
  border-radius: 10000px;
  object-fit: cover;
  max-width: initial;
}
</style>
