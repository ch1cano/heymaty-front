<template>
  <div class=" styled_nav_favorites">
    <div>
      <button
        class="nav_btn"
        :style="{
          backgroundColor: currentColor === 'All' ? '#2554F3' : '',
          color: currentColor === 'All' ? 'white' : '',
        }"
        @click="changeColor('All')"
      >
        <p>All</p>
      </button>
      <button
        class="nav_btn"
        :style="{
          backgroundColor: currentColor === 'Subscribed' ? '#2554F3' : '',
          color: currentColor === 'Subscribed' ? 'white' : '',
        }"
        @click="changeColor('Subscribed')"
      >
        <p>Subscribed</p>
      </button>
      <button
        class="nav_btn"
        :style="{
          backgroundColor: currentColor === 'For you' ? '#2554F3' : '',
          color: currentColor === 'For you' ? 'white' : '',
        }"
        @click="changeColor('For you')"
      >
        <p>For you</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentColor: "",
    };
  },
  methods: {
    changeColor(color) {
      this.currentColor = color;
    },
  },
};
</script>
