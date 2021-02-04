import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from './../plugins/firebase'

const Movies = () => import(/* webpackChunkName: "movies" */'@/views/movies/Movies')
const SignUp = () => import(/* webpackChunkName: "users" */'@/views/users/SignUp')
const SignIn = () => import(/* webpackChunkName: "users" */'@/views/users/SignIn')
const Profile = () => import(/* webpackChunkName: "users" */'@/views/users/Profile')

Vue.use(VueRouter)

const routes = [
  { path: '/movies', name: 'movies', component: Movies, meta: { requiresAuth: true, requiresProfile: true } },
  { path: '/user/signup', name: 'signup', component: SignUp },
  { path: '/user/signin', name: 'signin', component: SignIn },
  { path: '/user/profile', name: 'user-profile', component: Profile, meta: { requiresAuth: true } },
  { path: '*', redirect: { name: 'movies' } }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresProfile = to.matched.some(record => record.meta.requiresProfile)
  const currentUser = await firebase.getCurrentUser()
  const currentProfile = await localStorage.getItem("profile")

  if (requiresAuth && !currentUser) {
    next({ name: 'signin' })
  } else if (requiresProfile && !currentProfile) {
    next({ name: 'user-profile' })
  } else {
    next()
  }
})

export default router
