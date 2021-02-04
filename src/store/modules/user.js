import firebase from '@/plugins/firebase'

export default {
    state: {
        user: null,
        profile: null,
    },
    getters: {
        user(state) {
            return state.user
        },
        profile(state) {
            return state.profile
        },
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setProfile(state, payload) {
            state.profile = payload
        },
    },
    actions: {
        async getCurrentUser({ commit }) {
            const currentUser = await firebase.getCurrentUser()
            const currentProfile = await localStorage.getItem('profile')
            commit('setUser', currentUser)
            commit('setProfile', currentProfile ? JSON.parse(currentProfile) : null)
        },
        addProfile({ commit }, payload) {
            localStorage.setItem("profile", JSON.stringify(payload));
            commit('setProfile', payload)
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
    },
}