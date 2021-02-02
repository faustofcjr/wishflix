"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.VUE_APP_API_URL || "";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'

Vue.prototype.$http = axios

let config = {
  baseURL: process.env.baseURL || process.env.VUE_APP_API_URL || "",
  timeout: 15 * 1000,
  // withCredentials: true // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(config => {
  console.log(config.method)
  console.log(process.env.VUE_APP_API_VERSION)
  console.log(process.env.VUE_APP_API_KEY)
  console.log(process.env.VUE_APP_API_LANGUAGE)

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
}
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// Plugin.install = function(Vue, options) { //options not used. prevent error
Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
