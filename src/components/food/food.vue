<template>
	<transition name="move">
		<div class="food" ref="food" v-show="showFlag">
			<div class="food-content">
				<div class="header-content">
					<div class="image-header">
						<img :src="food.image" alt="" />
						<div class="back" @click="hide"><i class="icon-arrow_lift"></i></div>
					</div>
					<div class="content">
						<div class="title">{{food.name}}</div>
						<div class="detail">
							<span class="sell-count">月售：{{food.sellCount}}</span>
							<span class="ratting">好评率：{{food.ratting}}</span>
						</div>
						<price :price="food.price" :oldPrice="food.oldPrice"></price>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" @click.stop.prevent="addFirst" v-show="!food.count||food.count===0">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<div class="title">商品信息</div>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h2 class="title">商品评价</h2>
					<ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @select="selectRating" @toggle="toggleContent"></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings&&food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" width="12" height="12" class="avatar" />
								</div>
								<div class="time">{{rating.rateTime|formatDate}}</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
									<span>{{rating.text}}</span>
								</p>

							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import price from '@/components/base/price'
	import cartcontrol from '@/components/cartcontrol/cartcontrol'
	import split from '@/components/base/split'
	import ratingselect from '@/components/base/ratingselect'
	import {formatDate} from '@/common/js/date'
	import BScroll from 'better-scroll'

	const POSITIVE = 0
	const NEGATIVE = 1
	const ALL = 2

	export default {
		props: {
			food: {
				type: Object
			}
		},
		components: {
			price,
			cartcontrol,
			split,
			ratingselect
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		filters:{
			formatDate(time){
				let date=new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		methods: {
			show() {
				this.showFlag = true
				this.selectType = ALL
				this.onlyContent = true
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						});
					} else {
						this.scroll.refresh()
					}
				})
			},
			hide() {
				this.showFlag = false
			},
			addFirst(event) {
				this.$emit('add', event.target)
				this.$set(this.food, 'count', 1)
			},
			selectRating(type) {
				this.selectType = type
				this.$nextTick(()=>{
					this.scroll.refresh()
				})
				
			},
			toggleContent() {
				this.onlyContent = !this.onlyContent
				this.$nextTick(()=>{
					this.scroll.refresh()
				})
			},
			needShow(type, content) {
				if(this.onlyContent && !content) {
					return false
				}
				if(this.selectType === ALL) {
					return true
				} else {
					return type === this.selectType
				}
			}
		}
	}
</script>

<style scoped lang="scss" src="./food.scss">

</style>