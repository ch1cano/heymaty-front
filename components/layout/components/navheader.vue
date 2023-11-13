<template>
	<div>
		<div class="links">
			<n-link key="search" :to="localePath('/')"></n-link>
			<n-link key="dialoges" :to="localePath('/dialoges')"></n-link>
			<n-link key="favorites" :to="localePath('/Feed')"></n-link>

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
									<img alt="#" src="../../../assets/img/avatar.png" />
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
									<img alt="#" src="../../../assets/svg/location.svg" />
									<p>Saint Petersburg, Russia</p>
								</div>
							</div>
						</div>
						<div
							@click="goTo(localePath(`/Settings/Models`))"
							class="header-profile__item"
						>
							<img
								class="navimg"
								alt="#"
								src="../../../assets/svg/Group 38.svg"
							/>
							<p>
								{{ $t("header.myprofile") }}
							</p>
						</div>

						<div
							@click="goTo(localePath(`/Privacy`))"
							class="header-profile__item"
						>
							<img
								class="navimg"
								alt="#"
								src="../../../assets/svg/privacy.svg"
							/>
							<p>Privacy Policy</p>
						</div>
						<div
							@click="goTo(localePath(`/Terms`))"
							class="header-profile__item"
						>
							<img class="navimg" alt="#" src="../../../assets/svg/terms.svg" />
							<p>Terms of Service</p>
						</div>
						<div
							@click="goTo(localePath('/Settings/Personal'))"
							class="header-profile__item"
						>
							<img class="navimg" alt="#" src="../../../assets/svg/gear.svg" />
							<p>{{ $t("header.settings") }}</p>
						</div>
						<div @click="logOut()" class="header-profile__item">
							<img
								class="navimg"
								alt="#"
								src="../../../assets/svg/logout.svg"
							/>
							<p>
								{{ $t("header.logout") }}
							</p>
						</div>
						<!-- <a
							@click.prevent="toggleMobile()"
							:class="{ active: isMenu }"
							class="menu-button"
						/> -->
					</div>
				</transition>
			</a>
		</div>
	</div>
</template>
<script>
export default {
	name: "Navheader",

	props: {
		toggleDropdown: Function,
		isDropdown: Boolean,
	},
};
</script>

<style>
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
.links {
	align-items: center;
	display: flex;
}
</style>
