<template>
	<div>
		<div class="all_wrap">
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
			<div class="post_ganeral_wrap_1">
				<div class="post_wrapper_1">
					<div class="avatar_box_1">
						<div class="info_box_1">
							<div class="avatar_ganeral_1">
								
							</div>
							<div class="flex_info_1">
								<p class="name_1"></p>
								<p class="time_1"></p>
							</div>
						</div>
					</div>
					<div class="svg_set_1">
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
						<div class="massege_box">
							<p class="massege_post_1">
								Hey! Just some photos of me  Do you like it? Tell me what do you
								think about it?
							</p>
							<div class="second_massege_1">

							</div>
						</div>
						<div class="post_photos_box">
							<div class="photo_post_1">
								
							</div>
							<div class="photo_post_1">
								
							</div>
							
							<div class="photo_post_1">
								
							</div>
							<div class="photo_post_1">
								
							</div>
						</div>
				</div>
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
		</div>
		<div class="wrap_right_block">
			<p>Suggestions</p>
			<div class="card_box"></div>
			<div class="card_box"></div>
			<div class="card_box"></div>
			<div class="card_box"></div>
			<div class="card_box"></div>
		</div>
	</div>
</div>
</template>

<!-- <template>
  <div>
    <content-loader :width="300" :height="400" :speed="2" :view-box="'0 0 300 400'" primary-color="#f3f3f3" secondary-color="#ecebeb">
      <rect x="0" y="0" rx="3" ry="3" :width="300" :height="200" />
      <rect x="0" y="210" rx="3" ry="3" :width="100" :height="20" />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  components: {
    ContentLoader,
  },
};
</script>

<style scoped>
/* Дополнительные стили по вашему усмотрению */
</style> -->

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
			likeCount: 0,
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
		incrementLikes() {
			this.isLiked = !this.isLiked;
			this.likeCount += 1;
		},
		decrementLikes() {
			this.isLiked = !this.isLiked;
			this.likeCount -= 1;
		},
	},
};
</script>

<style>
	.all_wrap {
		display: flex;
		justify-content: center;
	}
	.wrap_right_block {
		margin-top: 180px;
	}
	.wrap_right_block p {
		font-size: 18px;
		font-style: normal;
		font-weight: 500;
		line-height: 24px; /* 133.333% */
		letter-spacing: -0.5px;
		margin-bottom: 24px;
	}
	.wrap_right_block {
		margin-left: 30px;
	}
	.card_box {
		width: 349px;
		height: 172px;
		background: var(--grayscale-light-blue, #E9EDF5);
		border-radius: 20px;
		margin-bottom: 8px;
	}
	.wrapper_1 {
		display: flex;
	}
	.suggestions_1 {
		display: flex;
		align-items: center;
		width: 343px;
		height: auto;
	}
	.card_1 {
		width: 343px;
		height: 172px;
		background-color: #e9edf5;
	}
	.wrap_1 {
		margin: 0 auto;
		max-width: 1148px;
		display: flex;
		flex-direction: column;
	}
	.nav_favourites_1 {
		margin-top: 105px;
		display: flex;
		gap: 16px;
		justify-content: space-between;
	}
	.nav_btn_1 {
		font-family: "Nunito Sans";
		border-radius: 60px;
		padding: 8px 20px;
		font-size: 14px;
		line-height: 20px;
		border: 1px solid var(--grayscale-light-blue, #e9edf5);
		background: var(--grayscale-white, #fff);
	}
	.nav_settings_1 {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.post_wrapper_1 {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		align-items: center;
	}
	.avatar_box_1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
	}
	.info_box_1 {
		display: flex;
		align-items: center;
	}
	.svg_set_1 {
		cursor: pointer;
	}
	.post_photos_box_1 {
		display: grid;
		grid-template-columns: 2fr 2fr;
		grid-gap: 17px;
		max-width: 100%;
	}
	.flex_info_1 {
		margin-left: 7px;
	}
	.fu_box_1 p {
		font-size: 18px;
		font-style: normal;
		font-weight: 500;
		line-height: 24px; 
		letter-spacing: -0.5px;
	}
	.massege_box {
		margin-top: 7px;
	}
	.fu_box_1 {
		margin-top: 20px ;
		margin-bottom: -100px;
	}
	.post_ganeral_wrap_1 {
		margin-top: 20px
	}
	.avatar_ganeral_1 {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		cursor: pointer;
		background-color: rgba(233, 237, 245, 1);
	}
	.name_1 {
		color: rgba(233, 237, 245, 1);
		background-color: rgba(233, 237, 245, 1);
		border-radius: 10px;
		width: 130px;
		height: 20px;
	}
	.time_1 {
		color: rgba(233, 237, 245, 1);
		background-color: rgba(233, 237, 245, 1);
		border-radius: 10px;
		margin-top: 4px;
		width: 50px;
		height: 20px;
	}
	.massege_post_1 {
		color: rgba(233, 237, 245, 1);
		background-color: rgba(233, 237, 245, 1);
		border-radius: 10px;
		margin-bottom: 5px;
	}
	.second_massege_1 {
		color: rgba(233, 237, 245, 1);
		background-color: rgba(233, 237, 245, 1);
		border-radius: 10px;
		width: 500px;
		height: 20px;
		margin-bottom: 10px;
	}
	.photo_post_1 {
		width: 355px;
		height: 326px;
		color: rgba(233, 237, 245, 1);
		background-color: rgba(233, 237, 245, 1);
		border-radius: 10px;
	}
</style>
