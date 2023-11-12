<template>
	<div class="container">
		<div class="search-header">
			<img src="../../../../assets/svg/Group 5.svg" />
			<input
				class="v-input styled-search"
				v-model="name"
				@input="searchModels"
				@keyup="checkIsEnterPress"
				placeholder="Search"
			/>
		</div>
		<div>
			<button class="btn-header-setting">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M10.5 6L20.25 6M10.5 6C10.5 6.82843 9.82843 7.5 9 7.5C8.17157 7.5 7.5 6.82843 7.5 6M10.5 6C10.5 5.17157 9.82843 4.5 9 4.5C8.17157 4.5 7.5 5.17157 7.5 6M3.75 6H7.5M10.5 18H20.25M10.5 18C10.5 18.8284 9.82843 19.5 9 19.5C8.17157 19.5 7.5 18.8284 7.5 18M10.5 18C10.5 17.1716 9.82843 16.5 9 16.5C8.17157 16.5 7.5 17.1716 7.5 18M3.75 18L7.5 18M16.5 12L20.25 12M16.5 12C16.5 12.8284 15.8284 13.5 15 13.5C14.1716 13.5 13.5 12.8284 13.5 12M16.5 12C16.5 11.1716 15.8284 10.5 15 10.5C14.1716 10.5 13.5 11.1716 13.5 12M3.75 12H13.5"
						stroke="#A8B2C5"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { debounce } from "lodash";

export default {
	data() {
		return {
			name: "",
		};
	},
	computed: {
		...mapState("models", [
			"models",
			"selectedCountry",
			"selectedCities",
			"selectedAges",
			"selectedLanguages",
		]),
	},
	methods: {
		...mapActions("models", ["getModels", "resetModels"]),
		searchModels: debounce(async function() {
			if (this.name.trim() === "") {
				this.resetModels();
				await this.getModels({});
				return;
			}
			try {
				this.resetModels();

				const data = {
					name: this.name,
					ages: this.selectedAges,
					languages: this.selectedLanguages.map((item) => item?.value),
					cities: this.selectedCities.map((item) => item?.value),
					country: this.selectedCountry?.value,
				};

				await this.getModels(data);
			} catch (error) {
				console.error("Error searching models:", error);
			}
		}, 300), // Adjust the delay as needed
		checkIsEnterPress: function(e) {
			if (e.keyCode === 13) {
				this.$parent.onClick();
			}
		},
	},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

input {
	font-size: 15px;
	color: #4c5165;
	// border: 1px solid #d5dbe7;
	// padding: 0 5px 0 15px;
	width: 140px;
	display: flex;
	// max-width: 100%;
	// width: 220px;
	margin-bottom: -3px;
	background: var(--grayscale-light-blue, #e9edf5);
	background-size: 15px 15px;
	border: none;
	border-radius: 36px;
	// box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	// box-sizing: border-box; // added for responsive design
}
input::placeholder {
	color: #a8b2c5;
}

.container {
	display: flex;
	border: 1px solid #d5dbe7;
	width: 220px;
	height: 40px;
	gap: 5px;
	background: var(--grayscale-light-blue, #e9edf5);
	align-items: center;
	justify-content: center;
	text-align: center;
	background-size: 25px 25px;
	border: none;
	border-radius: 36px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	box-sizing: border-box;
}
.search-header {
	display: flex;
	padding-left: 10px;
}

.btn-header-setting {
	height: 22px;
	margin-left: -5px;
	margin-bottom: -8px;
	background: none;
	border-radius: 50px;
}

.item {
	width: 100%; // make it responsive
	margin: 0 auto 10px auto;
	padding: 10px 20px;
	font-size: 18px;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
	box-sizing: border-box; // added for responsive design
}

.search {
	cursor: pointer;
}

.error {
	background-color: tomato;
}

// Media queries for responsive design
</style>
