<template>
  <StepWrapper step="2" from="3">
    <div class="header">
      <h2>{{ $t("verifyPage.step2.description") }}</h2>
      <div>
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <ul>
            <li>{{ $t("verifyPage.step2.documentsRequirements1") }}</li>
            <li>{{ $t("verifyPage.step2.documentsRequirements2") }}</li>
            <li>{{ $t("verifyPage.step2.documentsRequirements3") }}</li>
          </ul>
        </el-card>
      </div>
    </div>
    <div class="tabs">
      <el-tabs type="border-card" :stretch="true" v-model="activeTab">
        <el-tab-pane
          :label="$t('verifyPage.step2.passportButton')"
          name="passport"
        >
          <div class="tab-pane">
            <div class="tab-header">
              <h3>{{ $t("verifyPage.step2.passport.title") }}</h3>
            </div>
            <div class="uploads">
              <el-form>
                <el-form-item
                  ref="personalPassport"
                  :error="errors.personalPassport"
                >
                  <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleChange('personalPassport')"
                    accept="image/jpeg"
                  >
                    <img
                      v-if="personalPassport.preview"
                      :src="personalPassport.preview"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('verifyPage.step2.idCardButton')" name="idCard">
          <div class="tab-pane">
            <div class="tab-header">
              <h3>{{ $t("verifyPage.step2.idCard.title") }}</h3>
            </div>
            <div class="uploads">
              <el-form>
                <el-form-item
                  ref="personalIDCardFront"
                  :error="errors.personalIDCardFront"
                >
                  <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleChange('personalIDCardFront')"
                    accept="image/jpeg"
                  >
                    <img
                      v-if="personalIDCardFront.preview"
                      :src="personalIDCardFront.preview"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item
                  ref="personalIDCardBack"
                  :error="errors.personalIDCardBack"
                >
                  <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleChange('personalIDCardBack')"
                    accept="image/jpeg"
                  >
                    <img
                      v-if="personalIDCardBack.preview"
                      :src="personalIDCardBack.preview"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane
          :label="$t('verifyPage.step2.driversLicenseButton')"
          name="driversLicense"
        >
          <div class="tab-pane">
            <div class="tab-header">
              <h3>{{ $t("verifyPage.step2.driversLicense.title") }}</h3>
            </div>
            <div class="uploads">
              <el-form>
                <el-form-item
                  ref="personalDriverLicenseFront"
                  :error="errors.personalDriverLicenseFront"
                >
                  <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleChange('personalDriverLicenseFront')"
                    accept="image/jpeg"
                  >
                    <img
                      v-if="personalDriverLicenseFront.preview"
                      :src="personalDriverLicenseFront.preview"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item
                  ref="personalDriverLicenseBack"
                  :error="errors.personalDriverLicenseBack"
                >
                  <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleChange('personalDriverLicenseBack')"
                    accept="image/jpeg"
                  >
                    <img
                      v-if="personalDriverLicenseBack.preview"
                      :src="personalDriverLicenseBack.preview"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
        <div class="tab-pane">
          <div class="tab-header">
            <el-card shadow="always" :body-style="{ paddingLeft: '40px' }">
              <div slot="header">
                <h3>{{ $t("verifyPage.step2.reqTitle") }}</h3>
              </div>
              <ul>
                <li>{{ $t("verifyPage.step2.req1") }}</li>
                <li>{{ $t("verifyPage.step2.req2") }}</li>
                <li>{{ $t("verifyPage.step2.req3") }}</li>
                <li>{{ $t("verifyPage.step2.req4") }}</li>
              </ul>
            </el-card>
          </div>
        </div>
      </el-tabs>
    </div>
    <el-form
      :model="stepForm"
      :rules="rules"
      ref="stepForm"
      label-position="left"
      class="demo-stepForm"
    >
      <el-form-item
        :label="$t('verifyPage.step2.expirationDate')"
        :required="!stepForm.idHasNoExpiration"
      >
        <el-form-item ref="expirationDate" prop="idExpirationDate">
          <el-date-picker
            type="date"
            :placeholder="$t('verifyPage.step2.expirationDate')"
            v-model="idExpirationDate"
            style="width: 100%;"
            :disabled="stepForm.idHasNoExpiration"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item
        :label="$t('verifyPage.step2.noExpiration')"
        prop="idHasNoExpiration"
      >
        <el-checkbox
          :label="$t('verifyPage.step2.noExpirationDescr')"
          name="idHasNoExpiration"
          v-model="idHasNoExpiration"
        ></el-checkbox>
      </el-form-item>
    </el-form>
  </StepWrapper>
</template>

<script>
import { mapState, mapActions } from "vuex";
import StepWrapper from "./StepWrapper.vue";

export default {
  name: "VerifyStep2",
  components: { StepWrapper },
  data() {
    return {
      errors: {
        personalPassport: null,
        personalIDCardFront: null,
        personalIDCardBack: null,
        personalDriverLicenseFront: null,
        personalDriverLicenseBack: null,
      },
      stepForm: {
        idExpirationDate: null,
        idHasNoExpiration: false,
        personalPassport: null,
        personalIDCardFront: null,
        personalIDCardBack: null,
        personalDriverLicenseFront: null,
        personalDriverLicenseBack: null,
      },
      rules: {
        idExpirationDate: [
          {
            type: "date",
            required: true,
            message: this.$t("verifyPage.fieldRequired"),
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("verify", [
      "personalPassport",
      "personalIDCardFront",
      "personalIDCardBack",
      "personalDriverLicenseFront",
      "personalDriverLicenseBack",
    ]),
    idExpirationDate: {
      get: function() {
        this.stepForm.idExpirationDate = this.$store.state.verify.personalIDExpirationDate;
        return this.$store.state.verify.personalIDExpirationDate;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalIDExpirationDate",
          data,
        });
        this.stepForm.idExpirationDate = data;
      },
    },
    idHasNoExpiration: {
      get: function() {
        this.stepForm.idHasNoExpiration = this.$store.state.verify.personalIDHasNoExpiration;
        return this.$store.state.verify.personalIDHasNoExpiration;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalIDHasNoExpiration",
          data,
        });
        this.stepForm.idHasNoExpiration = data;
      },
    },
    activeTab: {
      get: function() {
        if (
          this.personalIDCardFront.preview &&
          this.personalIDCardBack.preview
        ) {
          return "idCard";
        }
        if (
          this.personalDriverLicenseFront.preview &&
          this.personalDriverLicenseBack.preview
        ) {
          return "driversLicense";
        }
        return "passport";
      },
      set: function(data) {
        console.log(data);
      },
    },
  },
  mounted() {
    // this.idExpirationDate = new Date();
    // this.$nextTick(() => {});
  },
  watch: {
    idHasNoExpiration() {
      if (this.stepForm.idHasNoExpiration) {
        this.rules.idExpirationDate.required = false;
        this.$refs.stepForm.clearValidate("idExpirationDate");
      } else {
        this.rules.idExpirationDate.required = true;
      }
    },
  },
  methods: {
    ...mapActions("verify", ["postVerify"]),
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
        if (!this[field]["preview"]) {
          this.errors[field] = this.$t("verifyPage.fieldRequired");
        }
      });
      return new Promise((resolve, reject) => {
        if (this.stepForm.idHasNoExpiration) {
          if (
            this.personalPassport.preview ||
            (this.personalIDCardFront.preview &&
              this.personalIDCardBack.preview) ||
            (this.personalDriverLicenseFront.preview &&
              this.personalDriverLicenseBack.preview)
          ) {
            this.postVerify();
            return resolve(true);
          }
          return reject(false);
        } else {
          this.$refs.stepForm.validate((valid) => {
            if (valid) {
              if (
                this.personalPassport.preview ||
                (this.personalIDCardFront.preview &&
                  this.personalIDCardBack.preview) ||
                (this.personalDriverLicenseFront.preview &&
                  this.personalDriverLicenseBack.preview)
              ) {
                this.postVerify();
                return resolve(true);
              }
            }
            return reject(false);
          });
        }
      });
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
