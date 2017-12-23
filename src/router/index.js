import Vrouter from 'vue-router'
import Vue from 'vue'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.use(Vrouter)

export default new Vrouter({
	mode: 'history',
	linkExactActiveClass: 'active',
	routes: [{
		path:'/',
		redirect:'/goods'
	},
	{
		path: '/ratings',
		component: ratings
	}, {
		path: '/goods',
		component: goods
	}, {
		path: '/seller',
		component: seller
	}]
})