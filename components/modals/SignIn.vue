<template>
  <div class="popup">
    <div class="window">
      <a @click.prevent="closeModal()" href="#" class="close" />
      <form class="reg">
        <div class="name">{{ $t("signInForm.title") }}</div>

        <v-input
          v-model="form.email"
          :error="errors.email"
          @input="clearError('email')"
          :holder="$t('signInForm.emailPlaceholder')"
        />

        <v-input
          v-model="form.password"
          :error="errors.password"
          @input="clearError('password')"
          :holder="$t('signInForm.passwordPlaceholder')"
          type="password"
        />

        <div class="flex">
          <input
            id="ins"
            v-model="in_system"
            type="checkbox"
            class="checkbox"
          />
          <label for="ins">{{ $t("signInForm.remeberMe") }}</label>
          <a @click.prevent="resetPassword()" href="#" class="forget">
            {{ $t("signInForm.forgotPasswordLink") }}
          </a>
        </div>

        <!-- <div class="captcha">
          <img src="@/assets/img/captcha.png">
        </div>-->
        <!-- <vue-recaptcha
          :sitekey="$googleKey"
          :loadRecaptchaScript="true"
          class="captcha"
        />-->
        <div class="captcha" />

        <div class="buttons">
          <button @click.prevent="submit()" type="submit">
            {{ $t("signInForm.loginButton") }}
          </button>
          <button @click.prevent="signInSocial()">
            <img src="@/assets/svg/btn4.svg" />
            {{ $t("signInForm.loginGoogle") }}
            <span>Google</span>
          </button>
          <p>
            {{ $t("signInForm.noAccount") }} -
            <a @click.prevent="signUp()" href="#">
              {{ $t("signInForm.registerText") }}
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignIn",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {
        email: {
          status: false,
          text: "",
        },
        password: {
          status: false,
          text: "",
        },
      },
      in_system: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions("user", ["signIn", "googleAuth"]),

    clearError(type) {
      this.errors[type].status = false;
      this.errors[type].text = "";
    },

    closeModal() {
      this.changeModal("signIn", false);
    },

    // Вход обычный
    async submit() {
      if (!this.form.email) {
        this.errors.email.status = true;
        this.errors.email.text = this.$t("signInForm.errors.enterEmail");
        return false;
      }
      if (!this.$funcs.isEmailValid(this.form.email)) {
        this.errors.email.status = true;
        this.errors.email.text = this.$t("signInForm.errors.enterValidEmail");
        return false;
      }
      if (!this.form.password) {
        this.errors.password.status = true;
        this.errors.password.text = this.$t("signInForm.errors.enterPassword");
        return false;
      }
      if (this.form.password.length < 5) {
        this.errors.password.status = true;
        this.errors.password.text = this.$t(
          "signInForm.errors.passwordMinLength"
        );
        return false;
      }

      const response = await this.signIn(this.form);
      if (response && response.type === "error") {
        let text = this.$t(
          `signInForm.notifications.errorMessages.${response.message}`
        );
        // if (response.message && this.$errors_types[response.message]) {
        //   text = this.$errors_types[response.message];
        // } else if (response.mes) {
        //   text = response.mes;
        // }
        this.$notify.error({
          title: this.$t("signInForm.notifications.errorTitle"),
          message: text,
        });
        return false;
      }
      // else if (
      //   response &&
      //   (response.verify === "none" || response.verify === "wait")
      // ) {
      //   this.$notify.success({
      //     message: this.$t(response.message),
      //   });
      //   this.$router.push(this.localePath("/verify"));
      //   this.closeModal();
      //   return false;
      // }

      this.closeModal();
      this.goTo(this.localePath("/Settings/Personal"));
    },

    // Авторизация через google
    async signInSocial() {
      try {
        const googleUser = await this.$gAuth.signIn();
        // console.log(googleUser, googleUser.getAuthResponse());
        // if (googleUser && googleUser.mc && googleUser.mc.id_token) {
        if (googleUser && googleUser.getAuthResponse()) {
          // const token = googleUser.mc.id_token;
          const token = googleUser.getAuthResponse().id_token;
          const response = await this.googleAuth({
            role: this.form.role,
            id_token: token,
          });
          if (response && response.type === "error") {
            const text = this.$t(
              `signInForm.notifications.errorMessages.${response.message}`
            );
            this.$notify.error({
              title: this.$t("signInForm.notifications.errorTitle"),
              message: text,
            });
            return false;
          }

          this.closeModal();
          this.goTo(this.localePath("/Settings/Personal"));
        }
      } catch (e) {
        console.log(e);
      }
    },

    // Забыли пароль
    resetPassword() {
      this.changeModal("forgotPassword", true);
      this.closeModal();
    },

    // Зарегистрироваться
    signUp() {
      this.changeModal("signUp", true);
      this.closeModal();
    },
  },
};
</script>
