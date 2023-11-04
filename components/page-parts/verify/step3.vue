<template>
  <StepWrapper step="3" from="3">
    <div class="header">
      <h2>{{ $t("verifyPage.step3.description") }}</h2>
      <h3>{{ $t("verifyPage.step3.description2") }}</h3>
    </div>

    <div class="tab-pane">
      <div class="tab-header">
        <img src="@/assets/img/selfie-img.png" alt />
        <p>
          HeyMaty.com
          <time>
            {{ now.getDate() }}.{{ now.getMonth() + 1 }}.{{ now.getFullYear() }}
          </time>
        </p>
      </div>
      <div class="uploads">
        <el-form>
          <el-form-item ref="personalSelfie" :error="errors.personalSelfie">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleChange('personalSelfie')"
              accept="image/jpeg"
            >
              <img
                v-if="stepForm.personalSelfie"
                :src="stepForm.personalSelfie.preview"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="tab-pane">
      <div class="tab-header">
        <el-card shadow="always" :body-style="{ paddingLeft: '40px' }">
          <div slot="header">
            <h3>{{ $t("verifyPage.step3.reqTitle") }}</h3>
          </div>
          <ul>
            <li>{{ $t("verifyPage.step3.req1") }}</li>
            <li>{{ $t("verifyPage.step3.req2") }}</li>
            <li>{{ $t("verifyPage.step3.req3") }}</li>
            <li>{{ $t("verifyPage.step3.req4") }}</li>
            <li>{{ $t("verifyPage.step3.req5") }}</li>
            <li>{{ $t("verifyPage.step3.req6") }}</li>
          </ul>
        </el-card>
      </div>
    </div>
  </StepWrapper>
</template>

<script>
import { mapState, mapActions } from "vuex";
import StepWrapper from "./StepWrapper.vue";

export default {
  name: "VerifyStep3",
  components: { StepWrapper },
  data() {
    return {
      now: new Date(),
      errors: {
        personalSelfie: null,
      },
      stepForm: {
        personalSelfie: null,
      },
    };
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    handleChange(field) {
      return (file) => {
        if (file) {
          this.$refs[field].clearValidate();
        }
        // console.log(file);
        const data = {
          preview: URL.createObjectURL(file.raw),
          file,
        };
        this.$store.dispatch("verify/setPersonal", { field, data });
        this.stepForm[field] = data;
      };
    },
    validate() {
      Object.keys(this.errors).forEach((field) => {
        if (!this.stepForm[field]) {
          this.errors[field] = this.$t("verifyPage.fieldRequired");
        }
      });
      if (this.stepForm.personalSelfie) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style scoped lang="scss">
.tab-pane {
  display: flex;
  flex-direction: column;
  align-items: center;
  .tab-header {
    margin-bottom: 1rem;
    position: relative;
    p {
      position: absolute;
      bottom: 20%;
      left: 51%;
      margin: 0;
      text-align: left;
    }
  }
  .uploads {
  }
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin-bottom: 1rem;
  }
}
.avatar-uploader::v-deep {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 278px;
  line-height: 278px;
  text-align: center;
}
.avatar {
  width: 278px;
  height: 278px;
  display: block;
  object-fit: cover;
}
ul {
  margin: initial;
  font-size: 1rem;
}
</style>
