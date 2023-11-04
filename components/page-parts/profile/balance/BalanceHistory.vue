<template>
  <div class="history">
    <p>{{ $t("balanceHistory.history") }}</p>
    <client-only>
      <div class="tabs">
        <ul class="tabNavigation">
          <li v-for="tab in tabs" :key="tab.id">
            <a
              @click.prevent="setTab(tab.id)"
              href="#"
              :class="{ selected: activeTab === tab.id }"
              >{{ tab.title }}
            </a>
          </li>
        </ul>
        <transition name="slide-left" mode="out-in">
          <external-payments
            v-if="activeTab === 'externalPayments'"
            key="externalPayments"
          />
          <internal-payments
            v-if="activeTab === 'internalPayments'"
            key="internalPayments"
          />
        </transition>
      </div>
    </client-only>
  </div>
</template>

<script>
import ExternalPayments from "./ExternalPayments.vue";
import InternalPayments from "./InternalPayments.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "BalanceHistory",
  data() {
    return {
      timer: null,
      tabs: [
        {
          title: this.$t("balanceHistory.externalPayments"),
          id: "externalPayments",
        },
        {
          title: this.$t("balanceHistory.internalPayments"),
          id: "internalPayments",
        },
      ],
      activeTab: "externalPayments",
    };
  },
  components: {
    ExternalPayments,
    InternalPayments,
  },

  methods: {
    ...mapActions("user", ["getMyProfile"]),
    async refreshTransactions() {
      await this.getMyProfile();
    },
    setTab(tabId) {
      this.activeTab = tabId;
    },
  },
  mounted() {
    this.refreshTransactions();
    this.timer = setInterval(() => {
      this.refreshTransactions();
    }, 15000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.tabNavigation {
  display: flex;
  border-bottom: 1px solid gray;
  li {
    margin-right: 1rem;
    padding-bottom: 1rem;
    a {
      color: gray !important;
    }
    .selected {
      cursor: default;
      color: #b87cf1 !important;
    }
  }
}
</style>
