import Vue from 'vue'
import Vuex from 'vuex'

import language from './modules/language'
import movie from './modules/movie'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    language,
    movie,
    user
  }
})
