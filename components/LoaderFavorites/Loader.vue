<template>
	<div class="wrapper_1">
		<div class="wrap_1">
			<nav class="nav_favourites_1">
				<div>
					<button
						class="nav_btn_1"
						:style="{
							backgroundColor: currentColor === 'All' ? '#2554F3' : '',
							color: currentColor === 'All' ? 'white' : '',
						}"
						@click="changeColor('All')"
					>
						<p>All</p>
					</button>
					<button
						class="nav_btn_1"
						:style="{
							backgroundColor: currentColor === 'Subscribed' ? '#2554F3' : '',
							color: currentColor === 'Subscribed' ? 'white' : '',
						}"
						@click="changeColor('Subscribed')"
					>
						<p>Subscribed</p>
					</button>
					<button
						class="nav_btn_1"
						:style="{
							backgroundColor: currentColor === 'For you' ? '#2554F3' : '',
							color: currentColor === 'For you' ? 'white' : '',
						}"
						@click="changeColor('For you')"
					>
						<p>For you</p>
					</button>
				</div>
				<div class="nav_settings_1">
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
			<div class="fu_box_1">
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
<script setup>

</script>

<style>
	.wrapper_1 {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -50px;
	}
	.suggestions_1 {
		display: flex;
		align-items: center;
		width: 343px;
		height: auto;
	}
	.suggestions_1 p {
		margin-top: 15px;
	}
	.card_1 {
		width: 343px;
		height: 172px;
		background-color: #e9edf5;
	}
	.wrap_1 {
		max-width: 1148px;
		display: flex;
		flex-direction: column;
	}
	.nav_favourites_1 {
		margin-top: 55px;
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
		font-size: 20px;
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
		margin-top: 100px
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