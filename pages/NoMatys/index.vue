<template>
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
            <div class="wrap_main">
                <div class="main_1">
                    <p>Oh, you have no matys Let’s start to <span class="blue">search</span> together!</p>          
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
    .wrapper_2 {
        height: 100dvh;
        width: 100%;
    }
    .main_1 {
        width: 330px;
        height: 66px;
    }
    .main_1 p {
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 33px;
    }
    .blue {
        color: var(--accent-primary, #2554F3);
    }
    .wrap_main {
        display: flex;
        width: 750px;
        height: 80dvh;
    }
    .wrap {
        display: flex;
        flex-direction: column;
        
    }
</style>