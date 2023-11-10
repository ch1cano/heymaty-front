<template>
	<header :class="{ inner: $route.path === '/settings' }" class="header">
		<div class="wrapper">
			<div class="wrap">
				<div>
					<n-link :to="redirectPath">
						<img src="@/assets/img/logo-heymaty.svg" />
					</n-link>
				</div>
				<div class="leftnav">
					<SearchSelector />

					<!-- <ul
						ref="mobileMenu"
						:class="{ opened: isMenu }"
						:style="isMenu ? `overflow:unset` : `overflow:hidden`"
					>
						<li>
							<n-link :to="localePath('/')">{{ $t("header.models") }}</n-link>
						</li>
						<li>
							<LangSwitch />
							<SoundSwitch v-if="user" />
						</li>
						<li>
							<div v-if="!auth" class="buttons">
								<button @click.prevent="changeModal('signUp', true)">
									{{ $t("header.register") }}
								</button>
								<button @click.prevent="changeModal('signIn', true)">
									{{ $t("header.login") }}
								</button>
							</div>
							<div v-else class="links">
								<a
									v-for="(item, i) in menu"
									:key="i"
									:style="
										item.showFor.includes(user.role) ? `` : `display:none`
									"
									@click.prevent="goTo(localePath(item.link)), (isMenu = false)"
									:href="item.link"
								/>
								<a class="clearfix" @click.prevent="toggleDropdown()" href="#">
									<transition name="slide-bottom" mode="out-in">
										<div v-if="isDropdown" class="header-profile">
											<div
												@click="goTo(localePath('/Settings/Personal'))"
												class="header-profile__item"
											>
												{{ $t("header.settings") }}
											</div>
											<div
												@click="goTo(localePath(`/profile/${getLink(user)}`))"
												class="header-profile__item"
											>
												{{ $t("header.myprofile") }}
											</div>
											<div @click="logOut()" class="header-profile__item">
												{{ $t("header.logout") }}
											</div>
										</div>
									</transition>
								</a>
							</div>
						</li>
					</ul> -->

					<div v-if="!auth" class="buttons">
						<button @click.prevent="changeModal('signUp', true)">
							{{ $t("header.register") }}
						</button>
						<button @click.prevent="changeModal('signIn', true)">
							{{ $t("header.login") }}
						</button>
					</div>
					<div v-else class="links">
						<n-link key="search" :to="localePath('/')"></n-link>

						<!-- <n-link v-for="(item, i) in menu" :key="i" :to="item.link" /> -->
						<a
							@click.prevent="toggleDropdown()"
							href="#"
							v-click-outside="toggleDropdown"
						>
							<transition name="slide-bottom" mode="out-in">
								<div v-if="isDropdown" class="header-profile">
									<div
										@click="goTo(localePath(`/profile/${getLink(user)}`))"
										class="header-profile__item"
									>
										{{ $t("header.myprofile") }}
									</div>
									<div
										@click="goTo(localePath(`/dialoges`))"
										class="header-profile__item"
									>
										Chats
									</div>
									<div
										@click="goTo(localePath(`/favorites`))"
										class="header-profile__item"
									>
										Favorites
									</div>
									<div
										@click="goTo(localePath(`/Privacy`))"
										class="header-profile__item"
									>
										Privacy Policy
									</div>
									<div
										@click="goTo(localePath(`/Terms`))"
										class="header-profile__item"
									>
										Terms of Service
									</div>
									<div
										@click="goTo(localePath('/Settings/Personal'))"
										class="header-profile__item"
									>
										{{ $t("header.settings") }}
									</div>
									<div @click="logOut()" class="header-profile__item">
										{{ $t("header.logout") }}
									</div>
								</div>
							</transition>
						</a>
					</div>
					<a
						@click.prevent="toggleMobile()"
						:class="{ active: isMenu }"
						class="menu-button"
					/>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import LangSwitch from "./LangSwitch.vue";
import SoundSwitch from "./SoundSwitch.vue";
import SearchSelector from "../page-parts/index/MainFilter/SearchSelector.vue";

export default {
	name: "TheHeader",
	data() {
		return {
			isMenu: false, // mobile menu
			menu: [
				{ title: "", link: "/favorites", showFor: ["user"] },
				{ title: "", link: "/dialoges", showFor: ["user", "girl"] },
			],
			isDropdown: false,
		};
	},
	components: {
		LangSwitch,
		SoundSwitch,
		SearchSelector,
	},
	watch: {
		$route(to, from) {
			this.isMenu = false;
			this.$refs.mobileMenu.style = "";
		},
		// async latestMessage() {
		//   if (this.latestMessage) {
		//     const from = await this.getUserById({
		//       id: this.latestMessage.from,
		//     });
		//     const mess = `Новое сообщение от ${from.name}<br />${this.latestMessage.message}`;
		//     this.$notify.success({
		//       message: mess,
		//     });
		//   }
		// },
	},
	computed: {
		...mapGetters("user", ["auth"]),
		...mapState("messages", ["newMessages", "latestMessage"]),
		...mapState("user", ["user"]),
		...mapState("post", ["openPosts"]),
		redirectPath() {
			return this.auth ? this.localePath("/Feed") : this.localePath("/");
		},
		initLang() {
			return {
				title: this.$i18n.locales.find((l) => l.code === this.$i18n.locale)
					.name,
				flag: this.$i18n.locales.find((l) => l.code === this.$i18n.locale).flag,
			};
		},
		allLocales() {
			return this.$i18n.locales.map((l) => {
				return {
					title: l.name,
					flag: l.flag,
					code: l.code,
				};
			});
		},
	},
	methods: {
		...mapMutations("user", ["LOG_OUT"]),
		...mapActions("user", ["getUserById"]),
		...mapActions("post", ["resetPosts"]),
		...mapActions("verify", ["removeVerification"]),
		changeLocale(l) {
			this.$i18n.setLocale(l.code);
		},
		toggleMobile() {
			this.isMenu = !this.isMenu;

			const el = this.$refs.mobileMenu;
			if (this.isMenu) {
				// el.style = `height: ${el.scrollHeight}px`;
			} else {
				el.style = "";
			}
		},

		toggleDropdown(event) {
			// Проверяем, было ли событие вызвано кликом на ссылке для открытия выпадающего списка
			if (!event && this.isDropdown === false) {
				this.isDropdown = true;
			} else {
				this.isDropdown = false;
			}
		},

		logOut() {
			if (this.user) {
				this.$store.dispatch(
					"$nuxtSocket/emit", // Remember, "emit" is namespaced to "$nuxtSocket"
					{
						label: "messages", // Use persisted socket "messages"
						evt: "logout",
						msg: this.user._id,
						emitTimeout: 3000,
					}
				);
			}
			this.resetPosts();
			this.removeVerification();
			this.LOG_OUT();
			this.$router.push(this.localePath("/"));
			// setTimeout(() => {
			//   this.LOG_OUT();
			// }, 300);
		},
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
	display: flex;
	width: 100%;
}

.wrap {
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0px 24px;
}

.leftnav {
	display: flex;
	gap: 10px;
}

.clearfix:after {
	content: "\0020";
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
}
</style>
