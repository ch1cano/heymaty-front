<template>
  <div class="tab r-tabs-state-active">
    <div class="moneys">
      <div class="history">
        <p>{{ $t("profileGirls.subscriptions") }}</p>
        <table class="other3">
          <thead>
            <tr>
              <td>{{ $t("profileGirls.model") }}</td>
              <td colspan="2">{{ $t("profileGirls.subscriptionEnds") }}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sub in subsToShow" :key="sub._id">
              <td>
                <div class="name">
                  <div>
                    <n-link :to="localePath(`/profile/${getLink(sub.model)}`)" class="image">
                      <img class="girlavatar" :src="getAvatarUrl(sub.model)" />
                    </n-link>
                  </div>
                  <div>
                    <n-link
                      style="text-decoration: none"
                      :to="localePath(`/profile/${getLink(sub.model)}`)"
                    >{{ sub.model.name }}, {{ sub.model.realAge }}</n-link>
                    <div class="price">
                      <span>{{ toMoney(sub.model.pricePerDay) }}</span> HDC
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span class="pre">{{ $t("profileGirls.remain") }}</span>
                {{ endsBefore(sub.ends) }}
              </td>
              <td>
                <button
                  v-show="sub.model.subscriptionEnabled"
                  @click.prevent="showSubscribePopup(sub.model._id)"
                >{{ $t("profileGirls.prolong") }}</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>{{ $t("profileGirls.messageBundles") }}</p>
        <table class="other3">
          <thead>
            <tr>
              <td>{{ $t("profileGirls.model") }}</td>
              <td>{{ $t("profileGirls.messagesAmount") }}</td>
            </tr>
          </thead>
          <tbody>
            <model-messages-left v-for="mb in user.messageBundles" :key="mb._id" :mb="mb" />
          </tbody>
        </table>
        <div class="bottom-button">
          <button @click.prevent="goTo(localePath('/'))">{{ $t("profileGirls.seeMoreModels") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import SubscribePopup from "../../modals/SubscribePopup.vue";
import ModelMessagesLeft from "./ModelMessagesLeft.vue";
export default {
  components: { ModelMessagesLeft },
  name: "ProfileGirls",
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("subscribe", ["subscriptions"]),
    ...mapGetters("subscribe", ["isActiveSubscription"]),
    subsToShow() {
      return this.subscriptions.filter((s) =>
        this.isActiveSubscription(s.model._id)
      );
    },
  },
  methods: {
    endsBefore(date) {
      const diffdays = this.$dayjs(date).diff(this.$dayjs(), "day");
      const diffhours = this.$dayjs(date).diff(this.$dayjs(), "hour");
      const diffminutes = this.$dayjs(date).diff(this.$dayjs(), "minute");
      const diffseconds = this.$dayjs(date).diff(this.$dayjs(), "second");
      if (diffdays) return `${diffdays} ${this.$t("profileGirls.d")}`;
      if (diffhours) return `${diffhours} ${this.$t("profileGirls.h")}`;
      if (diffminutes) return `${diffminutes} ${this.$t("profileGirls.m")}`;
      return `${diffseconds} ${this.$t("profileGirls.s")}`;
    },
    showSubscribePopup(id) {
      // this.$modal.show(
      //   SubscribePopup,
      //   { id },
      //   { adaptive: true, width: "50%" }
      // );
      this.$vfm.show({
        component: SubscribePopup,
        bind: { id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.history {
  table {
    margin-bottom: 1rem;
  }
}
.girlavatar {
  width: 80px;
  height: 80px;
  border-radius: 10000px;
  object-fit: cover;
  max-width: initial;
}
</style>
