import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from './../plugins/firebase'


const Catalog = () => import(/* webpackChunkName: "users" */'@/views/movies/Catalog')
const SignUp = () => import(/* webpackChunkName: "users" */'@/views/users/SignUp')
const SignIn = () => import(/* webpackChunkName: "users" */'@/views/users/SignIn')
const Profile = () => import(/* webpackChunkName: "users" */'@/views/users/Profile')

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Catalog },
  { path: '/movies/catalog', name: 'movies-catalog', component: Catalog },
  { path: '/user/signup', name: 'signup', component: SignUp },
  { path: '/user/signin', name: 'signin', component: SignIn },
  { path: '/user/profile', name: 'user-profile', component: Profile, meta: { requiresAuth: true } },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = await firebase.getCurrentUser()

  if (requiresAuth && !currentUser) {
    next({ name: 'signin' })
  } else {
    next()
  }
})

export default router
