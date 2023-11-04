<template>
  <div class="tab r-tabs-state-active">
    <div class="moneys">
      <div class="top-info flex">
        <p v-if="user.role === 'girl'">
          {{ $t("profileBalance.subscribersCount") }}
          <span>{{ subscribersCount }}</span>
        </p>
        <p>
          <!-- {{ $t("profileBalance.currentBalance") }} -->
          <span
            >{{ toMoney(user.balance) }}
            <!-- <span title="Сумма транзакций в обработке"
              >({{ user.unconfirmedBalance }})</span
            > -->
          </span>
          HDC
        </p>
        <div v-if="showoutform" style="width: 100%">
          <p>{{ $t("profileBalance.enterTheAmount") }}</p>
          <div class="outform">
            <!-- <input
              class="outamount"
              :disabled="outloading"
              type="number"
              v-model="amount"
            /> -->
            <currency-input
              v-model="amount"
              :disabled="outloading"
              :options="{
                currency: 'HDC',
                valueRange: { min: 1, max: 10000 },
              }"
            />
            <button
              class="outbutton"
              :disabled="outloading"
              @click.prevent="handleRequestOut"
            >
              {{ $t("profileBalance.withdrawButton") }}
            </button>
          </div>
          <!-- <div style="margin: 0.5rem 0 1rem 0">
            При выводе средств помните - blockchain BTC взымает комиссию в
            размере 0.00016 BTC = 0.16 mBTC = 16000 satoshi за каждый вывод.
            Если к примеру вы запросите вывод средств в размере 100000 - вам на
            кошелек придут 84000. Суммы менее 16000 выводить нельзя.
          </div> -->
        </div>
      </div>

      <div class="top-fields fields">
        <!-- <p @click.prevent="showSecretInfo = !showSecretInfo">
          Платежная информация
        </p>
        <div v-if="showSecretInfo">
          <button @click.prevent="getWalletData">Get</button>
          <div v-for="(key, value) in walletInfo" :key="value">
            {{ value }}: {{ key }}
          </div>
        </div> -->
        <div v-if="user.role === 'user'">
          <div class="top-info">
            <div>
              <p>{{ $t("profileBalance.rechargeAmount") }}</p>

              <div v-if="elementsOptions.clientSecret">
                <div style="margin: 1rem 0">
                  {{
                    $t("profileBalance.rechargeNote2", {
                      amount: chargeAmountTotalInUSD,
                    })
                  }}
                </div>

                <stripe-element-payment
                    ref="paymentRef"
                    :pk="pk"
                    :elements-options="elementsOptions"
                    :confirm-params="confirmParams"
                />
                <button @click="pay" style="margin-top:1rem;">Pay Now</button>
              </div>
              <div v-else>
                <div style="display: flex; margin: 0.5rem 0 0 0">
                  <currency-input
                      v-model="chargeAmount"
                      class="inbtcaddress"
                      :options="{
                    currency: 'HDC',
                    valueRange: { min: 1, max: 100000 },
                  }"
                  />
                  <button :disabled="requestingCharge" @click.prevent="requestCharge">
                    {{ $t("profileBalance.rechargeButton") }}
                  </button>
                </div>
                <div style="margin: 0.5rem 0 0 0">
                  {{
                    $t("profileBalance.rechargeNote2", {
                      amount: chargeAmountTotalInUSD,
                    })
                  }}
                </div>
                <div style="margin: 0.5rem 0 0 0" v-if="info.siteComission && info.siteComission.data">
                  {{
                    $t("profileBalance.rechargeNote1", {
                      comission: info.siteComission
                          ? info.siteComission.data
                          : "...",
                    })
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Disabled for testing, enable later -->
        <!-- Just delete "false" from v-if statement -->
        <div
          v-if="false && (user.role === 'user' || user.role === 'girl')"
          class="inputs"
        >
          <p>{{ $t("profileBalance.withdrawalAddress") }}</p>
          <div class="paymentsform">
            <v-input
              class="outbtcaddress"
              v-model="payments.outBTCAddress"
              @input="clearError('wallet')"
              :error="errors.wallet"
              type="text"
            />
            <!-- <input
              class="outbtcaddress"
              type="text"
              v-model="payments.outBTCAddress"
            /> -->
            <button @click.prevent="doCopy(payments.outBTCAddress)">
              {{ $t("profileBalance.copy") }}
            </button>
            <button @click.prevent="showoutqr = !showoutqr">
              {{ $t("profileBalance.qrCode") }}
            </button>
            <button @click.prevent="handleSaveOutAddress">
              {{ $t("profileBalance.save") }}
            </button>
          </div>
          <transition name="fade">
            <qrcode-vue
              v-if="showoutqr"
              class="outqrcode"
              :value="payments.outBTCAddress"
              :size="300"
              level="H"
            />
          </transition>
          <!-- <input type="text" value="VISA" />
          <a href="#">
            <span>Изменить</span>
          </a> -->
        </div>

        <div class="history" v-if="user.role !== 'girl'">
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
                          {{ paymentIntent.status === 'succeeded' ? $t("externalPayments.succeeded") : $t("externalPayments.waiting") }}
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="#" @click.prevent="getCreatedPaymentIntent(paymentIntent._id)" v-if="paymentIntent.status !== 'succeeded'">
                        {{ $t("externalPayments.pay") }}
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </transition>
            </div>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import QrcodeVue from "qrcode.vue";
import CurrencyInput from "../../ui/CurrencyInput.vue";
import { validate } from "bitcoin-address-validation";

export default {
  name: "ProfileBalance",
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    QrcodeVue,
    CurrencyInput,
  },
  data() {
    return {
      info: {},
      showoutform: false,
      amount: 0,
      outloading: false,
      // showSecretInfo: false,
      chargeAmount: 0.0,
      requestingCharge: false,
      walletInfo: null,
      showoutqr: false,
      showinqr: false,
      payments: {
        inBTCAddress: "",
        outBTCAddress: "",
        creating: false,
      },
      errors: {
        wallet: {
          status: false,
          text: "",
        },
      },
      pk: process.env.STRIPE_PUBLIC_KEY,
      elementsOptions: {
        clientSecret: null,
        appearance: {},
      },
      confirmParams: {
        return_url: process.env.SOCKET_URL + this.localePath("/Settings/Balance"),
      },
      timer: null,
      paymentIntentList: [],
    };
  },
  computed: {
    ...mapState("subscribe", ["subscribers"]),
    chargeAmountTotalInUSD() {
      if (!this.info.siteComission) return this.chargeAmount;
      return (
        Math.ceil(
          parseInt(this.chargeAmount * 100) *
            (1 + parseInt(this.info.siteComission.data) / 100)
        ) / 100
      ).toFixed(2);
    },
    subscribersCount() {
      const now = new Date().getTime();
      return (
        this.subscribers.filter((s) => {
          return new Date(s.ends).getTime() > now;
        }).length || 0
      );
    },
  },
  methods: {
    ...mapActions("user", ["createInBTCAddress", "updateOutBTCAddress"]),
    clearError(type) {
      this.errors[type].status = false;
      this.errors[type].text = "";
    },
    setDefault() {
      if (this.user) {
        if (this.user.inBTCAddress) {
          this.payments.inBTCAddress = this.user.inBTCAddress;
        }
        if (this.user.outBTCAddress) {
          this.payments.outBTCAddress = this.user.outBTCAddress;
        }
      }
    },
    doCopy(val) {
      if (!val.trim()) return;
      this.$copyText(val).then(
        (e) => {
          this.$notify.success({
            message: `${val} ${this.$t(
              "profileBalance.notifications.copySuccess"
            )}`,
          });
        },
        (e) => {
          this.$notify.error({
            message: this.$t("profileBalance.notifications.copyFail"),
          });
        }
      );
    },
    async requestCharge() {
      const amount = parseInt(this.chargeAmount);
      if (!amount || amount < 1) {
        this.$notify.error({
          message: this.$t(
            "profileBalance.notifications.errorRechargeAmountIncorrect"
          ),
        });
        return;
      }
      this.requestingCharge = true;
      await this.generatePaymentIntent()
      this.requestingCharge = false;
    },

    // async getWalletData() {
    //   const { data } = await this.$api.get("/bitaps/wallet-state");
    //   this.walletInfo = data.walletState;
    // },
    async handleAddInBTCAdress() {
      this.payments.creating = true;
      const resp = await this.createInBTCAddress();
      if (resp && resp.paymentAddress) {
        this.payments.inBTCAddress = resp.paymentAddress;
        this.$notify.success({
          message: resp.message,
        });
      } else {
        this.$notify.error({
          message: this.$t(
            "profileBalance.notifications.errorCreatingInAddress"
          ),
        });
      }
      this.payments.creating = false;
    },
    async handleSaveOutAddress() {
      if (
        !this.payments.outBTCAddress ||
        !validate(this.payments.outBTCAddress, "mainnet")
      ) {
        this.errors.wallet.status = true;
        this.errors.wallet.text = this.$t(
          "profileBalance.errorInvalidWithdrawalAddress"
        );
        return;
      }
      const data = { outBTCAddress: this.payments.outBTCAddress };
      const response = await this.updateOutBTCAddress(data);
      if (response && response.type === "error") {
        let text = this.$t("profileBalance.notifications.errorGeneric");
        if (response.message && this.$errors_types[response.message]) {
          text = this.$errors_types[response.message];
        }
        this.$notify.error({
          title: this.$t("profileBalance.notifications.errorTitle"),
          message: text,
        });
        return;
      }
      this.$notify.success({
        message: this.$t(
          "profileBalance.notifications.successUpdatingWithdrawalAddress"
        ),
      });
    },

    async handleRequestOut() {
      //Not implemented yet!!!
      // this.$notify.error({
      //   message: `Вывод средств производится в ручном режиме! ${this.toCents(
      //     this.amount
      //   )} ${this.user.balance}`,
      // });
      // return;
      //---------------------
      try {
        this.outloading = true;
        if (this.toCents(this.amount) > this.user.balance) {
          this.$notify.error({
            message: this.$t(
              "profileBalance.notifications.errorWithdrawalAmountIncorrect"
            ),
          });
          this.outloading = false;
          return;
        }
        const send = {
          type: "redeem",
          title: "Запрос вывода средств",
          description: `Запрос вывода средств, пользователь ${this.user.name} ${this.user.email}, сумма: ${this.amount}`,
          details: {
            amount: this.toCents(this.amount),
          },
        };
        const { data } = await this.$api.post("/requests", send);
        this.$notify.success({
          title: data.message,
          message: this.$t("profileBalance.notifications.successWithdraw", {
            amount: this.toMoney(data.newRequest.details.amount),
          }),
        });
        this.amount = 0;
        this.outloading = false;
      } catch (error) {
        console.log(error.response.data);
        this.$notify.error({
          title: this.$t("profileBalance.notifications.errorTitle"),
          message: error?.response?.data?.error?.message,
        });
        this.outloading = false;
        return;
      }
    },
    async generatePaymentIntent () {
      const { data } = await this.$api.get(`/stripeNew/create-payment-intent?amount=${this.chargeAmountTotalInUSD}`);
      this.elementsOptions.clientSecret = data.clientSecret;
    },
    async getCreatedPaymentIntent (id) {
      const { data } = await this.$api.get(`/stripeNew/payment-intent/${id}`);
      this.elementsOptions.clientSecret = data.clientSecret;
      this.chargeAmount = data.payAmount;
    },
    pay () {
      this.$refs.paymentRef.submit();
    },
    async refreshTransactions() {
      const { data } = await this.$api.get(`/stripeNew/payment-intent-list`);
      this.paymentIntentList = data.paymentIntentList;
    },
  },
  mounted() {
    const { redirect_status } = this.$route.query
    if (redirect_status === 'succeeded') {
      this.$notify.success({
        message: this.$t("index.paymentMessageSuccess"),
      });
    }

    if (this.user.role !== 'girl') {
      this.refreshTransactions();
      this.timer = setInterval(() => {
        this.refreshTransactions();
      }, 15000);
    }
  },
  beforeDestroy() {
    if (this.user.role !== 'girl') {
      clearInterval(this.timer);
    }
  },
};
</script>
<style lang="scss" scoped>
.inqrcode,
.outqrcode {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 1rem;
}
.paymentsform {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  button {
    // margin-top: 15px;
    width: 30% !important;
    // color: #fff;
    // font-size: 20px;
    // border-radius: 36px;
    // background: #5171e4;
    &:first-of-type {
      margin-left: 0;
    }
    margin-left: 1rem;
  }
}
.inputs {
  p {
    font-size: 20px;
    margin-bottom: 0.5rem;
  }
  button {
    width: 255px;
    height: 53px !important;
    color: #fff;
    font-size: 20px;
    border-radius: 36px;
    background: #5171e4;
    margin-left: 1rem;
    &:hover {
      background: #e46974;
    }
    // margin-bottom: 15px;
    // margin-left: 1rem;
  }
}
.inbtcaddress {
  width: 100% !important;
}

.inpt__input {
  width: 100% !important;
}

.outbtcaddress {
  // margin-bottom: 0 !important;
  margin-bottom: 25px;
  .inpt__input {
    width: 100% !important;
  }
}
.createpaymentaddressbutton {
  width: 24%;
  height: 53px;
  color: #fff;
  border-radius: 36px;
  background: linear-gradient(272.29deg, #b277ef 0%, #dd94f9 98.03%);
  font-size: 18px;
}
.outamount {
  font-size: 18px;
  color: #4c5165;
  height: 53px;
  border-radius: 36px;
  background: rgba(234, 229, 246, 0.47);
  border: 1px solid #d5dbe7;
  padding: 0 30px;
  width: 100%;
  margin-right: 1rem;
}
.outform {
  display: flex;
}
.outbutton {
  width: 255px !important;
  height: 53px !important;
  color: #fff;
  font-size: 20px;
  border-radius: 36px;
  background: #5171e4;
  margin-left: 1rem;
  &:hover {
    background: #e46974;
  }
}
div#stripe-payment-element-errors {
  color: red;
  margin: 1rem 0;
}
</style>
