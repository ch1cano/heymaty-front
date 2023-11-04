<template>
  <StepWrapper step="1" from="3">
    <el-form
      :model="stepForm"
      :rules="rules"
      ref="stepForm"
      label-position="left"
      class="step-form"
      size="medium"
    >
      <h2>{{ $t("verifyPage.step1.personal") }}</h2>

      <el-form-item :label="$t('verifyPage.step1.fieldName')" prop="firstName">
        <el-input v-model="firstName"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('verifyPage.step1.fieldSecondName')"
        prop="secondName"
      >
        <el-input v-model="secondName"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('verifyPage.step1.fieldFamilyName')"
        prop="familyName"
      >
        <el-input v-model="familyName"></el-input>
      </el-form-item>

      <el-form-item :label="$t('verifyPage.step1.fieldDOB')" required>
        <el-form-item prop="birthDate">
          <el-date-picker
            type="date"
            :placeholder="$t('verifyPage.step1.fieldDOB')"
            v-model="birthDate"
            style="width: 100%;"
            :picker-options="dobPickerOptions"
            :default-value="dobDefaultValue"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>

      <el-form-item :label="$t('verifyPage.step1.fieldSex')" prop="sex">
        <el-select
          style="width: 100%;"
          v-model="sex"
          :placeholder="$t('verifyPage.step1.fieldSex')"
        >
          <el-option
            :label="$t('verifyPage.step1.sexOptions.male')"
            value="male"
          ></el-option>
          <el-option
            :label="$t('verifyPage.step1.sexOptions.female')"
            value="female"
          ></el-option>
        </el-select>
      </el-form-item>

      <h2>{{ $t("verifyPage.step1.address") }}</h2>

      <el-form-item :label="$t('verifyPage.step1.fieldCountry')" prop="country">
        <el-select
          style="width: 100%;"
          v-model="country"
          :placeholder="$t('verifyPage.step1.fieldCountry')"
          :loading="countriesLoading"
          filterable
        >
          <el-option
            v-for="country in countries"
            :label="country"
            :value="country"
            :key="country"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('verifyPage.step1.fieldCity')" prop="city">
        <el-select
          style="width: 100%;"
          v-model="city"
          :placeholder="$t('verifyPage.step1.fieldCity')"
          :disabled="!stepForm.country"
          :loading="citiesLoading"
          filterable
        >
          <el-option
            v-for="city in cities"
            :label="city"
            :value="city"
            :key="city"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('verifyPage.step1.fieldStreet')" prop="street">
        <el-input v-model="street"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('verifyPage.step1.fieldBuilding')"
        prop="building"
      >
        <el-input v-model="building"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('verifyPage.step1.fieldAppartment')"
        prop="apartment"
      >
        <el-input v-model="appartment"></el-input>
      </el-form-item>

      <el-form-item :label="$t('verifyPage.step1.fieldZIP')" prop="zip">
        <el-input v-model="zip"></el-input>
      </el-form-item>
    </el-form>
  </StepWrapper>
</template>

<script>
import { mapState, mapActions } from "vuex";
import StepWrapper from "./StepWrapper.vue";

export default {
  name: "VerifyStep1",
  components: {
    StepWrapper,
  },
  data() {
    return {
      stepForm: {
        firstName: "",
        secondName: "",
        familyName: "",
        birthDate: null,
        sex: null,
        country: null,
        city: null,
        street: "",
        building: "",
        appartment: "",
        zip: "",
      },
      dobPickerOptions: {
        disabledDate: this.disabledDate,
        firstDayOfWeek: 1,
      },
      dobDefaultValue: this.$dayjs().subtract(18, "year"),
      countries: [],
      cities: [],
      countriesLoading: true,
      citiesLoading: true,
      rules: {
        firstName: [
          {
            required: true,
            message: this.$t("verifyPage.fieldRequired"),
            trigger: "blur",
          },
          // {
          //   min: 3,
          //   max: 5,
          //   message: "Length should be 3 to 5",
          //   trigger: "blur",
          // },
        ],
        familyName: [
          {
            required: true,
            message: this.$t("verifyPage.fieldRequired"),
            trigger: "blur",
          },
        ],
        birthDate: [
          {
            type: "date",
            required: true,
            message: this.$t("verifyPage.fieldRequired"),
            trigger: "change",
          },
        ],
        sex: [
          {
            required: true,
            message: this.$t("verifyPage.fieldRequired"),
            trigger: "change",
          },
        ],
        country: [
          {
            required: true,
            message: this.$t("verifyPage.fieldRequired"),
            trigger: "change",
          },
        ],
        city: [
          {
            required: true,
            message: this.$t("verifyPage.fieldRequired"),
            trigger: "change",
          },
        ],
        street: [
          {
            required: true,
            message: this.$t("verifyPage.fieldRequired"),
            trigger: "blur",
          },
        ],
        building: [
          {
            required: true,
            message: this.$t("verifyPage.fieldRequired"),
            trigger: "blur",
          },
        ],
        zip: [
          {
            required: true,
            message: this.$t("verifyPage.fieldRequired"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    // ...mapState("verify", ["personalFirstName", "personalSecondName", "personalFamilyName", "personalBirthDate", "personalSex", "personalCountry", "personalCity", "personalStreet", "personalBuilding", "personalAppartment", "personalZIP"]),
    // firstName: {
    //   get: function () {
    //     return this.personalFirstName
    //   },
    //   set: function (data) {
    //     this.setPersonal({ field: "personalFirstName", data })
    //   }
    // },
    firstName: {
      get: function() {
        this.stepForm.firstName = this.$store.state.verify.personalFirstName;
        return this.$store.state.verify.personalFirstName;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalFirstName",
          data,
        });
        this.stepForm.firstName = data;
      },
    },
    secondName: {
      get: function() {
        this.stepForm.secondName = this.$store.state.verify.personalSecondName;
        return this.$store.state.verify.personalSecondName;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalSecondName",
          data,
        });
        this.stepForm.secondName = data;
      },
    },
    familyName: {
      get: function() {
        this.stepForm.familyName = this.$store.state.verify.personalFamilyName;
        return this.$store.state.verify.personalFamilyName;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalFamilyName",
          data,
        });
        this.stepForm.familyName = data;
      },
    },
    birthDate: {
      get: function() {
        this.stepForm.birthDate = this.$store.state.verify.personalBirthDate;
        return this.$store.state.verify.personalBirthDate;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalBirthDate",
          data,
        });
        this.stepForm.birthDate = data;
      },
    },
    sex: {
      get: function() {
        this.stepForm.sex = this.$store.state.verify.personalSex;
        return this.$store.state.verify.personalSex;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalSex",
          data,
        });
        this.stepForm.sex = data;
      },
    },
    country: {
      get: function() {
        this.stepForm.country = this.$store.state.verify.personalCountry;
        return this.$store.state.verify.personalCountry;
      },
      set: async function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalCountry",
          data,
        });
        this.stepForm.country = data;
        this.citiesLoading = true;
        this.cities = await this.getCities(data);
        this.citiesLoading = false;
      },
    },
    city: {
      get: function() {
        this.stepForm.city = this.$store.state.verify.personalCity;
        return this.$store.state.verify.personalCity;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalCity",
          data,
        });
        this.stepForm.city = data;
      },
    },
    street: {
      get: function() {
        this.stepForm.street = this.$store.state.verify.personalStreet;
        return this.$store.state.verify.personalStreet;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalStreet",
          data,
        });
        this.stepForm.street = data;
      },
    },
    building: {
      get: function() {
        this.stepForm.building = this.$store.state.verify.personalBuilding;
        return this.$store.state.verify.personalBuilding;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalBuilding",
          data,
        });
        this.stepForm.building = data;
      },
    },
    appartment: {
      get: function() {
        this.stepForm.appartment = this.$store.state.verify.personalAppartment;
        return this.$store.state.verify.personalAppartment;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalAppartment",
          data,
        });
        this.stepForm.appartment = data;
      },
    },
    zip: {
      get: function() {
        this.stepForm.zip = this.$store.state.verify.personalZIP;
        return this.$store.state.verify.personalZIP;
      },
      set: function(data) {
        this.$store.dispatch("verify/setPersonal", {
          field: "personalZIP",
          data,
        });
        this.stepForm.zip = data;
      },
    },
  },
  methods: {
    ...mapActions("verify", ["setPersonal", "postVerify"]),
    ...mapActions("layout", ["getCountries", "getCities"]),
    // getter: ({field, storeField}) => {
    //   return () => {
    //     this.stepForm[field] = this.$store.state.verify[storeField];
    //     return this.$store.state.verify[storeField];
    //   }
    // },
    disabledDate(date) {
      const diff = this.$dayjs().diff(this.$dayjs(date), "year");
      return diff < 18;
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.stepForm.validate((valid) => {
          if (valid) {
            this.postVerify();
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    },
  },
  async mounted() {
    this.countriesLoading = true;
    this.countries = await this.getCountries();
    this.countriesLoading = false;
  },
};
</script>
<style scoped lang="scss"></style>
