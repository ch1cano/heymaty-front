<template>
	<header :class="{ inner: $route.path === '/settings' }" class="header">
		<div class="wrapperh">
			<div class="wrap">
				<div class="heymaty">
					<n-link :to="redirectPath">
						<img src="@/assets/svg/Vector.svg" />
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
						<n-link key="dialoges" :to="localePath('/dialoges')"></n-link>
						<n-link key="favorites" :to="localePath('/favorites')"></n-link>
						<!-- <n-link v-for="(item, i) in menu" :key="i" :to="item.link" /> -->
						<a
							@click.prevent="toggleDropdown()"
							href="#"
							v-click-outside="toggleDropdown"
						>
							<transition name="slide-bottom" mode="out-in">
								<div v-if="isDropdown" class="header-profile">
									<div class="user">
										<div class="userinfo">
											<div class="useravatar">
												<img alt="#" src="../../assets/img/avatar.png" />
											</div>
											<div class="username">
												<p>Alexa Winston, 25</p>
											</div>
											<div class="usertag">
												<p>
													@alexa25
												</p>
											</div>
											<div class="userlocation">
												<img alt="#" src="../../assets/svg/location.svg" />
												<p>Saint Petersburg, Russia</p>
											</div>
										</div>
									</div>
									<div
										@click="goTo(localePath(`/profile/${getLink(user)}`))"
										class="header-profile__item"
									>
										<img
											class="navimg"
											alt="#"
											src="../../assets/svg/Group 38.svg"
										/>
										<p>
											{{ $t("header.myprofile") }}
										</p>
									</div>
									<!-- <div
										@click="goTo(localePath(`/dialoges`))"
										class="header-profile__item"
									>
										Chats
									</div> -->
									<!-- <div
										@click="goTo(localePath(`/favorites`))"
										class="header-profile__item"
									>
										Favorites
									</div> -->
									<div
										@click="goTo(localePath(`/Privacy`))"
										class="header-profile__item"
									>
										<img
											class="navimg"
											alt="#"
											src="../../assets/svg/privacy.svg"
										/>
										<p>Privacy Policy</p>
									</div>
									<div
										@click="goTo(localePath(`/Terms`))"
										class="header-profile__item"
									>
										<img
											class="navimg"
											alt="#"
											src="../../assets/svg/terms.svg"
										/>
										<p>Terms of Service</p>
									</div>
									<div
										@click="goTo(localePath('/Settings/Personal'))"
										class="header-profile__item"
									>
										<img
											class="navimg"
											alt="#"
											src="../../assets/svg/gear.svg"
										/>
										<p>{{ $t("header.settings") }}</p>
									</div>
									<div @click="logOut()" class="header-profile__item">
										<img
											class="navimg"
											alt="#"
											src="../../assets/svg/logout.svg"
										/>
										<p>
											{{ $t("header.logout") }}
										</p>
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
			// this.$refs.mobileMenu.style = "";
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
.wrapperh {
	display: flex;
	width: 100%;
	align-items: center;
}

.wrap {
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0px 24px;
	align-items: center;
}

.user {
	padding-top: 15px;
	padding-bottom: 5px;
}
.useravatar {
	display: flex;
	justify-content: center;
}
.username {
	display: flex;
	justify-content: center;
	padding-top: 10px;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 21px;
	letter-spacing: -0.5px;
}
.usertag {
	color: var(--grayscale-gray, #a8b2c5);
	text-align: center;
	font-size: 16px;
	font-style: normal;
	font-weight: 300;
	line-height: 21px;
	letter-spacing: -0.5px;
	padding-top: 5px;
}
.userlocation {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 5px;
}

.heymaty {
	align-items: center;
	display: flex;
}
.leftnav {
	display: flex;
	gap: 10px;
	align-items: center;
}

.clearfix:after {
	content: "\0020";
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
}
.buttons {
	display: flex;
	align-items: center;
}
.links {
	align-items: center;
	display: flex;
}
</style>
