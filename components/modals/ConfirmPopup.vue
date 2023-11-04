<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    v-on="$listeners"
  >
    <span class="modal__title"> {{ $t("confirmPopup.pleaseConfirm") }} </span>
    <div class="modal__content">
      {{ message }}
    </div>
    <div class="modal__action">
      <button @click="$emit('confirm', close)">
        {{ $t("confirmPopup.confirm") }}
      </button>
      <button @click="$emit('cancel', close)">
        {{ $t("confirmPopup.cancel") }}
      </button>
    </div>
    <!-- <button class="modal__close" @click="close">X</button> -->
  </vue-final-modal>
</template>

<script>
export default {
  name: "ConfirmPopup",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  font-size: 1rem;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.container {
  position: relative;
}
button {
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  border-radius: 36px;
  // background: linear-gradient(272.29deg, #b277ef 0%, #dd94f9 98.03%);
  background: #5171e4;
  width: 175px;
  height: 54px;
  margin-right: 1rem;
  margin-top: 1rem;
}
</style>
