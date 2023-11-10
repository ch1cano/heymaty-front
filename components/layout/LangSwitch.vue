<template>
	<div class="ls-container">
		<!-- <a
      href="#"
      v-for="locale in availableLocales"
      :key="locale.code"
      @click.prevent.stop="$i18n.setLocale(locale.code)"
      ><country-flag :country="locale.flag"
    /></a> -->

		<nuxt-link
			v-for="locale in availableLocales"
			:key="locale.code"
			:to="switchLocalePath(locale.code)"
		>
			<country-flag :country="locale.flag" />
		</nuxt-link>
	</div>
</template>

<script>
import CountryFlag from "vue-country-flag";
export default {
	name: "LangSwitch",
	components: { CountryFlag },
	computed: {
		availableLocales() {
			return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
		},
	},
};
</script>

<style lang="scss" scoped>
.ls-container {
	position: absolute;
	right: 0px;
	top: 0px;
	a {
		text-decoration: none;
		&:hover {
			text-decoration: none;
			border-bottom: initial;
		}
	}
}
</style>
