import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from "@/layout/index.vue"
import store from "@/store/index.js"
Vue.use(VueRouter)

function watchPC() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
	return !(isAndroid || isIOS)
}
const isPc = watchPC()
// console.log("router",isPc)
const routes = [{
	path: '/',
	name: 'layout',
	redirect: 'homepage',
	component: layout,
	children: [{
			path: '/homepage',
			name: 'homepage',
			meta: {
				title: 'home-page'
			},
			component: () => isPc ? import('@/views/homepage/index.vue') : import(
				'@/views/homepage/index.ph.vue'),
		},
		{
			path: '/myAssets',
			name: 'myAssets',
			meta: {
				title: 'my-assets'
			},
			component: () => isPc ? import('@/views/myAssets/index.vue') : import(
				'@/views/myAssets/index.ph.vue'),
			redirect: '/myAssets/assetsList',
			children:[
				{
					path: 'assetsList',
					name: 'assetsList',
					meta: {
						title: 'assets-list'
					},
					component: () => isPc ? import('@/views/myAssets/assetsList/assetsList.vue') : import(
						'@/views/myAssets/assetsList/assetsList.ph.vue'),
				},
				{
					path: 'hatchEgg',
					name: 'hatchEgg',
					meta: {
						title: 'hatch-egg'
					},
					component: () => isPc ? import('@/views/myAssets/hatchEgg/hatchEgg.vue') : import(
						'@/views/myAssets/hatchEgg/hatchEgg.ph.vue'),
				},
			]
		},
		{
			path: '/myAssets/details',
			name: 'myAssetsDetails',
			meta: {
				title: 'my-assets'
			},
			component: () => isPc ? import('@/views/myAssets/details.vue') : import(
				'@/views/myAssets/details.ph.vue'),
		},
		{
			path: '/nftMarket',
			name: 'nftMarket',
			meta: {
				title: 'nft-market'
			},
			component: () => isPc ? import('@/views/nftMarket/index.vue') : import(
				'@/views/nftMarket/index.ph.vue'),
		},
		// {
		// 	path: '/whiteBook',
		// 	name: 'whiteBook',
		// 	meta: {
		// 		title: 'nft-market'
		// 	},
		// 	component: () =>  import('@/views/whiteBook/index.vue'),
		// },
		{
			path: '/myAuthorizationCode',
			name: 'myAuthorizationCode',
			meta: {
				title: 'my-authorization-code'
			},
			component: () => isPc ? import('@/views/myAuthorizationCode/index.vue') : import('@/views/myAuthorizationCode/index.ph.vue'),
		},
		{
			path:"/redirect",
			name:"redirect",
			component: () => import('@/views/redirect/index.vue'),
		}
	]

}]

const router = new VueRouter({
	routes,
	mode: 'hash',
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0,
			// behavior: 'smooth',
		}
	},
})
router.beforeEach(async (to, from, next) => {
	if (to.path != '/homepage' && !store.state.haveAuth) {
		next('/homepage')
	} else {
		next()
	}
})
// const routerPush = router.prototype.push;
// router.prototype.push = function push(location, onResolve, onReject) {
// 	return routerPush.call(this, location, onResolve, onReject)
// }

export default router
