<template>
	<div id="app">
		<v-header :seller="seller"></v-header>
		<div class="tab">
			<div class="tab-item">
				<router-link :to="{path:'/goods'}">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link :to="{path:'/ratings'}">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link :to="{path:'/seller'}">商家</router-link>
			</div>
		</div>
		<div class="content">
			<keep-alive>
				<router-view :seller="seller"></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import header from './components/header/header'

//	const ERR_OK = 0

	export default {
		components: {
			'v-header': header
		},
		data() {
			return {
				seller: {}
			}
		},
		created() {
			this.$http.get('/api/seller')
				.then((res) => {
					this.seller = res.data
					console.log(this.seller)
				}, (err) => {
					console.log(err)
				})
		},
		methods: {
			getSellerData() {}
		}
	}
</script>

<style lang="scss" src="./common/scss/base.scss"></style>
<style lang="scss" src="./common/scss/mixin.scss"></style>
<style lang="scss" src="./common/scss/icon.scss"></style>
<style lang="scss">
	.tab {
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		.tab-item {
			flex: 1;
			text-align: center;
			a {
				display: block;
				font-size: 14px;
				color: rgb(77, 85, 93);
				&.active {
					color: rgb(240, 20, 20);
				}
			}
		}
	}
</style>