import Vue from 'vue'
import VueRouter from 'vue-router'

const Catalog = () => import(/* webpackChunkName: "users" */'@/views/movies/Catalog')
const SignUp = () => import(/* webpackChunkName: "users" */'@/views/users/SignUp')
const SignIn = () => import(/* webpackChunkName: "users" */'@/views/users/SignIn')
const Profile = () => import(/* webpackChunkName: "users" */'@/views/users/Profile')

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'movies-catalog', component: Catalog },
  { path: '/user/signup', name: 'signup', component: SignUp },
  { path: '/user/signin', name: 'signin', component: SignIn },
  { path: '/user', name: 'user-profile', component: Profile },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
