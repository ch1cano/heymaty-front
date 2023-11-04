<template>
  <div class="popup">
    <div class="window">
      <a
        @click.prevent="closeModal()"
        href="#"
        class="close"
      />
      <form class="reg">
        <div class="name">
          Восстановление пароля
        </div>

        <v-input
          v-model="form.password"
          @input="clearError('password')"
          :error="errors.password"
          holder="Пароль*"
          type="password"
        />

        <v-input
          v-model="form.password_repeat"
          @input="clearError('password_repeat')"
          :error="errors.password_repeat"
          holder="Подтверждение пароля"
          type="password"
        />

        <div class="captcha" />

        <div class="buttons">
          <button
            @click.prevent="submit()"
            type="submit"
          >
            Восстановить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RecoverPassword',
  data () {
    return {
      form: {
        id: '',
        password: '',
        password_repeat: ''
      },
      errors: {
        password: {
          status: false,
          text: ''
        },
        password_repeat: {
          status: false,
          text: ''
        }
      },
      loading: false
    }
  },
  mounted () {
    const { code } = this.$route.query
    if (code) {
      this.form.id = code
    }
  },
  methods: {
    ...mapActions('user', ['recoverPassword']),

    clearError (type) {
      this.errors[type].status = false
      this.errors[type].text = ''
    },

    closeModal () {
      this.changeModal('recoverPassword', false)
    },

    // Восстановить пароль
    async submit () {
      if (!this.form.id) {
        this.$notify.error({
          title: 'Ошибка',
          message: 'Не указан код восстановления'
        })
        return false
      }
      if (!this.form.password) {
        this.errors.password.status = true
        this.errors.password.text = 'Введите пароль'
        return false
      }
      if (this.form.password.length < 5) {
        this.errors.password.status = true
        this.errors.password.text = 'Мин кол-во символов 5'
        return false
      }
      if (!this.form.password_repeat) {
        this.errors.password_repeat.status = true
        this.errors.password_repeat.text = 'Подтвердите пароль'
        return false
      }
      if (this.form.password !== this.form.password_repeat) {
        this.errors.password_repeat.status = true
        this.errors.password_repeat.text = 'Пароли не совпадают'
        return false
      }

      const response = await this.recoverPassword(this.form)
      if (response && response.type === 'error') {
        let text = 'Произошла ошибка попробуйте позже'
        if (response.message && this.$errors_types[response.message]) {
          text = this.$errors_types[response.message]
        }
        this.$notify.error({
          title: 'Ошибка',
          message: text
        })
        return false
      }

      this.$notify.success({
        message: 'Пароль успешно изменён'
      })
      this.closeModal()
    }
  }
}
</script>
