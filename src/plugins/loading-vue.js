import Vue from 'vue'

import VueLoading from 'vuejs-loading-plugin'

Vue.use(VueLoading)


Vue.use(VueLoading, {
    dark: true,
    // text: 'Ladataan', // default 'Loading'
    loading: true, // default false
    // customLoader: myVueComponent, // replaces the spinner and text with your own
    background: 'rgb(255,255,255)', // set custom background
    // classes: ['myclass'] // array, object or string
})