<template>
  <div class="history">
    <p>{{ $t("balanceHistory.history") }}</p>
    <client-only>
      <div class="tabs">
        <transition name="slide-left" mode="out-in">
          <table>
            <thead>
            <tr>
              <td>{{ $t("externalPayments.date") }}</td>
              <td>{{ $t("externalPayments.amount") }}</td>
              <td>{{ $t("externalPayments.status") }}</td>
              <td>{{ $t("externalPayments.info") }}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="paymentIntent in paymentIntentList" :key="paymentIntent._id">
              <td>
                {{ $d(new Date(paymentIntent.createdAt), "long") }}
              </td>
              <td>
                <div class="price">
                  <span>
                    + {{ toMoney(paymentIntent.balanceAmount) }} <span>HDC</span>
                  </span>
                </div>
              </td>
              <td>
                <div class="price">
                  <div>
                    {{ paymentIntent.status }}
                  </div>
                </div>
              </td>
              <td>
                <a :href="localePath(`/settings/balance?paymentIntent=${paymentIntent._id}`)" v-if="paymentIntent.status !== 'succeeded'">
                  {{ 'pay' }}
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </transition>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "BalanceHistoryStripe",
  data() {
    return {
      timer: null,
      paymentIntentList: [],
    };
  },

  methods: {

    setTab(tabId) {
      this.activeTab = tabId;
    },
  },

};
</script>
