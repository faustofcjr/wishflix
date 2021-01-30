"use strict";

import Vue from 'vue'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const env = process.env

let config = {
    apiKey: env.VUE_APP_FIREBASE_API_KEY,
    authDomain: env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: '',
    messagingSenderId: ''
}

Vue.prototype.$firebase = firebase

firebase.initializeApp(config)


// export default Firebase