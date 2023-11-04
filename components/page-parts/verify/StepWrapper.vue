<template>
  <div class="form-wrapper">
    <el-dialog
      :title="$t('verifyPage.popup.title')"
      :visible.sync="popupVisible"
      width="70%"
    >
      <div class="popup-wrap">
        <div class="left">
          <div>
            {{ $t("verifyPage.popup.uploadThis.title") }}
          </div>
          <div>
            {{ $t("verifyPage.popup.uploadThis.idsList") }}
          </div>
          <div>
            {{ $t("verifyPage.popup.uploadThis.addressList") }}
          </div>
          <div>
            {{ $t("verifyPage.popup.uploadThis.notAllowedList") }}
          </div>
        </div>
        <div class="right">
          <div>
            {{ $t("verifyPage.popup.documentsRequirements.title") }}
          </div>
          <div>
            {{ $t("verifyPage.popup.documentsRequirements.list") }}
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="popupVisible = false">{{
          $t("verifyPage.popup.iUnderstandButton")
        }}</el-button>
      </span>
    </el-dialog>
    <div class="form-header">
      <div class="step-info">
        {{ $t("verifyPage.stepFrom", { step, from }) }}
        {{ $t(`verifyPage.step${step}.title`) }}
      </div>
      <div class="help-link">
        <el-button type="text" @click="popupVisible = true">{{
          $t("verifyPage.popup.title")
        }}</el-button>
      </div>
    </div>
    <div class="form-body">
      <div class="form">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepWrapper",
  data() {
    return {
      popupVisible: false,
    };
  },
  props: {
    step: String,
    from: String,
  },
};
</script>
<style scoped lang="scss">
.popup-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  .left,
  .right {
    min-width: 45%;
    margin: 10px;
    div {
      word-wrap: normal;
    }
  }
}
.form-wrapper {
  border: 1px solid #ddd;
  border-radius: 10px;
  .form-header {
    display: flex;
    justify-content: space-between;
    padding: 0 1.5rem 0 1.25rem;

    width: 100%;
    height: 3rem;
    font-size: 0.875rem;
    line-height: 3rem;
    border-bottom: 0.0625rem solid #ddd;
  }
  .form-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    .form {
      width: 60%;
    }
  }
}
</style>
