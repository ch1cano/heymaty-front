<template>
  <div class="wrap">
    <div v-show="verificationLoading" v-loading="verificationLoading"></div>
    <div v-show="!verificationLoading">
      <div class="in-process" v-if="verificationInProcess">
        <div class="letter">
          <LetterLogo />
          <div class="text">
            <h1>{{ $t("verifyPage.requestSent") }}</h1>
            <h2>{{ $t("verifyPage.youWillReceiveEmail") }}</h2>
          </div>
        </div>
      </div>
      <div v-else>
        <form-wizard
          :title="$t('verifyPage.verification')"
          :subtitle="$t('verifyPage.description')"
          :nextButtonText="$t('verifyPage.nextStepButton')"
          :backButtonText="$t('verifyPage.prevStepButton')"
          :finishButtonText="$t('verifyPage.sendButton')"
          :color="'#5171e4'"
          :shape="'tab'"
          @on-complete="handleComplete"
        >
          <tab-content :title="$t('verifyPage.step1.title')" :beforeChange="validate('step1')">
            <step1 ref="step1" />
          </tab-content>
          <tab-content :title="$t('verifyPage.step2.title')" :beforeChange="validate('step2')">
            <step2 ref="step2" />
          </tab-content>
          <tab-content :title="$t('verifyPage.step3.title')" :beforeChange="validate('step3')">
            <step3 ref="step3" />
          </tab-content>
        </form-wizard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import step1 from "../../components/page-parts/verify/step1.vue";
import step2 from "../../components/page-parts/verify/step2.vue";
import step3 from "../../components/page-parts/verify/step3.vue";

import LetterLogo from "~/assets/img/letter.svg?inline";

export default {
  name: "PageVerify",
  data() {
    return {};
  },
  components: { step1, step2, step3, LetterLogo },
  mounted() {
    this.getVerify();
  },
  computed: {
    ...mapState("verify", ["verificationLoading", "verificationInProcess"]),
  },
  methods: {
    ...mapActions("verify", ["postVerify", "getVerify"]),
    async handleComplete() {
      const data = await this.postVerify();
      console.log(data);
    },
    validate(step) {
      return () => {
        return this.$refs[step].validate();
      };
    },
  },
};
</script>
<style lang="scss">
.wizard-header {
  h4 {
    font-size: 2rem;
  }
  p {
    font-size: 1.5rem !important;
  }
}
.stepTitle {
  font-size: 1rem;
}
.el-form-item__label {
  font-size: 1.3rem;
}
.in-process {
  display: flex;
  flex-direction: column;
  align-items: center;
  .letter {
    transform: translateY(-30%);
    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
