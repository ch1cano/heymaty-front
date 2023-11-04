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
        <div>{{ $t("claimPaymentPopup.loading") }}</div>
      </div>
      <div v-if="initial" class="popupcont">
        <div class="modelinfo">
          <div>
            <img style="max-height: 70px" :src="getAvatarUrl(model)" class="rounded" />
          </div>
          <div>
            <div class="modelname">
              {{ model.name }},
              {{ $tc("claimPaymentPopup.userAge", model.realAge) }}
            </div>
            <div class="modeltext">
              {{ $t("claimPaymentPopup.paymentAmount") }}
              {{ toMoney(payment.amount) }}
              <span>HDC</span>
            </div>
            <div v-if="payment.sub" class="modeltext">
              {{ $t("claimPaymentPopup.period") }}
              <!-- {{ $dayjs(payment.periodStart).format("DD.MM.YYYY HH:mm:ss") }} -->
              {{ $d(new Date(payment.periodStart), "medium") }}
              -
              <!-- {{ $dayjs(payment.periodEnd).format("DD.MM.YYYY HH:mm:ss") }} -->
              {{ $d(new Date(payment.periodEnd), "medium") }}
            </div>
            <div v-if="payment.message" class="modeltext">{{ $t("claimPaymentPopup.forMessage") }}</div>
            <div v-if="payment.bundle" class="modeltext">{{ $t("claimPaymentPopup.forBundle") }}</div>
            <div v-if="payment.donation" class="modeltext">{{ $t("claimPaymentPopup.forDonation") }}</div>
          </div>
        </div>
        <div class="usercont">
          <div class="userinfo">{{ $t("claimPaymentPopup.requestForAppeal") }}</div>
          <div>
            <p>{{ $t("claimPaymentPopup.requestInfo1") }}</p>
            <p>{{ $t("claimPaymentPopup.requestInfo2") }}</p>
          </div>
          <!-- <div class="userinfo">
            <div>
              <span style="font-weight: 500">Ваш баланс:</span>
              {{ toMoney(user.balance) }} <span>$</span>
            </div>
          </div>-->
          <div class="subscribeform">
            <div>
              <div>
                <span style="font-weight: 500">
                  {{
                    $t("claimPaymentPopup.title")
                  }}
                </span>
              </div>
              <input v-model="title" />
            </div>
            <div>
              <div>
                <span style="font-weight: 500">
                  {{
                    $t("claimPaymentPopup.descr")
                  }}
                </span>
              </div>
              <textarea v-model="description" rows="3"></textarea>
            </div>
          </div>
          <button @click="handleSendClaim">{{ $t("claimPaymentPopup.appeal") }}</button>
          <button @click="close">{{ $t("claimPaymentPopup.cancel") }}</button>
        </div>
      </div>
      <div v-if="success" class="successcont">
        <div class="successmessage">{{ $t("claimPaymentPopup.success") }}</div>
        <button @click="close">{{ $t("claimPaymentPopup.close") }}</button>
      </div>
      <div v-if="failure" class="failurecont">
        <div class="failuremessage">{{ $t("claimPaymentPopup.failure") }}</div>
        <button @click="close">{{ $t("claimPaymentPopup.close") }}</button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ClaimPaymentPopup",
  props: {
    payment: {
      type: Object,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      model: {},
      title: "",
      description: "",
      loading: true,
      success: false,
      failure: false,
      initial: true,
    };
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  watch: {},
  methods: {
    ...mapActions("user", ["getUserById"]),
    ...mapActions("subscribe", ["getMySubscriptions"]),
    async handleSendClaim() {
      if (!this.title || !this.description) {
        this.$notify.error({
          message: this.$t("claimPaymentPopup.errorEnterTitleOrDescr"),
        });
        return;
      }
      this.loading = true;
      // type, title, description, targetId, details
      const data = {
        type: "payment",
        title: this.title,
        description: this.description,
        targetId: this.target,
        details: {
          paymentId: this.payment._id,
        },
      };
      try {
        await this.$api.post("/claims", data);

        this.$notify.success({
          message: this.$t("claimPaymentPopup.notifySuccess"),
        });
        this.initial = false;
        this.success = true;
        this.failure = false;
        this.loading = false;
      } catch (error) {
        this.$notify.error({
          message: error.response.data.error.message,
        });
        this.initial = false;
        this.success = false;
        this.failure = true;
        this.loading = false;
      }
    },
  },
  async mounted() {
    this.model = await this.getUserById({ id: this.target });
    this.loading = false;
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
.subscribeform {
  padding-top: 1rem;
}
.subscribeform textarea {
  width: 100%;
  font-size: 18px;
  color: #4c5165;
  // height: 53px;
  // border-radius: 36px;
  background: rgba(234, 229, 246, 0.47);
  border: 1px solid #d5dbe7;
  padding: 5px 10px;
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
