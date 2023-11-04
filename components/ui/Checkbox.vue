<template>
  <div class="chckbox">
    <label
      :for="id"
      class="chckbox__label"
    >
      <input
        :id="id"
        :value="value"
        :checked="!!value"
        @change="$emit('change', $event.target.checked)"
        :disabled="disabled"
        class="chckbox__input"
        type="checkbox"
      >

      <span class="chckbox__box" />

      <span class="chckbox__text">
        <slot />
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    classEl: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
