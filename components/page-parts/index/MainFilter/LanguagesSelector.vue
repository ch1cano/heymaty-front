<template>
	<div class="select selcted-none">
		<div class="selecttop">
			<p>Language</p>
		</div>
		<v-select
			multiple
			:options="options"
			:filterable="true"
			v-model="selected"
			:placeholder="$t('index.languagesPlaceholder')"
			:closeOnSelect="false"
			:clearSearchOnSelect="false"
			:deselectFromDropdown="true"
			@input="onInput"
		>
			<template #search="{ events, attributes }">
				<input
					type="search"
					:placeholder="
						`${$t('Select a language')} ${
							selected.length ? '(' + selected.length + ')' : ''
						}`
					"
					class="vs__search"
					v-bind="attributes"
					v-on="events"
				/>
			</template>
			<template #option="option">
				<input
					:checked="selected.map((lang) => lang.value).includes(option.value)"
					:id="option.label"
					type="checkbox"
					class="checkbox"
					disabled
				/>
				<label :for="option.label"> {{ option.label }} </label>
			</template>
			<template #open-indicator="{ attributes }">
				<img
					v-bind="attributes"
					src="../../../../assets/svg/select.svg"
					alt=""
				/>
			</template>
			<template #no-options="{}"> {{ $t("index.languagesNoMatch") }}</template>
		</v-select>
	</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
	name: "LanguagesSelector",
	computed: {
		...mapState("models", [
			"models",
			"selectedCountry",
			"selectedCities",
			"selectedAges",
			"selectedLanguages",
		]),
		...mapState("layout", ["langs"]),
		options() {
			return this.langs.map((lang) => ({
				label: lang.name, // This will be displayed in the dropdown
				value: lang._id, // This will be the actual selected value
			}));
		},
		selected: {
			get: function() {
				return this.selectedLanguages;
			},
			set: function(val) {
				this.SET_SELECTED({ field: "selectedLanguages", value: val });
			},
		},
	},
	methods: {
		...mapActions("models", ["getModels", "resetModels"]),
		...mapMutations("models", ["SET_SELECTED"]),
		onInput() {
			this.$emit("input");
		},
	},
};
</script>
<style lang="scss">
.select {
	width: 15%;
	@media only screen and (max-width: 1200px) {
		width: 19%;
	}
	&.selcted-none {
		.v-select {
			.vs__dropdown-toggle {
				.vs__selected-options {
					.vs__selected {
						display: none !important;
					}
				}
			}
			.vs__dropdown-menu {
				.vs__dropdown-option {
					padding: 0 !important;
					margin: 15px 0;
					label {
						padding-top: 1px;
						color: #333;
						line-height: 1.42857143;
						font-size: 15px;
					}
					&:first-child {
						margin-top: 0;
					}
				}
				.vs__dropdown-option--highlight {
					background: #ffffff;
				}
			}
		}
	}
	.v-select {
		&.vs--single {
			.vs__dropdown-toggle {
				.vs__selected-options {
					.vs__selected {
						position: relative;
						width: calc(100% - 28px) !important;
						padding-top: 4px;
						p {
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						@media only screen and (max-width: 992px) {
							width: calc(100% - 10px) !important;
						}
						@media only screen and (max-width: 576px) {
							width: calc(100% - 20px) !important;
						}
					}
				}
			}
		}
		.vs__dropdown-menu {
			flex-wrap: nowrap;
			width: 100%;
			z-index: 15;
			min-width: auto;
			overflow-x: hidden;
			padding: 10px 10px 5px 10px;
			.vs__dropdown-option {
				overflow-wrap: break-word !important;
				word-wrap: break-word !important;
				white-space: normal !important;
				max-width: 100%;
			}
		}
		.vs__dropdown-toggle {
			z-index: 20;
			width: calc(100% - 10px);
			font-size: 18px;
			color: #4c5165;
			min-height: 40.5px;
			border-radius: 36px;
			border: 1px solid #d5dbe7;
			padding: 0 5px 0 15px;
			margin-bottom: 25px;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			@media only screen and (max-width: 576px) {
				margin-bottom: 5px !important;
			}
			.vs__selected-options {
				.vs-selected {
					height: 44px !important;
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
				}
			}
		}
	}
}
</style>
