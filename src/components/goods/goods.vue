<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
					<icon v-show="item.type>0" :type="item.type" iconType="fill"></icon>
					<span class="text border-1px">{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" ref="foodList" class="food-list food-list-hook">
					<h2 class="title">{{item.name}}</h2>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
							<div class="icon"><img width="57px" height="57px" :src="food.icon" alt="" /></div>
							<div class="content">
								<h3 class="name">{{food.name}}</h3>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售：{{food.sellCount}}</span><span>好评率：{{food.rating}}</span>
								</div>
								<!--<div class="price">
									<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>-->
								<price :price="food.price" :oldPrice="food.oldPrice" ></price>
								<div class="cartcontrol-wrapper">
									<cartcontrol @add="addFood" :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		<food :food="selectedFood" ref="foodWrapper" @add="addFood"></food>
	</div>
</template>

<script>
	import icon from '@/components/base/icon/icon'
	import shopcart from '@/components/shopcart/shopcart'
	import cartcontrol from '@/components/cartcontrol/cartcontrol'
	import food from '@/components/food/food'
	import price from '@/components/base/price'
	import BScroll from 'better-scroll'

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood:{}
			}
		},
		created() {
			this.$http.get('/api/goods')
				.then((res) => {
					this.goods = res.data
					this.$nextTick(() => {
						this._initScroll()
						this._calculateHeight()
					})
				}, (err) => {
					console.log(err)
				})
		},
		computed: {
			currentIndex() {
				let curIndex;
				for(let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i]
					let height2 = this.listHeight[i + 1]
					if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i
					}
				}
				return 0
			},
			selectFoods() {
				let foods = []
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count) {
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		methods: {
			selectMenu(index) {
				let foodList = this.$refs.foodList;
				let el = foodList[index]
				this.foodsScroll.scrollToElement(el, 300)
			},
			addFood(target) {
				this._drop(target);
			},
			_drop(target){
				//体验优化，异步执行下落动画
				this.$nextTick(()=>{
					this.$refs.shopcart.drop(target);
				})
			},
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					probeType: 3,
					click: true
				})
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			_calculateHeight() {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
				let height = 0
				this.listHeight.push(height)
				for(let i = 0; i < foodList.length; i++) {
					let item = foodList[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			},
			selectFood(food){
				this.selectedFood=food
				this.$refs.foodWrapper.show()
			}
		},
		components: {
			icon,
			shopcart,
			cartcontrol,
			food,
			price
		}
	}
</script>

<style lang="scss" src="./goods.scss">

</style>