<template>
  <div class="verify-single-page">
    <div v-for="field in fields" class="field">
      <label :for="field.name">
        {{ field.label }}
        <input type="text" :name="field.name" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerifyFormPage",
  data() {
    return {};
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
};
</script>
