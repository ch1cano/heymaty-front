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
        <div>{{ $t("claimInfoPopup.loading") }}</div>
      </div>
      <div v-if="initial" class="popupcont">
        <div class="modelinfo">
          <!-- {{ transaction }} -->
          <!-- <div>
            <img
              style="max-height: 70px"
              :src="modelAvatar()"
              class="rounded"
            />
          </div>-->
          <div>
            <div v-if="transaction.from._id === user._id" class="modelname">
              {{ $t("claimInfoPopup.paymentTo") }} {{ transaction.to.name }}
              <!-- {{ $tc("claimInfoPopup.userAge", transaction.to.age) }} -->
              <!-- {{ transaction.to.age }} лет -->
            </div>
            <div v-if="transaction.to._id === user._id" class="modelname">
              {{ $t("claimInfoPopup.paymentFrom") }}
              {{ transaction.from.name }}
              <!-- {{ $tc("claimInfoPopup.userAge", transaction.from.age) }} -->
              <!-- {{ transaction.from.age }} лет -->
            </div>
            <div class="modeltext">
              {{ $t("claimInfoPopup.paymentAmount") }}
              {{ toMoney(transaction.amount) }}
              <span>HDC</span>
            </div>
            <div v-if="transaction.sub" class="modeltext">
              {{ $t("claimInfoPopup.period") }}
              {{ $d(new Date(transaction.periodStart), "medium") }}
              <!-- {{
                $dayjs(transaction.periodStart).format("DD.MM.YYYY HH:mm:ss")
              }}-->
              -
              {{ $d(new Date(transaction.periodEnd), "medium") }}
              <!-- {{ $dayjs(transaction.periodEnd).format("DD.MM.YYYY HH:mm:ss") }} -->
            </div>
            <div v-if="transaction.message" class="modeltext">{{ $t("claimInfoPopup.forMessage") }}</div>
            <div v-if="transaction.bundle" class="modeltext">{{ $t("claimInfoPopup.forBundle") }}</div>
            <div
              v-if="transaction.donation"
              class="modeltext"
            >{{ $t("claimInfoPopup.forDonation") }}</div>
          </div>
        </div>
        <div class="usercont">
          <div class="userinfo">{{ $t("claimInfoPopup.paymentInfo") }}</div>
          <div
            v-if="transaction.finished && transaction.holded"
          >{{ $t("claimInfoPopup.infoRefunded") }}</div>
          <div v-else-if="transaction.holded">{{ $t("claimInfoPopup.infoHolded") }}</div>
          <div v-else-if="transaction.finished">{{ $t("claimInfoPopup.infoFinished") }}</div>
          <div v-else>
            <p>{{ $t("claimInfoPopup.infoInWait") }}</p>
            <p>
              {{ $t("claimInfoPopup.plannedDate") }}
              {{ $d(new Date(transaction.plannedPayoutDate), "long") }}
              <!-- {{
                $dayjs(transaction.plannedPayoutDate).format(
                  "DD.MM.YYYY HH:mm:ss"
                )
              }}-->
            </p>
          </div>
          <div v-if="transaction.claim">{{ $t("claimInfoPopup.infoClaim") }}</div>
          <button @click="close">{{ $t("claimInfoPopup.closeButton") }}</button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ClaimInfoPopup",
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      model: {},
      title: "",
      description: "",
      loading: true,
      initial: true,
    };
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  watch: {},
  methods: {
    ...mapActions("user", ["getUserById"]),
  },
  async mounted() {
    // this.model = await this.getUserById({ id: this.target });
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
  background: #5171e4;
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  border-radius: 36px;
  // background: linear-gradient(272.29deg, #b277ef 0%, #dd94f9 98.03%);
  width: 255px;
  height: 54px;
  margin-right: 1rem;
  margin-top: 1rem;
}
</style>
