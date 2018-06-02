<template>
	<ul v-if="supports" class="supports">
		<li class="support-item" v-for="(item,index) in supports">
			<icon :type="item.type" size="m"></icon>
			<span class="text">{{item.description}}</span>
		</li>
	</ul>
</template>

<script>
	import icon from '@/components/base/icon'
	export default {
		props: {
			supports:{
				
			}
		},
		components: {
			icon
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped lang="scss">
	.supports {
		width: 80%;
		margin: 0 auto;
		.support-item {
			padding: 0 12px;
			margin-bottom: 12px;
			font-size: 0;
			&:last-child {
				margin-bottom: 0;
			}
			.text {
				line-height: 12px;
				vertical-align: middle;
				font-size: 12px;
			}
		}
	}
</style>