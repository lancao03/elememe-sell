<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h2 class="title">{{seller.name}}</h2>
				<div class="desc border-1px">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h3>起送价</h3>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h3>商家配送</h3>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h3>平均配送时间</h3>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite">
					<span class="icon-favorite" @click="toggleFavorite" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h2 class="title">公告与活动</h2>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item border-1px" v-for="(item,index) in seller.supports">
						<icon :type="item.type" size="m" :iconType="'fill'"></icon>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h2 class="title">商家实景</h2>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90" alt="" />
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h2 class="title border-1px">商家信息</h2>
				<ul>
					<li v-for="info in seller.infos" class="info-item border-1px">
						{{info}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '@/components/star/star'
	import split from '@/components/base/split'
	import supports from '@/components/base/supports'
	import icon from '@/components/base/icon'
	import { saveToLocal } from '@/common/js/score.js'
	import { loadFromLocal} from '@/common/js/score.js'
	import BScroll from 'better-scroll'

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			icon,
			star,
			split,
			supports
		},
		computed: {
			favoriteText() {
				return this.favorite ? '已收藏' : '未收藏'
			}
		},
		watch: {
			'seller' () {
				this._initScroll()
				this._initPicScroll()
			}
		},
		methods: {
			_initScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.seller, {
							click: true
						})
					} else {
						this.scroll.refresh()
					}
				})
			},
			_initPicScroll() {
				if(this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$refs.picList.style.width = width + 'px';
					this.$nextTick(() => {
						if(!this.picScroll) {
							this.picScroll = new BScroll(this.$refs.picWrapper, {
								scrollX: true,
								eventPassthrough: 'vertical'
							})
						} else {
							this.picScroll.refresh()
						}
					})
				}
			},
			toggleFavorite() {
				this.favorite = !this.favorite
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			}
		},
		mounted() {
			this._initScroll()
			this._initPicScroll()
		},
		data() {
			return {
				favorite: (()=>{
					console.log('favorite'+this.seller.id)
					return loadFromLocal(this.seller.id,'favorite',false)
				})()
			}
		}
	}
</script>

<style scoped lang="scss" src="./seller.scss">

</style>