<template>
  <div>
    <table>
      <thead>
        <tr>
          <td>{{ $t("internalPayments.date") }}</td>
          <td>{{ $t("internalPayments.amount") }}</td>
          <td>{{ $t("internalPayments.direction") }}</td>
          <td>{{ $t("internalPayments.status") }}</td>
          <td>{{ $t("internalPayments.info") }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in payments" :key="transaction._id">
          <td>
            {{ $d(new Date(transaction.registerDate), "medium") }}
            <!-- {{ $dayjs(transaction.registerDate).format("DD.MM.YYYY HH:mm:ss") }} -->
          </td>
          <td>
            <div class="price">
              <span v-if="transaction.to._id === user._id"
                >+ {{ toMoney(transaction.amount) }} <span>HDC</span></span
              >
              <span v-if="transaction.from._id === user._id"
                >- {{ toMoney(transaction.amount) }} <span>HDC</span></span
              >
            </div>
          </td>
          <td>
            <div v-if="transaction.to._id === user._id" class="status">
              {{ $t("internalPayments.adding") }}
            </div>
            <div v-if="transaction.from._id === user._id" class="status bad">
              {{ $t("internalPayments.substracting") }}
            </div>
          </td>
          <td>
            <div class="price">
              <div>
                <div>
                  {{ getStatus(transaction) }}
                </div>
                <div>
                  <span v-if="transaction.to._id === user._id"
                    >{{ $t("internalPayments.subscriber") }}
                    <n-link
                      style="text-decoration: none; font-weight: 300"
                      :to="localePath(`/profile/${getLink(transaction.from)}`)"
                      >{{ transaction.from.name }}</n-link
                    ></span
                  >
                  <span v-if="transaction.from._id === user._id"
                    >{{ $t("internalPayments.model") }}
                    <n-link
                      style="text-decoration: none; font-weight: 300"
                      :to="localePath(`/profile/${getLink(transaction.to)}`)"
                      >{{ transaction.to.name }}</n-link
                    ></span
                  >
                </div>
                <div>
                  <span
                    :title="$t('internalPayments.actualPayoutDateTitle')"
                    v-if="transaction.finished"
                  >
                    <span v-if="!transaction.holded">
                      {{ $t("internalPayments.actualPayoutDate") }}
                      <span style="font-weight: 300">
                        {{
                          $d(new Date(transaction.actualPayoutDate), "medium")
                        }}
                        <!-- {{ fd(transaction.actualPayoutDate) }} -->
                      </span>
                    </span>
                  </span>
                  <span
                    :title="$t('internalPayments.plannedPayoutDateTitle')"
                    v-else
                    >{{ $t("internalPayments.plannedPayoutDate") }}
                    <span style="font-weight: 300">
                      {{
                        $d(new Date(transaction.plannedPayoutDate), "medium")
                      }}
                      <!-- {{ fd(transaction.plannedPayoutDate) }} -->
                    </span></span
                  >
                </div>
                <div>
                  <span v-if="transaction.sub">
                    <span>
                      {{ $t("internalPayments.forSub") }}
                    </span>
                  </span>
                  <span v-if="transaction.message">
                    <span>
                      {{ $t("internalPayments.forMessage") }}
                    </span>
                  </span>
                  <span v-if="transaction.bundle">
                    <span>
                      {{ $t("internalPayments.forBundle") }}
                    </span>
                  </span>
                  <span v-if="transaction.donation">
                    <span>
                      {{ $t("internalPayments.forDonation") }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div>
              <div
                v-if="
                  !transaction.holded &&
                  !transaction.finished &&
                  !transaction.claim
                "
              >
                <button
                  v-if="transaction.from._id === user._id"
                  @click.prevent="claimPayment(transaction, transaction.to._id)"
                >
                  {{ $t("internalPayments.claimButton") }}
                </button>
                <div v-if="transaction.to._id === user._id">
                  <button @click="claimInfo(transaction)">
                    {{ $t("internalPayments.infoButton") }}
                  </button>
                </div>
              </div>
              <div v-else>
                <button @click="claimInfo(transaction)">
                  {{ $t("internalPayments.infoButton") }}
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      v-model="localPage"
      :page-count="totalPages || 0"
      :prev-text="$t('internalPayments.prev')"
      :next-text="$t('internalPayments.next')"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :prev-class="'page-prev'"
      :next-class="'page-next'"
      :click-handler="onPaginate"
    />
  </div>
</template>

<script>
import ClaimInfoPopup from "../../../modals/ClaimInfoPopup.vue";
import ClaimPaymentPopup from "../../../modals/ClaimPaymentPopup.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "InternalPayments",
  data() {
    return {
      localPage: 1,
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("payments", [
      "payments",
      "totalPages",
      "totalDocs",
      "hasNextPage",
      "hasPrevPage",
      "nextPage",
      "prevPage",
      "paymentsLoading",
      "page",
      "limit",
    ]),
    // internalPayments() {
    //   const hist = [];

    //   if (this.user.role === "girl") {
    //     this.subscribers.forEach((sub) => {
    //       sub.payments.forEach((p) => {
    //         let statusMessage = "В ожидании";
    //         if (p.finished) statusMessage = "Утвержден";
    //         if (p.holded) statusMessage = "Заморожен";
    //         if (p.finished && p.holded) statusMessage = "Возмещен";
    //         const message = {
    //           type: "internal",
    //           status: p.finished,
    //           statusMessage,
    //           holded: p.holded,
    //           finished: p.finished,
    //           claim: p.claim,
    //           from: sub.subscriber,
    //           date: p.actualPayoutDate
    //             ? p.actualPayoutDate
    //             : p.plannedPayoutDate,
    //         };
    //         const entry = {
    //           _id: p._id,
    //           payment: p,
    //           date: p.registerDate,
    //           amount: p.amount,
    //           direction: "in",
    //           message,
    //         };
    //         hist.push(entry);
    //       });
    //     });
    //   }
    //   if (this.user.role === "user") {
    //     this.subscriptions.forEach((sub) => {
    //       sub.payments.forEach((p) => {
    //         let statusMessage = "В ожидании";
    //         if (p.finished) statusMessage = "Утвержден";
    //         if (p.holded) statusMessage = "Заморожен";
    //         if (p.finished && p.holded) statusMessage = "Возмещен";
    //         const message = {
    //           type: "internal",
    //           status: p.finished,
    //           statusMessage,
    //           holded: p.holded,
    //           finished: p.finished,
    //           claim: p.claim,
    //           to: sub.model,
    //           date: p.actualPayoutDate
    //             ? p.actualPayoutDate
    //             : p.plannedPayoutDate,
    //         };
    //         const entry = {
    //           _id: p._id,
    //           payment: p,
    //           date: p.registerDate,
    //           amount: p.amount,
    //           direction: "out",
    //           message,
    //         };
    //         hist.push(entry);
    //       });
    //     });
    //   }

    //   return hist.sort((a, b) => new Date(b.date) - new Date(a.date));
    // },
  },
  methods: {
    ...mapActions("subscribe", [
      "getAllMySubscriptions",
      "getAllMySubscribers",
    ]),
    ...mapActions("payments", ["getPayments"]),
    onPaginate(e) {
      console.log(e);
    },
    getStatus(transaction) {
      let statusMessage = this.$t("internalPayments.transStatus.inWait");
      if (transaction.finished)
        statusMessage = this.$t("internalPayments.transStatus.finished");
      if (transaction.holded)
        statusMessage = this.$t("internalPayments.transStatus.holded");
      if (transaction.finished && transaction.holded)
        statusMessage = this.$t("internalPayments.transStatus.refunded");
      return statusMessage;
    },
    fd(date) {
      return this.$dayjs(date).format("DD.MM.YYYY HH:mm:ss");
    },
    claimInfo(transaction) {
      this.$vfm.show({
        component: ClaimInfoPopup,
        bind: { transaction },
      });
    },
    async claimPayment(payment, target) {
      this.$vfm.show({
        component: ClaimPaymentPopup,
        bind: { payment, target },
      });
    },
  },
  watch: {
    async localPage() {
      await this.getPayments({ page: this.localPage, limit: this.limit });
    },
  },
  async mounted() {
    await this.getPayments({ page: this.page, limit: this.limit });
    this.localPage = this.page;
  },
};
</script>

<style lang="scss" scoped>
::v-deep ul.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  li {
    margin-right: 10px;
    a {
      font-size: 1.5rem !important;
    }
  }
  .disabled {
    a {
      color: gray !important;
      cursor: default;
    }
  }
  .active {
    a {
      text-decoration: underline !important;
    }
  }
}
</style>
