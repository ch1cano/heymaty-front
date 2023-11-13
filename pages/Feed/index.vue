<template>
	<div>
		<Loader v-if="publicPostsLoading" />

		<div v-if="!publicPostsLoading">
			<template>
				<div class="wrapper">
					<Tabs />
					<div class="wrap_ganeral">
						<div class="content">
							<div>
								<div class="favorites_title">
									<p>Made for you</p>
								</div>
								<!-- <div v-if="openPosts.length <= 0" class="entryPosts">
									<p>Oh, your matys have no posts yet Keep tuning!</p>
								</div> -->
								<!-- <NoMatys v-if="favorites.length <= 0" /> -->
								<!-- <div v-if="openPosts.length > 0" class="post-wrapper"> -->
								<Post
									v-for="item in items"
									:key="item.id"
									:images="item.images"
									:name="item.name"
									:description="item.description"
									:createdAt="item.createdAt"
									:isPublic="item.isPublic"
									:avatar="item.path"
								/>
								<!-- </div> -->
							</div>
						</div>
						<div class="suggestions_1">
							<div>
								<p>Suggestions</p>
							</div>
							<div class="card_1"></div>
							<div class="card_1"></div>
							<div class="card_1"></div>
							<div class="card_1"></div>
						</div>
					</div>
				</div>
			</template>
			{{ data }}
		</div>
	</div>
</template>

<script>
import Loader from "../../components/LoaderFavorites/Loader.vue";
import NoMatys from "../../pages/NoMatys";
import Post from "../../components/page-parts/post";
import { mapState } from "vuex";
import GirlCard from "@/components/page-parts/index/GirlCard";
import Tabs from "../../components/page-parts/tab";

export default {
	name: "PageFeed",
	components: {
		Loader,
		GirlCard,
		Post,
		NoMatys,
		Tabs,
	},

	objarr() {
		return [
			{
				images: [{ id: 1 }],
				name: "test",
				description: "test",
				createdAt: "test",
				isPublic: true,
				avatar: "",
			},
		];
	},

	data() {
		return {
			// isLoading: true,
			items: [
				{
					// :key="item._id"
					//           :images="item.images"
					//           :name="item.userId.name"
					//           :description="item.description"
					//           :createdAt="item.createdAt"
					//           :isPublic="item.isPublic"
					//           :avatar="item.userId.profile.path"
					id: 1,
					images: [{ id: 1 }],
					name: "test",
					description: "test",
					createdAt: "test",
					isPublic: true,
					avatar: "",
				},
			],
		};
	},

	async asyncData({ store, route }) {
		const response = await store.dispatch("favorites/getMyFavorites");

		await store.dispatch("post/resetPosts", null, { root: true });

		const posts = await store.dispatch("post/getAllPublicPosts", null, {
			root: true,
		});

		console.log("posts", posts);

		console.log("response", response);

		return response;
	},

	async mounted() {
		this.loadData();

		await this.$store.dispatch("post/resetPosts", null, { root: true });
		await this.$store.dispatch("post/getAllPublicPosts", null, { root: true });
	},
	methods: {
		async asyncData() {
			await store.dispatch("favorites/getMyFavorites");
		},

		async loadData() {
			this.isLoading = false;
		},
	},
	computed: {
		...mapState("post", ["pageOpen", "openPosts", "publicPostsLoading"]),
		...mapState("favorites", ["favorites"]),

		isChildShown() {
			return !!this.$route.params.postid;
		},
		isFavoritesNoPosts() {
			return (
				!this.publicPostsLoading &&
				this.favorites.length > 0 &&
				this.openPosts.length === 0
			);
		},
		isNotHaveFavorites() {
			return !this.publicPostsLoading && this.openPosts.length === 0;
		},
		isLoading() {
			return !this.publicPostsLoading && !this.openPosts;
		},
	},
};
</script>

<style>
.entryPosts {
	color: var(--grayscale-black, #161718);
	text-align: center;
	font-family: Nunito Sans;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 33px;
	margin: auto;
}
.wrapper {
	max-width: 1148px;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
}

.wrap_ganeral {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	gap: 40px;
}

.content {
	max-width: 750px;
	width: 100%;
}

.post-wrapper {
	height: 100vh;
}

.favorites_title {
	font-size: 18px;
	font-weight: 800;
	margin-bottom: 12px;
}

.suggestions_1 {
	display: flex;
	flex-direction: column;
	align-items: center;
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
</style>
