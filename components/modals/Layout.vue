<template>
  <div class="modal">
    <transition
      appear
      name="fade"
      mode="out-in"
    >
      <div
        v-if="bg"
        class="modal__overlay"
      />
    </transition>

    <transition
      appear
      name="slide-top"
      mode="out-in"
    >
      <div
        id="modalBox"
        @click.self="$emit('close')"
        v-if="box"
        class="modal__box"
      >
        <div
          @click.self="$emit('close')"
          class="modal__wrap"
        >
          <div
            @click.self="$emit('close')"
            class="modal__content"
          >
            <a
              @click.prevent="$emit('close')"
              href="#"
              class="modal__close"
            >
              <img src="~assets/icons/close.svg">
            </a>
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ModalLayout',
  props: {
    bg: {
      type: Boolean,
      default: false
    },
    box: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    bg (data) {
      if (data) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  beforeDestroy () {
    document.body.style.overflow = ''
  }
}
</script>
