"use strict";

import Vue from 'vue'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const env = process.env

let config = {
    apiKey: env.VUE_APP_FIREBASE_API_KEY,
    authDomain: env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: env.VUE_APP_FIREBASE_PROJECT_ID,
    // storageBucket: env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: env.VUE_APP_FIREBASE_APP_ID,
    // measurementId: env.VUE_APP_FIREBASE_MEASUREMENT_ID
}

Vue.prototype.$firebase = firebase

firebase.initializeApp(config)

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};

export default firebase;