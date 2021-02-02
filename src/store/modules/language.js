export default {
    state: {
        language: null
    },
    getters: {
        language(state) {
            return state.language
        }
    },
    mutations: {
        setLanguage(state, payload) {
            state.language = payload
        }
    },
    actions: {
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
}