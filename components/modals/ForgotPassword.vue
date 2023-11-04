<template>
  <div class="popup">
    <div class="window">
      <a @click.prevent="closeModal()" href="#" class="close" />
      <form class="reg">
        <div class="name">
          {{ $t("forgotPasswordPopup.forgotPassword") }}
        </div>

        <v-input
          v-model="form.email"
          :error="errors.email"
          @input="clearError('email')"
          holder="E-mail"
        />

        <div class="captcha" />

        <div class="buttons">
          <button @click.prevent="submit()" type="submit">
            {{ $t("forgotPasswordPopup.resetPasswordButton") }}
          </button>

          <p>
            {{ $t("forgotPasswordPopup.remeberPassword") }} -
            <a @click.prevent="signIn()" href="#">
              {{ $t("forgotPasswordPopup.logIn") }}
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
  name: "ForgotPassword",
  data() {
    return {
      form: {
        email: "",
      },
      errors: {
        email: {
          status: false,
          text: "",
        },
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions("user", ["forgotPassword"]),

    clearError(type) {
      this.errors[type].status = false;
      this.errors[type].text = "";
    },

    closeModal() {
      this.changeModal("forgotPassword", false);
    },

    // Получить код для восстановление
    async submit() {
      if (!this.form.email) {
        this.errors.email.status = true;
        this.errors.email.text = this.$t("forgotPasswordPopup.errorEnterEmail");
        return false;
      }
      if (!this.$funcs.isEmailValid(this.form.email)) {
        this.errors.email.status = true;
        this.errors.email.text = this.$t(
          "forgotPasswordPopup.errorEnterValidEmail"
        );
        return false;
      }

      const response = await this.forgotPassword(this.form);
      if (response && response.type === "error") {
        let text = this.$t("forgotPasswordPopup.notifications.errorGeneric");
        if (response.message && this.$errors_types[response.message]) {
          text = this.$errors_types[response.message];
        }
        this.$notify.error({
          title: this.$t("forgotPasswordPopup.notifications.errorTitle"),
          message: text,
        });
        return false;
      }

      this.$notify.success({
        message: this.$t(
          "forgotPasswordPopup.notifications.successPasswordReset"
        ),
      });
      this.closeModal();
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
