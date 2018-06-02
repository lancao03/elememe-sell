import Vrouter from 'vue-router'
import Vue from 'vue'
import goods from '@/pages/goods/goods'
import ratings from '@/pages/ratings/ratings'
import seller from '@/pages/seller/seller'

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