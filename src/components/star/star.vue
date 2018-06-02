<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>

<script>
	const LENGHT = 5
	const CLS_ON = 'on'
	const CLS_HALF = 'half'
	const CLS_OFF = 'off'

	export default {
		props: {
			size: {
				type: Number,
				default: 32
			},
			score: {
				type: Number,
				default: 2.8
			}
		},
		computed: {
			starType() {
				return 'star-' + this.size
			},
			itemClasses() {
//				debugger
				let result = []
				let score = Math.floor(this.score * 2) / 2
				let hasDecimal = score % 1 != 0
				var ingter = Math.floor(score)
				for(let i = 0; i < ingter; i++) {
					result.push(CLS_ON)
				}
				if(hasDecimal) {
					result.push(CLS_HALF)
				}
				while(result.length < LENGHT) {
					result.push(CLS_OFF)
				}
				return result
			}
		},
		components: {

		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped lang="scss" src="./star.scss"></style>