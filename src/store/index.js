import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './../plugins/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    profile: null,
    language: null
  },
  getters: {
    user(state) {
      return state.user
    },
    profile(state) {
      return state.profile
    },
    language(state) {
      return state.language
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setProfile(state, payload) {
      state.profile = payload
    },
    setLanguage(state, payload) {
      state.language = payload
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const currentUser = await firebase.getCurrentUser()
      const currentProfile = await localStorage.getItem('profile')
      commit('setUser', currentUser)
      commit('setProfile', currentProfile ? JSON.parse(currentProfile) : null)
    },
    cleanProfile({ commit }) {
      localStorage.removeItem("profile");
      commit('setProfile', null)
    },
    logout({ commit }) {
      localStorage.removeItem("profile");
      commit('setUser', null)
      commit('setProfile', null)
    },
    async getCurrentLanguage({ commit }) {
      const currentLanguage = await localStorage.getItem('language')
      if (currentLanguage == null) {
        const lang = "pt_br"
        localStorage.setItem("language", lang);
        commit('setLanguage', lang)
      }
    },
    changeLanguage({ commit }, payload) {
      if (payload) {
        localStorage.setItem("language", payload);
        commit('setLanguage', payload)
      }
    }
  },
  modules: {
  }
})
