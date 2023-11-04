<template>
  <div :class="{ error: error && error.status }" class="inpt">
    <span v-if="prefix">{{ prefix }}</span>
    <input
      ref="inputRef"
      :value="formattedValue"
      :placeholder="placeholder"
      :class="[classEl, 'inpt__input']"
    />
    <transition name="fade" mode="out-in">
      <div v-if="error && error.status" class="error__text">{{ error && error.text }}</div>
    </transition>
  </div>
</template>

<script>
import { watch } from "@vue/composition-api";
import useCurrencyInput from "vue-currency-input";

export default {
  name: "CurrencyInput",
  props: {
    value: Number, // Vue 2: value
    options: Object,
    placeholder: String,
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
  },
  setup(props) {
    const { inputRef, formattedValue, setOptions, setValue } = useCurrencyInput(
      props.options
    );

    watch(
      () => props.value,
      (value) => {
        setValue(value);
      }
    );

    // watch(
    //   () => props.options,
    //   (options) => {
    //     setOptions(options);
    //   }
    // );

    return { inputRef, formattedValue };
  },
};
</script>
<style lang="scss" scoped>
.inpt {
  display: flex;
  flex-direction: row;
  line-height: 53px;
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
    margin-bottom: 25px !important;
  }
}
</style>