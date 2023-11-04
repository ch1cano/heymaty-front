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
        <div>{{ $t("subscribePopup.loading") }}</div>
      </div>
      <div v-if="initial" class="popupcont">
        <div class="subscribe">
          <div class="name">{{ $t("subscribePopup.subscriptionTitle") }}</div>
          <div class="target">
            <p v-if="isProlongation">
              {{
                $t("subscribePopup.youSubscribedUntil", { name: model.name })
              }}
              {{
                $d(new Date(getSubscription(model._id).ends || null), "long")
              }}
            </p>
            <p v-else>{{ $t("subscribePopup.newSubscription") }}</p>
            <div class="n">
              <div>
                <img style="max-height: 70px" :src="getAvatarUrl(model)" class="rounded" />
              </div>
              <div>
                {{ model.name }}, {{ $tc("subscribePopup.userAge", model.realAge) }}
                <div class="price">
                  <span>{{ toMoney(model.pricePerDay) }}</span>
                  HDC
                  {{ $t("subscribePopup.perMonth") }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="maxMonths" class="time">
            <p>{{ $t("subscribePopup.subsDays") }}</p>
            <div class="number">
              <span class="minus" @click.stop.prevent="months--">-</span>
              <input type="number" min="1" :max="maxMonths" v-model="months" step="1" pattern="\d*" />
              <!-- <input type="text" value="1" /> -->
              <span class="plus" @click.stop.prevent="months++">+</span>
            </div>
            <!-- <div class="days">{{ $t("subscribePopup.months") }}</div> -->
            <p>
              {{ $t("subscribePopup.totalAmount") }} {{ toMoney(amount) }}
              <span>HDC</span>
            </p>
          </div>
          <div v-else class="time">
            <p>
              {{ $t("subscribePopup.notEnoughMoney1") }}
              <a
                href="#"
                @click.prevent="
  goTo(localePath('/Settings/Balance'));
close();
                "
              >{{ $t("subscribePopup.notEnoughMoney2") }}</a>
            </p>
          </div>
          <div class="buttons">
            <p>{{ $t("subscribePopup.withdrawFrom") }}</p>
            <button class="btn-balance">
              <img src="~/assets/img/btn1.svg" />
              {{ $t("subscribePopup.fromBalance") }}
              {{ toMoney(user.balance) }}
              <span>HDC</span>
            </button>
            <button class="btn-savedcard" style="display: none">
              <img src="img/btn2.svg" /> с сохраненной карты
              <span>****5687</span>
            </button>
            <button class="btn-newcard" style="display: none">
              <img src="img/btn3.svg" /> с новой карты
            </button>
            <button
              class="btn-save"
              :disabled="!maxMonths"
              v-if="isProlongation"
              @click="handleProlongation"
            >{{ $t("subscribePopup.subscribeButtonProlong") }}</button>
            <button
              class="btn-save"
              v-else
              :disabled="!maxMonths"
              @click="handleSubsription"
            >{{ $t("subscribePopup.subscribeButtonSub") }}</button>
            <!-- <button class="btn-cancel" @click="close">
              {{ $t("subscribePopup.cancelButton") }}
            </button>-->
          </div>
        </div>

        <!-- <div class="modelinfo">
          <div>
            <img
              style="max-height: 70px"
              :src="getAvatarUrl(model)"
              class="rounded"
            />
          </div>
          <div>
            <div class="modelname">
              {{ model.name }},
              {{ $tc("subscribePopup.userAge", model.age) }}
            </div>
            <div class="modeltext" v-if="isProlongation">
              {{
                $t("subscribePopup.youSubscribedUntil", { name: model.name })
              }}
              {{
                $d(new Date(getSubscription(model._id).ends || null), "long")
              }}
            </div>
            <div class="modeltext" v-else>
              {{ $t("subscribePopup.newSubscription") }}
            </div>
            <div class="modeltext">
              {{ $t("subscribePopup.pricePerDay") }}
              {{ toMoney(model.pricePerDay) }}
              <span>HDC</span>
            </div>
          </div>
        </div>
        <div class="usercont">
          <div class="userinfo">
            <div>
              <span style="font-weight: 500">{{
                $t("subscribePopup.yourBalance")
              }}</span>
              {{ toMoney(user.balance) }} <span>HDC</span>
            </div>
          </div>
          <div v-if="maxMonths" class="subscribeform">
            <div>
              <div>
                <span style="font-weight: 500">{{
                  $t("subscribePopup.subsDays")
                }}</span>
              </div>
              <input
                type="number"
                min="1"
                :max="maxMonths"
                v-model="months"
                step="1"
                pattern="\d*"
              />
            </div>
            <div>
              {{ $t("subscribePopup.subDescr") }}
            </div>
            <div class="subscribetotal">
              <span style="font-weight: 500"
                >{{ $t("subscribePopup.totalAmount") }}
              </span>
              {{ toMoney(amount) }} <span>HDC</span>
            </div>
          </div>
          <div v-else>
            <span style="font-weight: 500">{{
              $t("subscribePopup.notEnoughMoney1")
            }}</span>
            <a
              href="#"
              @click.prevent="
                goTo(localePath('/settings'));
                close();
              "
              >{{ $t("subscribePopup.notEnoughMoney2") }}</a
            >
          </div>
          <button
            :disabled="!maxMonths"
            v-if="isProlongation"
            @click="handleProlongation"
          >
            {{ $t("subscribePopup.subscribeButtonProlong") }}
          </button>
          <button v-else :disabled="!maxMonths" @click="handleSubsription">
            {{ $t("subscribePopup.subscribeButtonSub") }}
          </button>
          <button @click="close">
            {{ $t("subscribePopup.cancelButton") }}
          </button>
        </div>-->
      </div>
      <div v-if="success" class="successcont">
        <div class="successmessage">
          <p>{{ $t("subscribePopup.successMessage1") }}</p>
          <p>{{ $t("subscribePopup.successMessage2") }}</p>
          <p>{{ $t("subscribePopup.successMessage3") }}</p>
        </div>
        <button @click="close">{{ $t("subscribePopup.closeButton") }}</button>
      </div>
      <div v-if="failure" class="failurecont">
        <div class="failuremessage">{{ $t("subscribePopup.failureMessage") }}</div>
        <button @click="close">{{ $t("subscribePopup.closeButton") }}</button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "SubscribePopup",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      model: {},
      months: 1,
      daysInMonth: 30,
      loading: true,
      success: false,
      failure: false,
      initial: true,
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("subscribe", ["subscriptions"]),
    ...mapGetters("subscribe", ["getSubscription", "isActiveSubscription"]),
    isProlongation() {
      // return this.subscriptions.map((s) => s.model._id).includes(this.id);
      return this.isActiveSubscription(this.id);
    },
    // currentSubscription() {
    //   if (!this.isProlongation) return false;
    //   const sid = this.subscriptions.findIndex((s) => s.model._id === this.id);
    //   if (sid === -1) return false;
    //   return this.subscriptions[sid];
    // },
    maxMonths() {
      const months = Math.floor(this.user.balance / this.model.pricePerDay);
      return months <= 12 ? months : 12;
    },
    amount() {
      return this.months * this.model.pricePerDay;
    },
    days() {
      return Math.floor(this.months * this.daysInMonth);
    },
  },
  watch: {
    months() {
      if (Math.floor(this.months) <= this.maxMonths) {
        this.months = Math.floor(this.months) || 1;
        return;
      }
      this.months = this.maxMonths;
    },
  },
  methods: {
    ...mapActions("user", ["getUserById", "getMyProfile"]),
    ...mapActions("subscribe", [
      "createSubscription",
      "getMySubscriptions",
      "prolongSubscription",
    ]),
    async socketSendUserSubscribed() {
      await this.$store.dispatch(
        "$nuxtSocket/emit", // Remember, "emit" is namespaced to "$nuxtSocket"
        {
          label: "messages", // Use persisted socket "messages"
          evt: "userSubscribed",
          msg: {
            userId: this.user._id,
            modelId: this.id,
          },
          emitTimeout: 3000,
        }
      );
    },
    async handleSubsription() {
      this.loading = true;
      const data = {
        days: this.days,
        modelId: this.id,
        amount: this.amount,
      };
      const res = await this.createSubscription(data);
      if (res.type !== "error") {
        this.getMySubscriptions();
        this.getMyProfile();
        this.$notify.success({
          message: this.$t("subscribePopup.notifications.subscriptionSuccess"),
        });
        this.initial = false;
        this.success = true;
        this.failure = false;
        this.loading = false;
        await this.socketSendUserSubscribed();
        return;
      }
      this.$notify.error({
        message: res,
      });
      this.initial = false;
      this.success = false;
      this.failure = true;
      this.loading = false;
    },
    async handleProlongation() {
      this.loading = true;
      const data = {
        days: this.days,
        modelId: this.id,
        amount: this.amount,
      };
      const res = await this.prolongSubscription(data);
      if (res.type !== "error") {
        this.getMySubscriptions();
        this.getMyProfile();
        this.$notify.success({
          message: this.$t("subscribePopup.notifications.prolongationSuccess"),
        });
        this.initial = false;
        this.success = true;
        this.failure = false;
        this.loading = false;
        await this.socketSendUserSubscribed();
        return;
      }
      this.$notify.error({
        message: res,
      });
      this.initial = false;
      this.success = false;
      this.failure = true;
      this.loading = false;
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
  border-radius: 25px;
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
  // border: 1px solid #b87cf1;
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
.popupcont {
  // width: 530px;
  padding: 40px;
  .subscribe {
    .name {
      margin-bottom: 25px;
      font-weight: bold;
      font-size: 36px;
      line-height: 54px;
      color: #575757;
    }
    .target {
      margin-bottom: 25px;
      p {
        margin-bottom: 10px;
        font-size: 20px;
        line-height: 150%;
        color: #575757;
      }
      .n {
        div {
          display: table-cell;
          vertical-align: middle;
          font-size: 20px;
          line-height: 150%;
          .price {
            display: block;
            margin-top: 3px;
            font-size: 16px;
            line-height: 130%;
            color: #a3b2cc;
          }
          .price span {
            margin-right: 5px;
            color: #000;
            font-weight: bold;
            font-size: 20px;
            line-height: 150%;
          }
          img {
            max-width: 1000000px;
            margin-right: 15px;
          }
        }
      }
    }
    .time {
      position: relative;
      margin-bottom: 15px;
      .days {
        font-size: 12px;
        color: #a3b2cc;
        bottom: 8px;
        left: 94px;
        position: absolute;
      }
      p {
        margin-bottom: 10px;
        font-size: 20px;
        line-height: 150%;
        color: #575757;
      }
      .number {
        * {
          vertical-align: middle;
        }
        input {
          width: 64px;
          height: 64px;
          border: 2px solid #eceff4;
          text-align: center;
          border-radius: 8px;
          font-size: 20px;
          margin: 0 12px;
          // padding-bottom: 20px;
        }
        span {
          cursor: pointer;
          width: 64px;
          height: 64px;
          line-height: 64px;
          text-align: center;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          background: rgba(234, 229, 246, 0.47);
          border: 1px solid #d5dbe7;
          display: inline-block;
          font-size: 40px;
          font-weight: 300;
          -webkit-transition: all 200ms ease;
          -moz-transition: all 200ms ease;
          -ms-transition: all 200ms ease;
          -o-transition: all 200ms ease;
          transition: all 200ms ease;
          &:hover {
            background: #fff;
            box-shadow: 0px 4px 35px rgba(191, 128, 242, 0.13);
            color: #5d8ee7;
            border: 1px solid #fff;
          }
        }
      }
    }

    .buttons {
      p {
        font-size: 20px;
        line-height: 150%;
        color: #575757;
      }
      button {
        img {
          vertical-align: middle;
          margin-right: 4px;
        }
        width: 100%;
        height: 56px;
        -webkit-border-radius: 36px;
        -moz-border-radius: 36px;
        border-radius: 36px;
        margin-top: 15px;
        text-align: left;
        font-size: 20px;
        padding: 0 15px;
        &.btn-balance {
          background: #99abeb;
          color: #fff;
        }
        &.btn-savedcard {
          background: #fff;
          box-shadow: 0px 4px 35px rgba(191, 128, 242, 0.13);
          color: #5d8ee7;
        }
        &.btn-newcard {
          height: 64px;
          background: #99abeb;
          background: rgba(234, 229, 246, 0.47);
          border: 1px solid #d5dbe7;
          padding: 0 30px;
          color: #575757;
        }
        &.btn-save,
        &.btn-cancel {
          padding: 0;
          text-align: center;
          background: #fff;
          height: 70px;
          border: 1px solid #b87cf1;
          font-weight: 500;
          font-size: 20px;
          color: #b87cf1;
        }
      }
    }
  }
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
