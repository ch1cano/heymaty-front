<template>
	<div>
		<!-- <div class="page-top-name"> -->
		<!-- <div class="wrap">
        <h1>{{ $t("favourites.title") }}</h1>
      </div> -->
		<!-- </div> -->
		<div class="wrap">
			<nav class="nav_favourites">
				<div>
					<button
						class="nav_btn"
						:style="{
							backgroundColor: currentColor === 'All' ? '#2554F3' : '',
							color: currentColor === 'All' ? 'white' : '',
						}"
						@click="changeColor('All')"
					>
						<p>All</p>
					</button>
					<button
						class="nav_btn"
						:style="{
							backgroundColor: currentColor === 'Subscribed' ? '#2554F3' : '',
							color: currentColor === 'Subscribed' ? 'white' : '',
						}"
						@click="changeColor('Subscribed')"
					>
						<p>Subscribed</p>
					</button>
					<button
						class="nav_btn"
						:style="{
							backgroundColor: currentColor === 'For you' ? '#2554F3' : '',
							color: currentColor === 'For you' ? 'white' : '',
						}"
						@click="changeColor('For you')"
					>
						<p>For you</p>
					</button>
				</div>
				<div class="nav_settings">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
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
				</div>
			</nav>
			<div class="fu_box">
				<p>Made for you</p>
			</div>
			<div class="post_ganeral_wrap">
				<div class="post_wrapper">
					<div class="avatar_box">
						<div class="info_box">
							<div>
								<img
									class="avatar_ganeral"
									src="../../assets/img/avatar.png"
									alt="photo"
								/>
							</div>
							<div class="flex_info">
								<p class="name">Jane Stark</p>
								<p class="time">Today at 4:20</p>
							</div>
						</div>
					</div>
					<div class="svg_set">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4.5 12C4.5 11.1716 5.17157 10.5 6 10.5C6.82843 10.5 7.5 11.1716 7.5 12C7.5 12.8284 6.82843 13.5 6 13.5C5.17157 13.5 4.5 12.8284 4.5 12ZM10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12ZM16.5 12C16.5 11.1716 17.1716 10.5 18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12Z"
								fill="#A8B2C5"
							/>
						</svg>
					</div>
				</div>
				<div>
					<p class="massege_post">
						Hey! Just some photos of me 💙🐠 Do you like it? Tell me what do you
						think about it?
					</p>
				</div>
				<div class="post_photos_box">
					<div>
						<img
							class="photo_post"
							src="../../assets/img/post-photo1.png"
							alt=""
						/>
					</div>
					<div>
						<img
							class="photo_post"
							src="../../assets/img/post-photo1.png"
							alt=""
						/>
					</div>

					<div>
						<img
							class="photo_post"
							src="../../assets/img/post-photo1.png"
							alt=""
						/>
					</div>
					<div>
						<img
							class="photo_post"
							src="../../assets/img/post-photo1.png"
							alt=""
						/>
					</div>
				</div>
				<div class="likes_comts">
					<div class="likes">
						<svg
							@click="toggleLike"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							v-if="isLiked"
						>
							<path
								d="M11.645 20.9107L11.6384 20.9072L11.6158 20.8949C11.5965 20.8844 11.5689 20.8693 11.5336 20.8496C11.4629 20.8101 11.3612 20.7524 11.233 20.6769C10.9765 20.5261 10.6132 20.3039 10.1785 20.015C9.31074 19.4381 8.15122 18.5901 6.9886 17.5063C4.68781 15.3615 2.25 12.1751 2.25 8.25C2.25 5.32194 4.7136 3 7.6875 3C9.43638 3 11.0023 3.79909 12 5.0516C12.9977 3.79909 14.5636 3 16.3125 3C19.2864 3 21.75 5.32194 21.75 8.25C21.75 12.1751 19.3122 15.3615 17.0114 17.5063C15.8488 18.5901 14.6893 19.4381 13.8215 20.015C13.3868 20.3039 13.0235 20.5261 12.767 20.6769C12.6388 20.7524 12.5371 20.8101 12.4664 20.8496C12.4311 20.8693 12.4035 20.8844 12.3842 20.8949L12.3616 20.9072L12.355 20.9107L12.3523 20.9121C12.1323 21.0289 11.8677 21.0289 11.6477 20.9121L11.645 20.9107Z"
								fill="#FF005C"
							/>
						</svg>

						<svg
							@click="toggleLike"
							v-else
							class="empty"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="Group 2">
								<path
									id="Union"
									d="M21 8.25C21 5.76472 18.9013 3.75 16.3125 3.75C14.3769 3.75 12.7153 4.87628 12 6.48342C11.2847 4.87628 9.62312 3.75 7.6875 3.75C5.09867 3.75 3 5.76472 3 8.25C3 15.4706 12 20.25 12 20.25C12 20.25 21 15.4706 21 8.25Z"
									stroke="#A8B2C5"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</g>
						</svg>

						<p>24</p>
					</div>
					<div class="comts" @click="toggleCommentVisibility">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M12 20.25C16.9706 20.25 21 16.5563 21 12C21 7.44365 16.9706 3.75 12 3.75C7.02944 3.75 3 7.44365 3 12C3 14.1036 3.85891 16.0234 5.2728 17.4806C5.70538 17.9265 6.01357 18.5192 5.85933 19.121C5.68829 19.7883 5.368 20.3959 4.93579 20.906C5.0918 20.9339 5.25 20.9558 5.40967 20.9713C5.60376 20.9903 5.80078 21 6 21C7.28201 21 8.47016 20.5979 9.44517 19.9129C10.2551 20.1323 11.1125 20.25 12 20.25Z"
								stroke="#A8B2C5"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<p>16</p>
					</div>
				</div>
			</div>
			<!-- <div class="index-catalog flex fav">
        <template v-if="favorites.length > 0" class="index-catalog__list">
          <girl-card
            v-for="(item, i) in favorites"
            :key="i"
            :item="item.modelId"
          />
        </template>
        <template v-else>
          <div class="item">
            <p>{{ $t("favourites.noFavourites") }}</p>
          </div>
        </template>

        <div class="bottom-button">
          <button @click.prevent="goTo(localePath('/'))">
            {{ $t("favourites.goToMainPage") }}
          </button>
        </div>
      </div> -->
			<div class="comment" v-if="isCommentVisible">
				<!-- Отображение комментариев -->
				<div v-for="comment in comments" :key="comment.id">
					{{ comment.text }}
				</div>
				<!-- Форма для отправки комментария -->
				<form class="form_comts" @submit.prevent="addComment">
					<div>
						<img class="comts_ava" src="../../assets/img/avatar3.png" />
					</div>
					<div class="wrapper_form">
						<svg
							class="skobka"
							xmlns="http://www.w3.org/2000/svg"
							width="50"
							height="50"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M18.375 12.739L10.682 20.432C8.92462 22.1893 6.07538 22.1893 4.31802 20.432C2.56066 18.6746 2.56066 15.8254 4.31802 14.068L15.2573 3.12868C16.4289 1.95711 18.3283 1.95711 19.4999 3.12868C20.6715 4.30025 20.6715 6.19975 19.4999 7.37132L8.55158 18.3197M8.56066 18.3107C8.55764 18.3137 8.55462 18.3167 8.55158 18.3197M14.2498 8.37865L6.43934 16.1893C5.85355 16.7751 5.85355 17.7249 6.43934 18.3107C7.02211 18.8934 7.9651 18.8964 8.55158 18.3197"
								stroke="#5E48C9"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>

						<input
							class="input_comts"
							v-model="newComment"
							placeholder="Enter message"
						/>
						<button class="send_btn" type="submit">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M5.99996 12L3.26904 3.12451C9.88417 5.04617 16.0278 8.07601 21.4857 11.9997C16.0279 15.9235 9.88425 18.9535 3.26913 20.8752L5.99996 12ZM5.99996 12L13.5002 12"
									stroke="white"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

import GirlCard from "@/components/page-parts/index/GirlCard";

export default {
	name: "PageFavorites",
	components: {
		GirlCard,
	},
	async asyncData({ store, route }) {
		const response = await store.dispatch("favorites/getMyFavorites");
		return response;
	},
	computed: {
		...mapState("favorites", ["favorites"]),
	},

	data() {
		return {
			isCommentVisible: false,
			comments: [],
			newComment: "",
			currentColor: "",
			isLiked: false,
		};
	},
	methods: {
		toggleLike() {
			this.isLiked = !this.isLiked;
		},
		toggleCommentVisibility() {
			this.isCommentVisible = !this.isCommentVisible; //
		},
		changeColor(color) {
			this.currentColor = color;
		},

		addComment() {
			this.comments.push({ id: Date.now(), text: this.newComment });
			this.newComment = "";
		},
		// changeIcon: function() {
		// 	this.isLiked = !this.isLiked;
		// },
	},
};
</script>
