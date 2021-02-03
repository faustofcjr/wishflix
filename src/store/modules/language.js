export default {
    state: {
        language: null,
        languages: []
    },
    getters: {
        languages(state) {
            state.languages = [
                { key: "pt_br", value: "portuguese" },
                { key: "en", value: "english" },
            ]
            return state.languages
        },
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
                const lang = "pt_br" // pt_br is default language
                localStorage.setItem("language", lang);
                commit('setLanguage', lang)
            } else {
                commit('setLanguage', currentLanguage)
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