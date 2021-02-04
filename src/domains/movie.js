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
        const url = `movie/popular?page=${page}`
        return axios.get(url)
    },
    /**
     * Get a list of recommended movies for a movie.
     * 
     * @param {Integer} id - movie Id
     * @param {Integer} page - specify which page to query. Default value is 1
     * @return { Promise } - promise that response  will be answered.
     */
    listRecommendations(id, page = 1) {
        const url = `movie/${id}/recommendations?page=${page}`
        return axios.get(url)
    },
    /**
     * Get a advanced list of recommended movies for a movie.
     * 
     * @param {Array} movies - list of movies
     * @param {Integer} page - specify which page to query. Default value is 1
     * @return { Promise } - promise that response  will be answered.
     */
    listAdvancedRecommendations(movies, page = 1) {
        let promises = movies.map(movie => {
            return this.listRecommendations(movie.id, page)
        })

        return new Promise((resolve, reject) => {
            let movies = []
            Promise.all(promises).then(response => {
                response.forEach(resp => {
                    resp.data.results.forEach(res => {
                        let found = movies.find(movie => movie.id === res.id)
                        if (!found) {
                            movies.push(res)
                        }
                    })
                })
                resolve({ movies })
            }).catch((error) => reject(error))
        })
    },
    /**
     * Search for movies.
     * 
     * @param {String} term - text query to search. This value should be URI encoded.
     * @param {Integer} page - specify which page to query. Default value is 1
     * @return { Promise } - promise that response  will be answered.
     */
    search(term, page = 1) {
        const url = `search/movie?query=${term}&page=${page}`
        return axios.get(url)
    },
    /**
     * Get movie image URL.
     *  
     * @param {String} posterPath - poster path
     * @param {String} size - file size. Default is 300
     */
    getImageURL(posterPath, size = 300) {
        let imageURL = process.env.VUE_APP_API_IMAGE_URL || ""
        return `${imageURL}/t/p/w${size}${posterPath}`
    }
}