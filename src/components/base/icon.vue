<template>
	<span class="icon" :class="iconClass"></span>
</template>

<script>
	export default {
		props: {
			size: {
				default: 's'
			},
			type: {
				type: Number,
				default: 0
			},
			iconType: {
				default: ''
			}
		},
		components: {

		},
		data() {
			return {
				classMap: []
			}
		},
		computed: {
			iconClass() {
				let icon_class = ''
				icon_class += (this.size === 's') ? 'icon-12 ' : 'icon-16 '
				icon_class += (this.iconType === 'fill') ? 'icon-fill ' : ' '
				icon_class += this.classMap[this.type]
				return icon_class
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		}
	}
</script>

<style scoped lang="scss" src="./scss/icon.scss">

</style>