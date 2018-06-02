<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span class="block positive" :class="{'active':selectType===2}" @click="select(2)">{{desc.all}} <span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active':selectType===0}" @click="select(0)">{{desc.positive}} <span class="coutn">{{positives.length}}</span></span>
			<span class="block negative" :class="{'active':selectType===1}" @click="select(1)">{{desc.negative}} <span class="count">{{negative.length}}</span></span>
		</div>
		<div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0
	const NEGATIVE = 1
	const ALL = 2

	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		methods: {
			select(type) {
//				this.selectType = type
				this.$emit('select', type)
			},
			toggleContent() {
//				this.onlyContent = !this.onlyContent
				this.$emit('toggle')
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE
				})
			},
			negative() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE
				})
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" src="./scss/ratingselect.scss">

</style>