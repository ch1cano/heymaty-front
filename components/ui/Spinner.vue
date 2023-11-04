<template>
  <div
    :style="styles"
    class="spinner"
  >
    <svg
      v-for="item in 4"
      :key="item"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        fill="none"
        stroke-width="8"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="28"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 66
    }
  },

  computed: {
    styles () {
      return {
        top: `calc(50% - ${this.size / 2}px)`,
        left: `calc(50% - ${this.size / 2}px)`,
        width: this.size + 'px',
        height: this.size + 'px'
      }
    }
  }
}
</script>
