<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    v-on="$listeners"
  >
    <div class="container">
      <div v-if="loading" class="blur">
        <div>{{ $t("coinbasePaymentPopup.loading") }}</div>
      </div>
      <div v-if="initial" class="popupcont">
        <div v-if="!expired" class="paymentscont">
          <RemainTimeLine :totalTime="1 * 60 * 60" :remainTime="expires_sec" />
          <div class="paymentstitle">
            <div>
              <p>
                {{
                  $t("coinbasePaymentPopup.username", { username: user.name })
                }}
              </p>
              <p>
                {{
                  $t("coinbasePaymentPopup.amount", {
                    amount: charge.pricing.local.amount,
                    currency: charge.pricing.local.currency,
                  })
                }}
              </p>
              <p>
                {{
                  $t("coinbasePaymentPopup.amountToAdd", {
                    amount: charge.metadata.amountInUSD,
                  })
                }}
              </p>
            </div>
          </div>
          <div class="payments">
            <div class="paymentsdescr">
              {{ $t("coinbasePaymentPopup.chooseCrypto") }}
            </div>
            <div class="currencies">
              <div v-for="c in payments" :key="c.code">
                <button @click.prevent="selectedCurrency = c">
                  {{ c.code }}
                </button>
              </div>
            </div>
            <div v-if="selectedCurrency">
              <div class="paymentspricings">
                <qrcode-vue
                  class="outqrcode"
                  :value="selectedCurrency.address"
                  :size="200"
                  level="H"
                />
                <div class="paymentsdetails">
                  <div class="amount">
                    <div>{{ $t("coinbasePaymentPopup.send") }}</div>
                    <div
                      @click.prevent="doCopy(selectedCurrency.amount)"
                      class="copyme"
                      :title="$t('coinbasePaymentPopup.amountCopyTitle')"
                    >
                      {{ selectedCurrency.amount }}
                    </div>
                    {{ selectedCurrency.code }}
                  </div>
                  <div class="address">
                    <div>{{ $t("coinbasePaymentPopup.sendTo") }}</div>
                    <div
                      class="copyme"
                      @click.prevent="doCopy(selectedCurrency.address)"
                      :title="$t('coinbasePaymentPopup.sendToCopyTitle')"
                    >
                      {{ selectedCurrency.address }}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {{ $t("coinbasePaymentPopup.copyAdvise") }}
              </div>
            </div>
          </div>
          <div class="paymentcheck">
            <div class="descr">
              <p>
                {{ $t("coinbasePaymentPopup.infoText") }}
              </p>
            </div>
            <div class="spinner">&nbsp;</div>
            <div class="status">
              <p>
                {{
                  $t("coinbasePaymentPopup.currentStatus", {
                    status: chargeStatus,
                  })
                }}
              </p>
            </div>
            <!-- <p>
              Текущий тип: {{ checkedCharge ? checkedCharge.type : "Ожидание" }}
            </p> -->
          </div>
          <div class="buttons">
            <button @click="close">
              {{ $t("coinbasePaymentPopup.cancelButton") }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="success" class="successcont">
        <div class="successmessage">
          <p>{{ $t("coinbasePaymentPopup.success1") }}</p>
          <p>{{ $t("coinbasePaymentPopup.success2") }}</p>
        </div>
        <button @click="close">
          {{ $t("coinbasePaymentPopup.closeButton") }}
        </button>
      </div>
      <div v-if="failure" class="failurecont">
        <div v-if="expired" class="failuremessage">
          <div class="expired">
            {{ $t("coinbasePaymentPopup.failureExpired") }}
          </div>
        </div>
        <div v-else class="failuremessage">
          {{ $t("coinbasePaymentPopup.failureGeneric") }}
        </div>
        <button @click="close">
          {{ $t("coinbasePaymentPopup.closeButton") }}
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import QrcodeVue from "qrcode.vue";
import RemainTimeLine from "../ui/RemainTimeLine.vue";

export default {
  name: "CoinbasePaymentPopup",
  props: {
    charge: {
      type: Object,
      required: true,
    },
  },
  components: {
    QrcodeVue,
    RemainTimeLine,
  },
  data() {
    return {
      loading: true,
      success: false,
      failure: false,
      initial: true,
      selectedCurrency: null,
      expires_at: null,
      expires_sec: 0,
      expiration_timer: null,
      expired: false,
      check_charge_timer: null,
      checkedCharge: null,
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    chargeStatus() {
      if (!this.checkedCharge)
        return this.$t("coinbasePaymentPopup.statuses.waiting");
      //charge:created, charge:confirmed, charge:failed, charge:delayed, charge:pending, charge:resolved
      if (this.checkedCharge.type === "charge:created")
        return this.$t("coinbasePaymentPopup.statuses.created");
      if (this.checkedCharge.type === "charge:confirmed")
        return this.$t("coinbasePaymentPopup.statuses.confirmed");
      if (this.checkedCharge.type === "charge:pending")
        return this.$t("coinbasePaymentPopup.statuses.pending");
      return this.$t("coinbasePaymentPopup.statuses.waiting");
    },
    payments() {
      if (!this.charge || !this.charge.addresses) return;
      const ret = [];
      Object.entries(this.charge.addresses).forEach((a) => {
        const p = {
          currency: a[0],
          address: a[1],
          amount: this.charge.pricing[a[0]].amount,
          code: this.charge.pricing[a[0]].currency,
        };
        ret.push(p);
      });
      return ret;
    },
  },
  watch: {},
  methods: {
    ...mapActions("user", ["getMyProfile"]),
    doCopy(val) {
      if (!val.trim()) return;
      this.$copyText(val).then(
        (e) => {
          this.$notify.success({
            message: `${val} ${this.$t(
              "coinbasePaymentPopup.notifications.copySuccess"
            )}`,
          });
        },
        (e) => {
          this.$notify.error({
            message: this.$t("coinbasePaymentPopup.notifications.copyFail"),
          });
        }
      );
    },
    async checkCharge() {
      const { data: charge } = await this.$api.post(
        "/coinbase/charge-info/" + this.charge.code
      );
      if (charge) this.checkedCharge = charge;
      if (this.checkedCharge.confirmed) {
        this.success = true;
        this.initial = false;
        await this.getMyProfile();
      }
    },
    checkExpired() {
      const s = this.expires_at.diff(this.$dayjs(), "second");
      this.expires_sec = s;
      if (s < 0) {
        this.failure = true;
        this.expired = true;
        this.initial = false;
      }
    },
  },
  async mounted() {
    this.loading = false;
    this.expires_at = this.$dayjs(this.charge.expires_at);
    this.checkExpired();
    this.expiration_timer = setInterval(() => {
      this.checkExpired();
    }, 1000);
    this.check_charge_timer = setInterval(async () => {
      await this.checkCharge();
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(this.expiration_timer);
    clearInterval(this.check_charge_timer);
  },
};
</script>

<style lang="scss" scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.spinner {
  position: relative;
  width: 100%;
}
.spinner:before {
  position: absolute;
  content: "";
  top: 0;
  height: 10px;
  // background-color: #b277ef;
  background: #5171e4;
  animation: first-line 1.5s ease infinite;
}

@keyframes first-line {
  0% {
    left: 0%;
    width: 0%;
  }
  50% {
    left: 25%;
    width: 50%;
  }
  100% {
    left: 100%;
    width: 0%;
  }
}

.paymentscont {
  button {
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    border-radius: 36px;
    // background: linear-gradient(272.29deg, #b277ef 0%, #dd94f9 98.03%);
    background: #5171e4;
    width: 255px;
    height: 54px;
    margin-right: 1rem;
    margin-top: 1rem;
  }
}
.paymentstitle {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  div {
    p {
      font-size: 1.5rem;
    }
  }
}
.payments {
  padding: 0.5rem;
  .paymentsdescr {
    font-size: 1.25rem;
    padding-bottom: 0rem;
  }
  .currencies {
    display: flex;
    padding-bottom: 1rem;
    div {
      width: 100%;
      margin-right: 2px;
      button {
        width: 100%;
        height: 30px;
        color: #fff;
        border-radius: 6px;
        // background: linear-gradient(272.29deg, #b277ef 0%, #dd94f9 98.03%);
        background: #5171e4;
        font-size: 18px;
      }
    }
  }
  .paymentspricings {
    display: flex;
    .paymentsdetails {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
    .outqrcode {
      padding-right: 1rem;
    }
    .amount {
      font-size: 1.3rem;
      .copyme {
        cursor: pointer;
        // text-decoration: underline;
        max-width: 200px;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 700;
      }
      button {
        height: 30px;
        color: #fff;
        border-radius: 6px;
        // background: linear-gradient(272.29deg, #b277ef 0%, #dd94f9 98.03%);
        background: #5171e4;
        font-size: 18px;
      }
    }
    .address {
      font-size: 1.3rem;
      .copyme {
        cursor: pointer;
        // text-decoration: underline dotted;
        max-width: 200px;
        // text-overflow: ellipsis;
        // overflow: hidden;
        word-wrap: break-word;
        font-weight: 700;
      }
      button {
        height: 30px;
        color: #fff;
        border-radius: 6px;
        // background: linear-gradient(272.29deg, #b277ef 0%, #dd94f9 98.03%);
        background: #5171e4;
        font-size: 18px;
      }
    }
  }
}
.paymentcheck {
  padding: 0.5rem;
  .descr {
    font-size: 1rem;
    max-width: 450px;
    padding-bottom: 0.4rem;
  }
  .status {
    font-size: 1.25rem;
  }
}
.buttons {
  padding: 0.5rem;
  display: flex;
  justify-content: center;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.container {
  position: relative;
}
.blur {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  line-height: 1;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.blur div {
  font-size: 2rem;
}
.rounded {
  border-radius: 10000px;
  width: 70px;
  height: 70px;
  object-fit: cover;
  border: 1px solid #b87cf1;
}
.modelinfo {
  display: flex;
  padding: 22px 35px;
  border-bottom: 1px solid #d5dbe7;
}
.modelinfo div img {
  margin-right: 20px;
}
.modelname {
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
}
.modeltext {
  font-size: 16px;
  line-height: 130%;
  color: #575757;
}
.userinfo {
  font-size: 26px;
  line-height: 150%;
  color: #575757;
  margin-top: 10px;
}
.usercont {
  padding: 22px 35px;
}
.successcont,
.failurecont {
  font-size: 26px;
  line-height: 150%;
  color: #575757;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 30px;
}
.successmessage {
}
.failuremessage {
}
.successcont button,
.failurecont button {
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  border-radius: 36px;
  // background: linear-gradient(272.29deg, #b277ef 0%, #dd94f9 98.03%);
  background: #5171e4;
  width: 255px;
  height: 54px;
  margin-right: 1rem;
  margin-top: 1rem;
}
.subscribeform > div {
  display: flex;
  align-items: center;
}
.subscribeform > div > div {
  white-space: nowrap;
  font-size: 26px;
  line-height: 150%;
  color: #575757;
  margin-right: 20px;
}
.subscribeform input {
  width: 100%;
  font-size: 18px;
  color: #4c5165;
  height: 53px;
  border-radius: 36px;
  background: rgba(234, 229, 246, 0.47);
  border: 1px solid #d5dbe7;
  padding: 0 30px;
}
.subscribetotal {
  font-size: 26px;
  line-height: 150%;
  color: #575757;
}
.usercont button {
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  border-radius: 36px;
  // background: linear-gradient(272.29deg, #b277ef 0%, #dd94f9 98.03%);
  background: #5171e4;
  width: 255px;
  height: 54px;
  margin-right: 1rem;
  margin-top: 1rem;
}
</style>
