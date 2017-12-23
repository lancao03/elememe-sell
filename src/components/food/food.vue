<template>
	<transition name="move">
		<div class="food" ref="food" v-show="showFlag">
			<div class="food-content">
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
		</div>
	</transition>
</template>

<script>
	import price from '@/components/base/price'
	import cartcontrol from '@/components/cartcontrol/cartcontrol'
	import BScroll from 'better-scroll'

	export default {
		props: {
			food: {
				type: Object
			}
		},
		components: {
			price,
			cartcontrol
		},
		data() {
			return {
				showFlag: false
			}
		},
		methods: {
			show() {
				this.showFlag = true
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						})
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
			}
		}
	}
</script>

<style lang="scss" src="./food.scss">

</style>