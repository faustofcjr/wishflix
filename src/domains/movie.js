"use strict";

import axios from '@/plugins/axios'
import firebase from '@/plugins/firebase'

/**
 * Module that encodes movies business logic. Depending on the 
 * rule, queries are made on different sources like Firebase 
 * Cloud Firestore or TMDB API.
 */
export default {
    name: "movie",
    collection: firebase.firestore().collection("watchlist"),
    /**
     * Get a list of the current popular movies on list updates daily.
     * 
     * @param {Integer} page - specify which page to query. Default value is 1
     * @return { Promise } - promise that response  will be answered.
     */
    listPopular(page = 1) {
        const resource = `movie/popular?page=${page}`
        return axios.get(resource)
    },
    /**
     * Search for movies.
     * 
     * @param {String} term - text query to search. This value should be URI encoded.
     * @param {Integer} page - specify which page to query. Default value is 1
     * @return { Promise } - promise that response  will be answered.
     */
    search(term, page = 1) {
        const resource = `search/movie?query=${term}&page=${page}`
        return axios.get(resource)
    },
    /**
     * Get watchlist movies for a user profile.
     * 
     * This function listen watchlist document and provide snapshot 
     * immediately of  watchlist movies. 
     * 
     * @param {Object} profile - User profile
     * @param {Boolean} watched - watched or not condition
     * @param {Function} callback - callback function
     */
    getWatchlist(profile, watched, callback) {
        this.collection
        .where("profile", "==", profile)
        .where("watched", "==", watched)
        .onSnapshot((snapshot) => {
            let watchlist = []
            snapshot.docs.forEach((doc) => watchlist.push({ id: doc.id, ...doc.data() }));
            callback(watchlist)
        })
    },
}