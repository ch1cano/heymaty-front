<template>
  <div class="tab r-tabs-state-active">
    <div v-if="bundles.length" class="flex">
      <bundle
        v-for="item in bundles"
        :key="item._id"
        :bundle="item"
        class="profile-bundle"
      >
        <div class="stats">
          <span class="bought">{{
            $tc("profileBundles.beenBought", item.payments.length || 0)
          }}</span>
        </div>
        <div v-if="mine" class="links">
          <a
            @click.prevent="confirmDeleteBundle(item._id)"
            href="#"
            class="dellink"
          >
            <!-- {{ $t("profileBundles.delete") }} -->
            &nbsp;
          </a>
        </div>
      </bundle>
    </div>
    <div v-else class="flex">
      <p>{{ $t("profileBundles.noBundles") }}</p>
    </div>
    <div v-if="mine" class="new-post">
      <form>
        <p>{{ $t("profileBundles.newBundle") }}</p>
        <v-input
          v-model="form.qty"
          @input="clearError('qty')"
          :error="errors.qty"
          :holder="$t('profileBundles.newBundleQtyPlaceholder')"
          type="number"
        />
        <currency-input
          :placeholder="$t('profileBundles.newBundlePricePlaceholder')"
          v-model="form.price"
          :options="{
            currency: 'HDC',
            valueRange: { min: 0.01, max: 10000 },
          }"
        />
        <v-input
          v-model="form.description"
          @input="clearError('description')"
          :error="errors.description"
          :limit="50"
          :holder="$t('profileBundles.newBundleDescrPlaceholder')"
        />
        <div class="select__wrapper" style="margin-bottom: 35px;">
          <v-select
            v-model="form.type"
            :options="types"
            :reduce="(type) => type.value"
            label="name"
            :placeholder="$t('profileBundles.newBundleTypePlaceholder')"
          >
            <template #option="option">{{ option.name }}</template>
            <template #open-indicator="{ attributes }">
              <img v-bind="attributes" src="@/assets/svg/select.svg" alt />
            </template>
          </v-select>
          <div
            class="error__text"
            style="color: initial; font-size:16px; line-height: 14px;"
          >
            {{ types.filter((t) => t.value === form.type)[0].description }}
          </div>
        </div>
        <v-input
          v-if="form.type === 'limited'"
          v-model="form.amount"
          @input="clearError('amount')"
          :error="errors.amount"
          :holder="$t('profileBundles.newBundleAmountPlaceholder')"
        />
        <div class="public">
          <input
            id="ins"
            v-model="form.isActive"
            type="checkbox"
            class="checkbox"
          />
          <label for="ins">{{ $t("profileBundles.newBundleIsActive") }}</label>
        </div>

        <div style="display: flex; flex-wrap: wrap">
          <div class="create" style="margin-top: 2px; margin-bottom: 0.5rem">
            <button @click.prevent="submit()" type="submit">
              {{ $t("profileBundles.newBundleCreate") }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConfirmPopup from "../../modals/ConfirmPopup.vue";
import CurrencyInput from "../../ui/CurrencyInput.vue";
import Bundle from "../bundles/Bundle.vue";

export default {
  name: "ProfileBundles",
  props: {
    mine: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
  },
  components: { CurrencyInput, Bundle },
  data() {
    return {
      form: {
        qty: null,
        price: null,
        description: "",
        type: "unlimited",
        amount: null,
        isActive: true,
      },
      errors: {
        amount: {
          status: false,
          text: "",
        },
        qty: {
          status: false,
          text: "",
        },
        description: {
          status: false,
          text: "",
        },
      },
      types: [
        {
          value: "unlimited",
          name: this.$t("profileBundles.bundleTypesUnlimName"),
          description: this.$t("profileBundles.bundleTypesUnlimDescr"),
        },
        {
          value: "limited",
          name: this.$t("profileBundles.bundleTypesLimName"),
          description: this.$t("profileBundles.bundleTypesLimDescr"),
        },
      ],
      loading: false,
      bundles: [],
      user: {},
    };
  },
  computed: {
    publicUrl() {
      return process.env.PUBLIC_URL;
    },
    isChildShown() {
      return !!this.$route.params.postid;
    },
  },
  watch: {
    "$i18n.locale": function() {
      this.types = [
        {
          value: "unlimited",
          name: this.$t("profileBundles.bundleTypesUnlimName"),
          description: this.$t("profileBundles.bundleTypesUnlimDescr"),
        },
        {
          value: "limited",
          name: this.$t("profileBundles.bundleTypesLimName"),
          description: this.$t("profileBundles.bundleTypesLimDescr"),
        },
      ];
    },
  },
  mounted() {
    this.getAllBundles();
  },
  methods: {
    ...mapActions("model", [
      "createBundle",
      "getBundle",
      "deleteBundle",
      "getBundles",
    ]),

    async confirmDeleteBundle(id) {
      const that = this;
      this.$vfm.show({
        component: ConfirmPopup,
        bind: { message: that.$t("profileBundles.deleteConfirm") },
        on: {
          async confirm(close) {
            const response = await that.deleteBundle({ id });
            if (response && response.data) {
              that.$notify.success({
                message: response.data.message,
              });
            } else {
              that.$notify.error({
                message: response.message,
              });
            }
            close();
            await that.getAllBundles();
          },
          cancel(close) {
            close();
          },
        },
      });
    },
    clearError(type) {
      this.errors[type].status = false;
      this.errors[type].text = "";
    },

    async getAllBundles() {
      const data = await this.getBundles();
      if (data && data.type !== "error") {
        this.bundles = data.bundles;
      }
    },

    resetForm() {
      this.form = {
        qty: null,
        price: null,
        description: "",
        type: "unlimited",
        amount: null,
        isActive: true,
      };
    },

    // Создать новый пакет
    async submit() {
      if (!this.loading) {
        if (this.form.type === "limited" && !this.form.amount) {
          this.errors.amount.status = true;
          this.errors.amount.text = this.$t("profileBundles.errorEnterAmount");
          return false;
        }
        if (!this.form.qty || this.form.qty < 1) {
          this.errors.qty.status = true;
          this.errors.qty.text = this.$t("profileBundles.errorEnterQty");
          return false;
        }
        if (this.form.description.length > 50) {
          this.errors.description.status = true;
          this.errors.description.text = this.$tc(
            "profileBundles.errorDescriptionLength",
            50
          );
          return false;
        }

        this.loading = true;

        const bundleData = {};
        bundleData.qty = parseInt(this.form.qty);
        bundleData.price = this.toCents(this.form.price);
        bundleData.description = this.form.description;
        bundleData.type = this.form.type;
        bundleData.amount = this.form.amount;
        bundleData.isActive = this.form.isActive;

        const response = await this.createBundle(bundleData);
        if (response && response.data && response.data.error) {
          this.$notify.error({
            title: this.$t("profileBundles.notifications.errorTitle"),
            message: response.data.error.message,
          });
          this.loading = false;
          return false;
        }
        this.$notify.success({
          message: this.$t("profileBundles.notifications.successBundleCreated"),
        });
        this.resetForm();
        this.getAllBundles();
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-bundle {
  width: 50%;
  margin-bottom: 10px;
}
.links {
  position: absolute;
  top: 10px;
  right: 0;
  a {
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    line-height: 24px;
    margin-right: 20px;
    padding-left: 26px;
  }
  .dellink {
    background: url(~assets/img/post-icon2-red.svg) no-repeat 0 2px;
    margin-right: 0;
    color: #e46974;
  }
}
</style>
