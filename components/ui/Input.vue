<template>
  <div :class="{ error: error && error.status }" class="inpt">
    <span v-if="prefix">{{ prefix }}</span>
    <input
      ref="inp"
      :id="id"
      :type="type"
      :value="value"
      @input="onInput"
      :placeholder="holder"
      :class="[classEl, 'inpt__input']"
      :disabled="disabled"
    />
    <span v-if="limit">{{ limitStr }}</span>

    <transition name="fade" mode="out-in">
      <div v-if="error && error.status" class="error__text">{{ error && error.text }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    id: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text",
    },
    integer: {
      type: Boolean,
      default: false
    },
    holder: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
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
    prefix: {
      type: String,
      default: null,
    },
    limit: {
      type: Number,
      default: null,
    },
  },
  computed: {
    limitStr() {
      if (this.limit) {
        return `${this.value.length}/${this.limit}`;
      }
    },
  },
  methods: {
    onInput(event) {
      //if only integers allowed
      if (this.integer) {
        event.target.value = event.target.value.replace(/[^0-9]+/g, "")
      }
      this.$emit('input', event.target.value)
    }
  },
};
</script>

<style scoped lang="scss">
.inpt {
  display: flex;
  flex-direction: row;
  line-height: 53px;
  margin-bottom: 25px;
  span {
    margin-right: 0.5em;
    font-size: 1.4em;
    color: #4c5165;
  }
  input {
    width: 100% !important;
    font-size: 22px !important;
    // color: #a3b2cc;
    color: initial !important;
    height: 53px !important;
    border-radius: 36px !important;
    background: rgba(234, 229, 246, 0.47) !important;
    border: 1px solid #d5dbe7 !important;
    padding: 0 30px !important;
    margin-bottom: initial !important;
  }
  .error__text {
    // font-size: 14px !important;
  }
}
</style>
