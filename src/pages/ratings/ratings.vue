<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h2 class="score">
						{{seller.score}}
					</h2>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent" @select="select" @toggle="toggle"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px">
						<div class="avatar"><img width="28" height="28" :src="rating.avatar" alt="" /></div>
						<div class="content">
							<h2 class="name">{{rating.username}}</h2>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<div class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-if="rating.rateType===0">
								<div class="icon-thumb_up"></div>
								<span class="item" v-for="item in rating.recommend">{{item}}</span>
							</div>
							<div class="recommend" v-else>
								<div class="icon-thumb_down"></div>
							</div>
							<div class="time">{{rating.rateTime|formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '@/components/star/star'
	import split from '@/components/base/split'
	import ratingselect from '@/components/base/ratingselect'
	import BScroll from 'better-scroll'
	import { formatDate } from '@/common/js/date'

	const ALL = 2
	const POSITIVE = 0
	const NEGATIVE = 1

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		data() {
			return {
				ratings: [],
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			}
		},
		created() {
			this.$http.get('/api/ratings')
				.then((res) => {
					console.log('ratings', res)
					this.ratings = res.data
				}, (err) => {
					console.log(err)
				})

			this.$nextTick(() => {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.ratings, {
						click: true
					})
				} else {
					this.scroll.refresh()
				}
			})

		},
		methods: {
			select(type) {
				this.selectType = type
			},
			toggle() {
				this.onlyContent = !this.onlyContent
			},
			needShow(type, text) {
				if(this.isContent && !text) {
					return false
				}
				if(this.selectType === ALL) {
					return true
				} else {
					return this.selectType === type
				}
			}
		},
		components: {
			star,
			split,
			ratingselect
		}
	}
</script>

<style scoped lang="scss" src="./ratings.scss">

</style>