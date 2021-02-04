"use strict";

import Vue from 'vue';
import axios from "axios";

axios.defaults.baseURL = process.env.baseURL || process.env.VUE_APP_API_URL || "";
axios.defaults.imageURL =  process.env.VUE_APP_API_IMAGE_URL || ""
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'


let config = {
  timeout: 15 * 1000
};

const version = process.env.VUE_APP_API_VERSION
const key = process.env.VUE_APP_API_KEY
const language = process.env.VUE_APP_API_LANGUAGE
const _axios = axios.create(config);

Vue.prototype.$http = _axios

_axios.interceptors.request.use(config => {
  config.url = `${version}/${config.url}&api_key=${key}&language=${language}`
  return config;
}, (error) => Promise.reject(error));

_axios.interceptors.response.use(
  (response) => {
    return response;
  }, (error) => Promise.reject(error));

export default _axios;
