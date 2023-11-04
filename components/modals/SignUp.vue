<template>
  <div class="popup">
    <div class="window">
      <a @click.prevent="closeModal()" href="#" class="close" />

      <form class="reg">
        <div class="name">{{ $t("signUpForm.title") }}</div>
        <div class="flex">
          <input
            id="r1"
            v-model="form.role"
            value="user"
            type="radio"
            name="r1"
            class="radio"
          />
          <label for="r1">
            <img src="@/assets/svg/search.svg" />
            <img src="@/assets/svg/searchw.svg" />
            {{ $t("signUpForm.iLookForModel") }}
          </label>
          <input
            id="r2"
            v-model="form.role"
            value="girl"
            type="radio"
            name="r1"
            class="radio"
          />
          <label for="r2">
            <img src="@/assets/svg/girl.svg" />
            <img src="@/assets/svg/girlw.svg" />
            {{ $t("signUpForm.iAmModel") }}
          </label>
        </div>

        <v-input
          v-model="form.name"
          @input="clearError('name')"
          :error="errors.name"
          :holder="$t('signUpForm.namePlaceholder')"
        />

        <v-input
          v-model="form.email"
          @input="clearError('email')"
          :error="errors.email"
          :holder="$t('signUpForm.emailPlaceholder')"
        />

        <v-input
          v-model="form.password"
          @input="clearError('password')"
          :error="errors.password"
          :holder="$t('signUpForm.passwordPlaceholder')"
          type="password"
        />

        <v-input
          v-model="form.password_repeat"
          @input="clearError('password_repeat')"
          :error="errors.password_repeat"
          :holder="$t('signUpForm.confirmPasswordPlaceholder')"
          type="password"
        />

        <!-- <vue-recaptcha
          :sitekey="$googleKey"
          :loadRecaptchaScript="true"
          class="captcha"
        />-->
        <!-- <div class="captcha" /> -->
        <div class="agree">
          <input
            type="checkbox"
            name="agree"
            id="agree"
            v-model="agreeToRules"
            :disabled="agreementDisabled"
          />
          <label for="agree"
            >{{ $t("signUpForm.agreeToRules1") }}
            <a href="#" @click="confirmTermsRead()">{{
              $t("signUpForm.agreeToRules2")
            }}</a></label
          >
        </div>
        <div class="buttons">
          <button
            @click.prevent="submit()"
            type="password"
            :disabled="!agreeToRules"
            :class="{ disabledButton: !agreeToRules }"
          >
            {{ $t("signUpForm.signUpButton") }}
          </button>
          <button @click.prevent="confirmTermsRead(signUpSocial)">
            <img src="@/assets/svg/btn4.svg" />
            {{ $t("signUpForm.loginGoogle") }}
            <span>Google</span>
          </button>
          <p>
            {{ $t("signUpForm.alreadyRegistered") }} -
            <a @click.prevent="signIn()" href="#">{{
              $t("signUpForm.logInText")
            }}</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TermsPopup from "@/components/modals/TermsPopup.vue";

export default {
  name: "SignUp",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_repeat: "",
        role: "user",
      },
      agreeToRules: false,
      agreementDisabled: true,
      errors: {
        name: {
          status: false,
          text: "",
        },
        email: {
          status: false,
          text: "",
        },
        password: {
          status: false,
          text: "",
        },
        password_repeat: {
          status: false,
          text: "",
        },
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions("user", ["signUp", "googleAuth"]),
    confirmTermsRead(cb = null) {
      if (!this.agreeToRules) {
        const that = this;
        this.$vfm.show({
          component: TermsPopup,
          on: {
            confirm(close) {
              that.agreementDisabled = false;
              that.agreeToRules = true;
              if (cb) cb();
              close();
            },
            cancel(close) {
              close();
            },
          },
        });
      } else if (cb) cb();
    },

    clearError(type) {
      this.errors[type].status = false;
      this.errors[type].text = "";
    },

    closeModal() {
      this.changeModal("signUp", false);
    },

    // Регистрация обычная
    async submit() {
      if (!this.form.name) {
        this.errors.name.status = true;
        this.errors.name.text = this.$t("signUpForm.errors.enterName");
        return false;
      }
      if (!this.form.email) {
        this.errors.email.status = true;
        this.errors.email.text = this.$t("signUpForm.errors.enterEmail");
        return false;
      }
      if (!this.$funcs.isEmailValid(this.form.email)) {
        this.errors.email.status = true;
        this.errors.email.text = this.$t("signUpForm.errors.enterValidEmail");
        return false;
      }
      if (!this.form.password) {
        this.errors.password.status = true;
        this.errors.password.text = this.$t("signUpForm.errors.enterPassword");
        return false;
      }
      if (this.form.password.length < 5) {
        this.errors.password.status = true;
        this.errors.password.text = this.$t(
          "signUpForm.errors.passwordMinLength"
        );
        return false;
      }
      if (!this.form.password_repeat) {
        this.errors.password_repeat.status = true;
        this.errors.password_repeat.text = this.$t(
          "signUpForm.errors.enterPasswordConfirmation"
        );
        return false;
      }
      if (this.form.password !== this.form.password_repeat) {
        this.errors.password_repeat.status = true;
        this.errors.password_repeat.text = this.$t(
          "signUpForm.errors.passwordsDoesntMatch"
        );
        return false;
      }

      const response = await this.signUp(this.form);
      if (response && response.type === "error") {
        if (
          response.data &&
          response.data.error &&
          response.data.error === "verify"
        ) {
          this.$api.setHeader("Authorization", `Bearer ${response.data.token}`);
          this.$router.push(this.localePath("/verify"));
          this.closeModal();
          return false;
        }

        let text = this.$t("signUpForm.notifications.errorMessage");
        // if (response.message && this.$errors_types[response.message]) {
        //   text = this.$errors_types[response.message];
        // } else if (response.mes) {
        //   text = response.mes;
        // }
        this.$notify.error({
          title: this.$t("signUpForm.notifications.errorTitle"),
          message: text,
        });
        return false;
      }
      this.closeModal();
      this.goTo(this.localePath("/Settings/Personal"));
    },

    // Авторизация через google
    async signUpSocial() {
      try {
        const googleUser = await this.$gAuth.signIn();

        // if (googleUser && googleUser.mc && googleUser.mc.id_token) {
        if (googleUser && googleUser.getAuthResponse()) {
          // const token = googleUser.mc.id_token;
          const token = googleUser.getAuthResponse().id_token;
          const response = await this.googleAuth({
            role: this.form.role,
            id_token: token,
          });
          if (response && response.type === "error") {
            const text = this.$t("signUpForm.notifications.errorMessage");
            this.$notify.error({
              title: this.$t("signUpForm.notifications.errorTitle"),
              message: text,
            });
            return false;
          }

          this.closeModal();
          this.goTo(this.localePath("/Settings/Personal"));
        }
      } catch (e) {}
    },

    // Забыли пароль
    resetPassword() {
      this.closeModal();
    },

    // Войти
    signIn() {
      this.changeModal("signIn", true);
      this.closeModal();
    },
  },
};
</script>
<style lang="scss">
.disabledButton {
  cursor: default !important;
  filter: grayscale(80%);
  // filter: saturate(0%);
}
.agree {
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  input {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  label {
    font-size: 16px;
    color: #a3b2cc;
    a {
      font-size: 16px;
      color: #a3b2cc;
    }
  }
}
</style>
