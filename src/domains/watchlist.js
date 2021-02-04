"use strict";

import firebase from '@/plugins/firebase'

/**
 * Module that encodes watchlist business logic. 
 */
export default {
    name: "watchlist",
    collection: firebase.firestore().collection("watchlist"),
    /**
     * Get watchlist movies for a user profile.
     * 
     * This function listen watchlist document and provide snapshot
     * immediately of  watchlist movies. 
     * 
     * @param {Object} profile - user profile
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
    /**
     * Add movie on user profile watchlist.
     * 
     * @param {Object} movie - movie to add in watchlist
     * @param {Object} profile - user profile
     * @param {Boolean} watched - watched or not condition. Default is false
     * @return { Promise } - promise that response  will be answered.
     */
    addToWatchlist(movie, profile, watched = false) {
        const watchlist = { movie, profile, watched };
        return this.collection.add(watchlist)
    },
    /**
     * Update  movie on user profile watchlist.
     * 
     * @param {String} id - watchlist Id
     * @param {Object} data - attributes to be updated
     * @return { Promise } - promise that response  will be answered.
     */
    updateWatchlist(id, data) {
        return this.collection.doc(id).update(data)
    }
}