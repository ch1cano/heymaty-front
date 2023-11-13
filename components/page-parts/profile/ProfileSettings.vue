<template>
	<div class="tab r-tabs-state-active">
		<div class="settings">
			<form
				v-if="!settings.emailConfirmed"
				class="top-fields flex"
				autocomplete="off"
			>
				<p class="confirm-email-message">
					{{ $t("profileSettings.confirmEmailMessage") }}
				</p>
				<button
					@click.prevent="resendConfirmation()"
					:disabled="!canResendConfirmation"
					type="submit"
					:class="{ disabled: !canResendConfirmation }"
				>
					{{
						canResendConfirmation
							? $t("profileSettings.resendEmailConfirmation")
							: $t("profileSettings.waitFor", {
									seconds: settings.secondsBeforeNewAttempt,
							  })
					}}
				</button>
			</form>
			<form class="top-fields flex" autocomplete="off">
				<!-- <v-input
          v-model="settings.email"
          @input="clearError('email')"
          :error="errors.email"
          holder="E-mail*"
        />-->
				<v-input
					v-if="!user.fromGoogle"
					v-model="settings.old_password"
					@input="clearError('old_password')"
					:error="errors.old_password"
					:holder="$t('profileSettings.oldPasswordPlaceholder')"
					type="password"
				/>
				<v-input
					v-if="!user.fromGoogle"
					v-model="settings.new_password"
					@input="clearError('new_password')"
					:error="errors.new_password"
					:holder="$t('profileSettings.newPasswordPlaceholder')"
					type="password"
				/>
				<v-input
					v-model="settings.email"
					disabled
					:error="
						settings.emailConfirmed
							? { status: false, text: '' }
							: { status: true, text: $t('profileSettings.pleaseConfirmEmail') }
					"
				/>
				<button
					v-if="!user.fromGoogle"
					@click.prevent="changePasswordF()"
					type="submit"
				>
					{{ $t("profileSettings.savePassword") }}
				</button>
			</form>
			<form class="fields" autocomplete="off">
				<p>{{ $t("profileSettings.myProfile") }}</p>

				<v-input
					v-model="form.name"
					@input="clearError('name')"
					:error="errors.name"
					:holder="$t('profileSettings.namePlaceholder')"
				/>
				<v-input
					v-model="form.age"
					@input="clearError('age')"
					:error="errors.age"
					:holder="$t('profileSettings.agePlaceholder')"
					integer
					:disabled="dis.age"
				/>
				<v-input
					v-model="form.profileUrl"
					@input="clearError('profileUrl')"
					:error="errors.profileUrl"
					:holder="$t('profileSettings.profileUrlPlaceholder')"
					prefix="https://heymaty.com/profile/"
				/>

				<v-select
					v-model="form.country"
					:options="countriesOptions"
					autocomplete="off"
					@input="setCity()"
					:placeholder="$t('profileSettings.countriesPlaceholder')"
					:disabled="dis.country"
				>
					<template #open-indicator="{ attributes }">
						<img v-bind="attributes" src="@/assets/svg/select.svg" alt />
					</template>
					<template #option="{ label }">
						<div>{{ label }}</div>
					</template>
				</v-select>

				<v-select
					:options="citiesOptions"
					v-model.lazy="form.city"
					autocomplete="off"
					:filterable="false"
					@open="onOpen"
					@close="onClose"
					@search="(query) => (search = query)"
					:placeholder="$t('profileSettings.citiesPlaceholder')"
					:disabled="dis.city"
				>
					<template #open-indicator="{ attributes }">
						<img v-bind="attributes" src="@/assets/svg/select.svg" alt />
					</template>
				</v-select>

				<template v-if="user.role === 'girl'">
					<!-- <div class="select__wrapper">
            <v-select
              v-model="form.service"
              multiple
              :options="services.map((el) => el.name)"
              @input="clearError('service')"
              label="name"
              :placeholder="$t('profileSettings.servicesPlaceholder')"
              :class="{ error: errors.service.status }"
            >
              <template v-slot:option="option">
                {{ option.name }}
              </template>
              <template #open-indicator="{ attributes }">
                <img v-bind="attributes" src="@/assets/svg/select.svg" alt="" />
              </template>
            </v-select>
            <div v-if="errors.service.status" class="error__text">
              {{ errors.service.text }}
            </div>
          </div>-->

					<div class="select__wrapper">
						<v-select
							v-model="form.lang"
							multiple
							@input="clearError('lang')"
							:options="langs.map((el) => el.name)"
							autocomplete="off"
							label="name"
							:placeholder="$t('profileSettings.languagesPlaceholder')"
							:class="{ error: errors.lang.status }"
						>
							<template v-slot:option="option">{{ option.name }}</template>
							<template #open-indicator="{ attributes }">
								<img v-bind="attributes" src="@/assets/svg/select.svg" alt />
							</template>
						</v-select>
						<div v-if="errors.lang" class="error__text">
							{{ errors.lang.text }}
						</div>
					</div>
					<!-- <v-input
            v-model="form.pricePerDay"
            @input="clearError('pricePerDay')"
            :error="errors.pricePerDay"
            placeholder="Стоимость услуг в день"
          />-->
					<label for="subEnabled" class="sub-enabled">
						<input
							id="subEnabled"
							v-model="form.subscriptionEnabled"
							type="checkbox"
							class="checkbox"
						/>
						<div>{{ $t("profileSettings.subscriptionEnabled") }}</div>
					</label>
					<currency-input
						v-show="form.subscriptionEnabled"
						v-model="form.pricePerDay"
						:placeholder="$t('profileSettings.pricePerDayPlaceholder')"
						:options="{
							currency: 'HDC',
							valueRange: { min: 0.01, max: 10000 },
						}"
					/>

					<currency-input
						v-model="form.pricePerMessage"
						:placeholder="$t('profileSettings.pricePerMessagePlaceholder')"
						:options="{
							currency: 'HDC',
							valueRange: { min: 0.01, max: 10000 },
						}"
					/>

					<!-- <select
            v-model="form.lang"
          >
            <option
              value=""
              disabled
              selected
            >
              Языки
            </option>
            <option
              v-for="(item, i) in langs"
              :key="i"
              :value="item._id"
            >
              {{ item.name }}
            </option>
          </select>-->
				</template>

				<v-txt
					v-model="form.about"
					:holder="$t('profileSettings.aboutPlaceholder')"
				/>

				<button @click.prevent="submit()">
					{{ $t("profileSettings.save") }}
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import dayjs from "dayjs";
import { mapState, mapActions, mapMutations } from "vuex";
import CurrencyInput from "../../ui/CurrencyInput.vue";

export default {
	name: "ProfileSettings",
	// props: {
	//   user: {
	//     type: Object,
	//     default: () => ({}),
	//   },
	// },
	components: {
		CurrencyInput,
	},
	data() {
		return {
			settings: {
				email: "",
				emailConfirmed: false,
				emailConfirmationRequestedAt: null,
				confirmationTimer: null,
				secondsBeforeNewAttempt: 0,
				old_password: "",
				new_password: "",
			},
			observer: null,
			limit: 10,
			search: "",
			form: {
				name: "",
				age: "",
				profileUrl: "",
				about: "",
				// service: "",
				lang: "",
				country: "",
				city: "",
				pricePerDay: 0,
				pricePerMessage: 0,
				subscriptionEnabled: false,
			},
			dis: {
				age: true,
				country: true,
				city: true,
			},
			errors: {
				email: {
					status: false,
					text: "",
				},
				old_password: {
					status: false,
					text: "",
				},
				new_password: {
					status: false,
					text: "",
				},
				name: {
					status: false,
					text: "",
				},
				age: {
					status: false,
					text: "",
				},
				lang: {
					status: false,
					text: "",
				},
				// service: {
				//   status: false,
				//   text: "",
				// },
				pricePerDay: {
					status: false,
					text: "",
				},
				pricePerMessage: {
					status: false,
					text: "",
				},
				profileUrl: {
					status: false,
					text: "",
				},
			},
		};
	},
	computed: {
		...mapState("layout", ["services", "langs", "countries", "cities"]),
		...mapState("user", ["user"]),
		countriesOptions() {
			return this.countries.data.map((country) => ({
				label: country.name, // This will be displayed in the dropdown
				value: country._id, // This will be the actual selected value
			}));
		},
		citiesOptions() {
			return this.cities.map((city) => ({
				label: city.name, // This will be displayed in the dropdown
				value: city._id, // This will be the actual selected value
			}));
		},
		canResendConfirmation() {
			return this.settings.secondsBeforeNewAttempt < 0;
		},
	},
	mounted() {
		this.setDefault();
		this.setSettings();
		this.observer = new IntersectionObserver(this.infiniteScroll);
	},
	beforeDestroy() {
		if (this.settings.confirmationTimer)
			clearInterval(this.settings.confirmationTimer);
	},
	methods: {
		...mapActions("user", [
			"changePassword",
			"updateUser",
			"requestConfirmEmail",
		]),
		...mapActions("model", ["updateModelProfile"]),
		...mapActions("layout", ["getCities"]),
		...mapMutations("layout", ["SET_CITIES"]),
		async resendConfirmation() {
			await this.requestConfirmEmail();
			this.setSettings();
		},
		clearError(type) {
			this.errors[type].status = false;
			this.errors[type].text = "";
		},

		async onOpen() {},
		onClose() {
			this.observer.disconnect();
		},
		async infiniteScroll([{ isIntersecting, target }]) {
			if (isIntersecting) {
				const ul = target.offsetParent;
				const scrollTop = target.offsetParent.scrollTop;
				this.limit += 10;
				await this.$nextTick();
				ul.scrollTop = scrollTop;
			}
		},

		setCity() {
			this.form.city = "";
			this.countries.data.map((country) => {
				if (country._id === this.form.country.value) {
					return this.SET_CITIES(country.cities);
				}
			});
		},
		setSettings() {
			if (this.user) {
				this.settings.email = this.user.email;
				this.settings.emailConfirmed = this.user.emailConfirmed;
				this.settings.emailConfirmationRequestedAt = this.user.emailConfirmationRequestedAt;
				if (
					this.user.emailConfirmationRequestedAt &&
					dayjs(this.user.emailConfirmationRequestedAt)
						.add(30, "seconds")
						.isBefore(dayjs())
				)
					return (this.settings.secondsBeforeNewAttempt = -1);

				if (this.settings.confirmationTimer)
					clearInterval(this.settings.confirmationTimer);
				this.settings.secondsBeforeNewAttempt =
					dayjs(this.user.emailConfirmationRequestedAt)
						.add(30, "seconds")
						.unix() - dayjs().unix();
				this.settings.confirmationTimer = setInterval(() => {
					if (this.settings.secondsBeforeNewAttempt < 0) {
						return clearInterval(this.settings.confirmationTimer);
					}
					this.settings.secondsBeforeNewAttempt--;
				}, 1000);
			}
		},
		setDefault() {
			if (this.user) {
				// console.log(this.user);
				if (this.user.role === "user") {
					this.dis.age = false;
					this.dis.country = false;
					this.dis.city = false;
				}
				this.form.name = this.user.name;
				this.form.age = this.user.realAge;
				if (this.user.profileUrl) {
					this.form.profileUrl = this.user.profileUrl;
				}
				//setting country
				if (this.user.role === "girl" && this.user.personalCountry) {
					this.form.country = this.user.personalCountry;
					this.setCity(this.user.personalCountry);
				}
				if (this.user.role === "user" && this.user.country) {
					this.form.country = this.user.country;
					this.setCity(this.user.country);
				}
				//setting city
				if (this.user.role === "girl" && this.user.personalCity) {
					this.form.city = this.user.personalCity;
				}
				if (this.user.role === "user" && this.user.city) {
					this.form.city = this.user.city;
				}
				if (this.user.description) {
					this.form.about = this.user.description;
				}
				if (this.user.role === "girl") {
					this.form.subscriptionEnabled = this.user.subscriptionEnabled;
					this.form.pricePerDay = parseFloat(
						this.toMoney(this.user.pricePerDay)
					);
					this.form.pricePerMessage = parseFloat(
						this.toMoney(this.user.pricePerMessage)
					);
					// if (this.user.services.length > 0) {
					//   // this.form.service = this.services.find(item => item._id === this.user.services[0])
					//   this.form.service = this.user.services.map((item) => {
					//     const service = this.services.find(
					//       (service) => service._id === item
					//     );
					//     if (service) {
					//       return service.name;
					//     }
					//   });
					// }
					if (this.user.languages.length > 0) {
						// this.form.lang = this.langs.find(item => item._id === this.user.languages[0])
						this.form.lang = this.user.languages.map((item) => {
							const language = this.langs.find((lang) => lang._id === item);
							if (language) {
								return language.name;
							}
						});
					}
				}
			}
		},

		async submit() {
			if (!this.form.name) {
				this.errors.name.status = true;
				this.errors.name.text = this.$t("profileSettings.errorEnterName");
				return false;
			}
			if (!this.form.age) {
				this.errors.age.status = true;
				this.errors.age.text = this.$t("profileSettings.errorEnterAge");
				return false;
			}
			if (this.form.profileUrl) {
				// if (this.form.profileUrl.indexOf(" ") !== -1) {
				//   this.errors.profileUrl.status = true;
				//   this.errors.profileUrl.text =
				//     "Название профиля не должно содержать пробелов.";
				//   return false;
				// }
				if (/\s/gi.test(this.form.profileUrl)) {
					this.errors.profileUrl.status = true;
					this.errors.profileUrl.text = this.$t(
						"profileSettings.errorProfileUrlNoSpaces"
					);
					return false;
				}
				if (/^[0-9]*$/gi.test(this.form.profileUrl)) {
					this.errors.profileUrl.status = true;
					this.errors.profileUrl.text = this.$t(
						"profileSettings.errorProfileUrlNotOnlyNums"
					);
					return false;
				}
				if (!/^[a-z0-9_]*$/g.test(this.form.profileUrl)) {
					this.errors.profileUrl.status = true;
					this.errors.profileUrl.text = this.$t(
						"profileSettings.errorProfileUrlOnlyAlphabet"
					);
					return false;
				}
				if (/^_/gi.test(this.form.profileUrl)) {
					this.errors.profileUrl.status = true;
					this.errors.profileUrl.text = this.$t(
						"profileSettings.errorProfileUrlNotStartWithUnderscore"
					);
					return false;
				}
			}

			let response = "";

			let data = {
				name: this.form.name,
			};
			if (this.user.role === "user" && this.form.age) {
				data.age = this.form.age;
			}
			if (this.form.profileUrl) {
				data.profileUrl = this.form.profileUrl;
			}
			if (this.form.about) {
				data.description = this.form.about;
			}

			if (this.user.role === "user" && this.form.country) {
				data.country = this.form.country.value;
			}

			if (this.user.role === "user" && this.form.city) {
				data.city = this.form.city.value;
			}

			if (this.user.role === "user") {
				console.log("ata = ", data);
				response = await this.updateUser(data);
			} else {
				if (!this.form.pricePerDay || this.form.pricePerDay < 0.01) {
					this.errors.pricePerDay.status = true;
					this.errors.pricePerDay.text = this.$t(
						"profileSettings.errorPricePerDayNotLess1"
					);
					return false;
				}
				data.pricePerDay = parseInt(this.form.pricePerDay * 100);
				if (!this.form.pricePerMessage || this.form.pricePerMessage < 0.01) {
					this.errors.pricePerMessage.status = true;
					this.errors.pricePerMessage.text = this.$t(
						"profileSettings.errorPricePerMessageNotLess1"
					);
					return false;
				}
				data.pricePerMessage = parseInt(this.form.pricePerMessage * 100);
				if (this.form.lang.length === 0) {
					this.errors.lang.status = true;
					this.errors.lang.text = this.$t(
						"profileSettings.errorLanguagesShouldBeOne"
					);
					return false;
				}

				// if (this.form.service.length === 0) {
				//   this.errors.service.status = true;
				//   this.errors.service.text = this.$t(
				//     "profileSettings.errorServicesShouldBeOne"
				//   );
				//   return false;
				// }

				// if (this.form.service) {
				//   console.log(this.services);
				//   const arr = this.form.service.map((service) => {
				//     const serviceId = this.services.find(
				//       (serviceName) => serviceName.name === service
				//     )._id;
				//     if (serviceId) {
				//       return serviceId;
				//     }
				//   });
				//   data.services = JSON.stringify(arr);
				// }
				if (this.form.lang.length) {
					console.log(this.form.lang);
					const arr = this.form.lang.map((lang) => {
						const langId = this.langs.find((langName) => langName.name === lang)
							._id;
						if (langId) {
							return langId;
						}
					});
					data.languages = JSON.stringify(arr);
				}
				data.subscriptionEnabled = this.form.subscriptionEnabled;
				// console.log(data);
				response = await this.updateModelProfile(data);
			}
			if (response && response.type === "error") {
				if (response.message === "Profile Url already exist") {
					this.errors.profileUrl.status = true;
					this.errors.profileUrl.text = this.$t(
						"profileSettings.errorsProfileUrlIsTaken"
					);
				} else {
					console.log(response);
					let text = this.$t("profileSettings.notifications.errorGeneric");
					if (response.message && this.$errors_types[response.message]) {
						text = this.$errors_types[response.message];
					}
					this.$notify.error({
						title: this.$t("profileSettings.notifications.errorTitle"),
						message: text,
					});
				}
				return false;
			}
			this.$notify.success({
				message: this.$t("profileSettings.notifications.successProfileUpdated"),
			});
		},

		// Сменить пароль
		async changePasswordF() {
			if (!this.settings.old_password) {
				this.errors.old_password.status = true;
				this.errors.old_password.text = this.$t(
					"profileSettings.errorsEnterOldPass"
				);
				return false;
			}
			if (!this.settings.new_password) {
				this.errors.new_password.status = true;
				this.errors.new_password.text = this.$t(
					"profileSettings.errorsEnterNewPass"
				);
				return false;
			}
			if (this.settings.new_password.length < 5) {
				this.errors.new_password.status = true;
				this.errors.new_password.text = this.$t(
					"profileSettings.errorsNewPassMin5"
				);
				return false;
			}

			const response = await this.changePassword({
				oldPassword: this.settings.old_password,
				newPassword: this.settings.new_password,
			});
			if (response && response.type === "error") {
				let text = this.$t("profileSettings.notifications.errorGeneric");
				if (response.message && this.$errors_types[response.message]) {
					text = this.$errors_types[response.message];
				}
				this.$notify.error({
					title: this.$t("profileSettings.notifications.errorTitle"),
					message: text,
				});
				return false;
			}
			this.$notify.success({
				message: this.$t(
					"profileSettings.notifications.successPasswordUpdated"
				),
			});
			this.settings = {
				old_password: "",
				new_password: "",
			};
		},
	},
};
</script>

<style lang="scss">
.disabled {
	cursor: default;
}
.confirm-email-message {
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
}
.sub-enabled {
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	margin-left: 30px;
	input {
		width: 1.5rem;
	}
	div {
		margin-left: 1rem;
		font-size: 1.2rem;
	}
}
.select__wrapper {
	position: relative;
}
.v-select {
	&.error {
		.vs__dropdown-toggle {
			border: 1px solid red;
		}
	}
	.vs__dropdown-menu {
		border-bottom-left-radius: 26px;
		border-bottom-right-radius: 26px;
		li {
			font-size: 18px;
			margin-bottom: 5px;
		}
	}
	.vs__dropdown-toggle {
		width: 100%;
		font-size: 26px;
		color: #4c5165;
		min-height: 53px;
		border-radius: 22px;
		background: rgba(234, 229, 246, 0.47);
		border: 1px solid #d5dbe7;
		padding: 0 24.25px;
		margin-bottom: 25px;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		.vs__selected-options {
			max-width: calc(100% - 20px);
			.vs__selected {
				height: 44px !important;
				border: none !important;
			}
			.vs__deselect {
				width: auto !important;
				background: none !important;
				height: auto !important;
				padding-left: 10px;
			}
			.vs__search {
				height: auto !important;
				border-radius: 0 !important;
				background: none !important;
				border: none !important;
				padding: 0 !important;
				font-size: 22px !important;
			}
		}
		.vs__actions {
			position: absolute;
			right: 5px;
			top: 50%;
			transform: translateY(-50%);
			padding-left: 5px;
			.vs__open-indicator {
				object-fit: none;
				background: none !important;
			}
			.vs__clear {
				display: none !important;
			}
		}
	}
	&.vs--open {
		.vs__dropdown-toggle {
			border-bottom-left-radius: 0px;
			border-bottom-right-radius: 0px;
		}
	}
}
</style>
