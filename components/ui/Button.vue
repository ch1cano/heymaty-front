<template>
  <button
    @click.prevent="$emit('click')"
    :disabled="disabled"
    :type="type"
    class="btn"
  >
    <span v-if="loading">
      <spinner :size="24" />
    </span>
    <slot
      v-else
    />
  </button>
</template>

<script>
import Spinner from './Spinner'

export default {
  name: 'Button',
  components: {
    Spinner
  },
  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
