<template>
  <table>
    <thead>
      <tr>
        <td>{{ $t("externalPayments.date") }}</td>
        <td>{{ $t("externalPayments.amount") }}</td>
        <td>{{ $t("externalPayments.direction") }}</td>
        <td>{{ $t("externalPayments.status") }}</td>
        <td>{{ $t("externalPayments.info") }}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in externalPayments" :key="transaction._id">
        <td>
          {{ $d(new Date(transaction.date), "long") }}
          <!-- {{ $dayjs(transaction.date).format("DD.MM.YYYY HH:mm:ss") }} -->
        </td>
        <td>
          <div class="price">
            <span v-if="transaction.direction === 'in'"
              >+ {{ toMoney(transaction.amount) }} <span>HDC</span></span
            >
            <span v-else
              >- {{ toMoney(transaction.amount) }} <span>HDC</span></span
            >
          </div>
        </td>
        <td>
          <div v-if="transaction.direction === 'in'" class="status">
            {{ $t("externalPayments.adding") }}
          </div>
          <div v-else class="status bad">
            {{ $t("externalPayments.substracting") }}
          </div>
        </td>
        <td>
          <div class="price">
            <div>
              {{ transaction.message.statusMessage }}
            </div>
          </div>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "ExternalPayments",
  data() {
    return {
      transactions: [],
      requests: [],
      transloading: false,
      timer: null,
    };
  },
  computed: {
    externalPayments() {
      const hist = [];
      this.transactions.forEach((t) => {
        let statusMessage = this.$t(
          "externalPayments.transStatusMessage.unknown"
        );
        if (t.type) {
          //charge:created, charge:confirmed, charge:failed, charge:delayed, charge:pending
          if (t.type === "charge:created")
            statusMessage = this.$t(
              "externalPayments.transStatusMessage.created"
            );
          if (t.type === "charge:confirmed")
            statusMessage = this.$t(
              "externalPayments.transStatusMessage.confirmed"
            );
          if (t.type === "charge:failed")
            statusMessage = this.$t(
              "externalPayments.transStatusMessage.failed"
            );
          if (t.type === "charge:delayed")
            statusMessage = this.$t(
              "externalPayments.transStatusMessage.delayed"
            );
          if (t.type === "charge:pending")
            statusMessage = this.$t(
              "externalPayments.transStatusMessage.pending"
            );
        }
        const entry = {
          _id: t._id,
          date: t.createdAt,
          amount: t.amount,
          direction: t.direction,
          message: {
            status: t.confirmed,
            statusMessage,
            type: "external",
          },
        };
        hist.push(entry);
      });
      this.requests.forEach((t) => {
        let statusMessage = this.$t(
          "externalPayments.reqStatusMessage.unknown"
        );
        if (t.status) {
          if (t.status === "new" || t.status === "seen")
            statusMessage = this.$t(
              "externalPayments.reqStatusMessage.created"
            );
          if (t.status === "approved")
            statusMessage = `${this.$t(
              "externalPayments.reqStatusMessage.confirmed"
            )}. ${t.statusText}`;
          if (t.status === "rejected")
            statusMessage = `${this.$t(
              "externalPayments.reqStatusMessage.rejected"
            )}. ${t.statusText}`;
        }
        const entry = {
          _id: t._id,
          date: t.createdAt,
          amount: t.details.amount,
          direction: "out",
          message: {
            status: t.status !== "new" && t.status !== "seen",
            statusMessage,
            type: "external",
          },
        };
        hist.push(entry);
      });
      return hist.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
  methods: {
    ...mapActions("user", ["getMyTransactions", "getMyRequests"]),
    async refreshTransactions() {
      this.transloading = true;
      // this.$nuxt.$loading.start();
      const { transactions } = await this.getMyTransactions();
      const { requests } = await this.getMyRequests();
      this.transactions = transactions;
      this.requests = requests;
      this.transloading = false;
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

<style lang="scss" scoped></style>
