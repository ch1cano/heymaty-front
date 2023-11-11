<template>
	<div class="wrap_ganeral">
	
		<div class="wrap_1">
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
            <div class="no_matys">
                <div class="info_1">
                    <p>Oh, you have no matys 
                    Let’s start to <span class="span_info">search</span> together!
                    </p>
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
		</div>
		<div class="suggestions_1">
			<div>
				<p>Suggestions</p>
			</div>
			 	<div class="card_1">

				</div>
				<div class="card_1">

				</div>
				<div class="card_1">

				</div>
				<div class="card_1">

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
	.wrap_ganeral {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -70px;
	}
	.suggestions_1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 30px;
		margin-top: 135px;
		height: 80dvh;
	}
	.suggestions_1 p {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
		line-height: 24px; /* 133.333% */
		letter-spacing: -0.5px;
		width: 343px;
	}
	.card_1 {
		width: 343px;
		height: 172px;
		background-color: #e9edf5;
		border-radius: 20px;
		margin-top: 8px;
	}
    .no_matys {
        display: flex;
        height: 884px;
        width: 739px;
    }
    .info_1 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 330px;
        height: 66px;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 33px;
    }
    .span_info {
        color: var(--accent-primary, #2554F3);
    }
</style>