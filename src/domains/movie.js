"use strict";

import axios from '@/plugins/axios'

/**
 * Module that encodes movies business logic.
 */
export default {
    name: "movie",
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
     * Get movie image URL.
     *  
     * @param {String} posterPath - poster path
     * @param {String} size - file size. Default is 300
     */
    getImageURL(posterPath, size = 300) {
        let imageURL =  process.env.VUE_APP_API_IMAGE_URL || ""
        return `${imageURL}/t/p/w${size}${posterPath}`
    }
}