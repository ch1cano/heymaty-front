<template>
  <div class="chckbox">
    <label
      :for="id"
      class="chckbox__label"
    >
      <input
        :id="id"
        :value="defaultValue"
        :name="name"
        :checked="defaultValue === value"
        @input="$emit('input', $event.target.value)"
        class="chckbox__input"
        type="radio"
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
  name: 'Radio',
  props: {
    id: {
      type: String,
      required: true
    },
    defaultValue: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    classEl: {
      type: String,
      default: ''
    }
  }
}
</script>
