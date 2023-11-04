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
        <div>{{ $t("donatePopup.loading") }}</div>
      </div>
      <div v-if="initial" class="popupcont">
        <div class="modelinfo">
          <div>
            <img style="max-height: 70px" :src="getAvatarUrl(model)" class="rounded" />
          </div>
          <div>
            <div class="modelname">
              {{ model.name }},
              <!-- {{ model.age }} лет -->
              {{ $tc("donatePopup.userAge", model.realAge) }}
            </div>
            <div class="modeltext">{{ $t("donatePopup.newDonation") }}</div>
          </div>
        </div>
        <div class="usercont">
          <div class="userinfo">
            <div>
              <span style="font-weight: 500">{{ $t("donatePopup.yourBalance") }}</span>
              {{ toMoney(user.balance) }}
              <span>HDC</span>
            </div>
          </div>
          <div v-if="canChat" class="subscribeform">
            <div>
              <div>
                <span style="font-weight: 500">{{ $t("donatePopup.donationAmount") }}</span>
              </div>
              <currency-input
                style="width: 100%"
                v-model="donationAmount"
                :placeholder="$t('donatePopup.donationAmount')"
                :options="{
                  currency: 'HDC',
                  valueRange: { min: 0.01, max: toMoney(user.balance) },
                }"
              />
            </div>
            <div>
              <input
                v-model="messageText"
                :placeholder="$t('donatePopup.enterYourMessagePlaceholder')"
              />
            </div>
            <div class="disclaimer">{{ $t("donatePopup.disclaimer") }}</div>
          </div>
          <div v-else>
            <span style="font-weight: 500">{{ $t("donatePopup.notEnoughMoney1") }}</span>
            <a
              href="#"
              @click.prevent="
  goTo(localePath('/Settings/Balance'));
close();
              "
            >{{ $t("donatePopup.notEnoughMoney2") }}</a>
          </div>
          <button :disabled="!canChat" @click="handleDonation">{{ $t("donatePopup.donateButton") }}</button>
          <button @click="close">{{ $t("donatePopup.cancelButton") }}</button>
        </div>
      </div>
      <div v-if="success" class="successcont">
        <div class="successmessage">
          <p>{{ $t("donatePopup.successMessage1") }}</p>
          <p>{{ $t("donatePopup.successMessage2") }}</p>
          <p>{{ $t("donatePopup.successMessage3") }}</p>
        </div>
        <button @click="close">{{ $t("donatePopup.closeButton") }}</button>
      </div>
      <div v-if="failure" class="failurecont">
        <div class="failuremessage">{{ $t("donatePopup.failureMessage") }}</div>
        <button @click="close">{{ $t("donatePopup.closeButton") }}</button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import CurrencyInput from "../ui/CurrencyInput.vue";

export default {
  name: "DonatePopup",
  components: { CurrencyInput },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      model: {},
      donationAmount: 0.01,
      messageText: "",
      loading: true,
      success: false,
      failure: false,
      initial: true,
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    messageDonation() {
      return this.toCents(this.donationAmount);
    },
    canChat() {
      return (
        this.user.role === "girl" ||
        this.user.balance > this.model.pricePerMessage ||
        (this.user.messageBundles.find((mb) => mb.model === this.model._id) &&
          this.user.messageBundles.find((mb) => mb.model === this.model._id)[
          "messages"
          ])
      );
    },
  },

  methods: {
    ...mapActions("user", ["getUserById", "getMyProfile"]),
    ...mapMutations("user", ["SET_USER_MESSAGEBUNDLES"]),
    handleDonation() {
      if (!this.canChat) {
        this.$notify.error({
          message: this.$t("donatePopup.notifications.notEnoughFunds"),
        });
        return;
      }
      if (!this.messageText.trim()) {
        this.$notify.error({
          message: this.$t("donatePopup.notifications.pleaseEnterTheMessage"),
        });
        return;
      }
      if (!this.messageDonation) {
        this.$notify.error({
          message: this.$t("donatePopup.notifications.pleaseEnterTheDonation"),
        });
        return;
      }

      this.loading = true;
      const msg = {
        from: this.user._id,
        to: this.model._id,
        message: this.messageText.trim(),
        donation: this.messageDonation,
      };

      this.$root.socket.emit("chatMessage", msg, (resp) => {
        if (resp.ok) {
          if (resp.savedSender) this.SET_USER_MESSAGEBUNDLES(resp.savedSender);
          this.$notify.success({
            message: this.$t("donatePopup.notifications.donationSuccess"),
          });
          this.initial = false;
          this.success = true;
          this.failure = false;
          this.loading = false;
        } else {
          this.$notify.error({
            message: this.$t("donatePopup.notifications.errorSendingDonation"),
          });
          this.initial = false;
          this.success = false;
          this.failure = true;
          this.loading = false;
        }
        this.messageText = "";
        this.donationAmount = 0.01;
      });
    },
  },
  async mounted() {
    this.model = await this.getUserById({ id: this.id });
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
.disclaimer {
  color: #aaa;
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
