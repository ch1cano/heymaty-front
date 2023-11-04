<template>
  <div class="error-page">
    <div class="error-page__wrap">
      <h1>
        404
      </h1>

      <h2>
        Страница не найдена
      </h2>

      <n-link
        to="/"
        class="btn btn-default btn-bright"
      >
        На главную
      </n-link>

      <v-btn
        @click="$router.back()"
        class="error-page__back"
      >
        <i class="fas fa-arrow-left" />
        <span>
          Вернуться назад
        </span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage'
}
</script>
