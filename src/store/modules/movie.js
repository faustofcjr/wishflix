export default {
    state: {
        watchlist: [],
        favoriteGenres: [],
        rankGenres: []
    },
    getters: {
        watchlist(state) {
            return state.watchlist
        },
        favoriteGenres(state) {
            return state.favoriteGenres
        },
        rankGenres(state) {
            return state.rankGenres
        }
    },
    mutations: {
        addWatchlist(state, payload) {
            state.watchlist.push(payload)
        },
        setWatchlist(state, payload) {
            state.watchlist = payload
        },
        setFavoriteGenres(state, payload) {
            state.favoriteGenres = payload
        },
        setRankGenres(state, payload) {
            state.rankGenres = payload
        }
    },
    actions: {
        clearMovies({ commit }) {
            commit('setWatchlist', [])
            commit('setFavoriteGenres', [])
            commit('setRankGenres', [])
        },
        concatWatchlist({ commit, state }, payload) {

            // Group totals by movie ids. It is the base for generating an orderly rankGenres. 
            let favorites = state.favoriteGenres;

            payload.forEach(pl => {
                if (!state.watchlist.find(watch => watch.id === pl.id)) {
                    commit('addWatchlist', pl.movie)
                    pl.movie.genre_ids.forEach(id => favorites[id] = favorites[id] + 1 || 1)
                }
            })

            let rankGenres = Object.entries(favorites).sort((a, b) => b[1] - a[1])

            commit('setFavoriteGenres', favorites)
            commit('setRankGenres', rankGenres)
        },
    }
}