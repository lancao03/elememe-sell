<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease icon-remove_circle_outline" @click.stop.prevent="decreaseCount" v-show="food.count>0"></div>
		</transition>

		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCount"></div>
	</div>
</template>

<script>
	export default {
		props: {
			food: {
				type: Object,
				default() {
					return {
						count: 1
					}
				}
			}
		},
		components: {

		},
		created() {
			//console.log(this.food)
		},
		methods: {
			addCount(event) {
				if(!this.food.count) {
					this.$set(this.food, 'count', 1)
				} else {
					this.food.count++
				}
				this.$emit('add', event.target);
			},
			decreaseCount(event) {
				this.food.count--
				this.$emit('on-change',event.target)
			}
		}
	}
</script>

<style lang="scss" src="./cartcontrol.scss"></style>
<style lang="scss">
	.move-enter-active,
	.move-leave-active {
		transition: all .2s linear;
		transform:translate3D(0,0,0);
		transform:rotate(0);
	}
	
	.move-enter,
	.move-leave-to {
		opacity: 0;
		transform:translate3D(24px,0,0);
		transform:rotate(180deg);
	}
</style>