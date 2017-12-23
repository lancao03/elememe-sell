<template>
	<div class="price">
		<span class="now">￥{{price}}</span>
		<span class="old" v-show="oldPrice">￥{{oldPrice}}</span>
	</div>
</template>

<script>
	export default {
		props: {
			price: {
				type: Number
			},
			oldPrice: {
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.price {
		font-weight: 700;
		line-height: 24px;
		font-size: 14px;
		.now {
			margin-right: 8px;
			color: rgb(240, 20, 20);
		}
		.old {
			text-decoration: line-through;
		}
	}
</style>