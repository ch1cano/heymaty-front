<template>
  <div :class="{ error: error && error.status }" class="txt">
    <textarea
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="holder"
      :class="[classEl, 'txt__textarea']"
    />

    <transition name="fade" mode="out-in">
      <div v-if="error && error.status" class="error__text">{{ error && error.text }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Textarea",
  props: {
    holder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      required: true,
    },
    classEl: {
      type: String,
      default: "",
    },
    error: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style lang="scss" scoped>
.txt {
  margin-bottom: 25px;
  textarea {
    width: 100% !important;
    font-size: 22px !important;
    // color: #a3b2cc;
    color: initial !important;
    height: 110px !important;
    border-radius: 24px !important;
    background: rgba(234, 229, 246, 0.47) !important;
    border: 1px solid #d5dbe7 !important;
    padding: 20px 100px 20px 30px !important;
  }
}
</style>
