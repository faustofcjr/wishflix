"use strict";

import firebase from '@/plugins/firebase'
import { uuid } from "vue-uuid";

export default {
  name: "user",
  collection: firebase.firestore().collection("users"),
  auth: firebase.auth(),

  /**
   * Gets a users by a value in a given users document field.
   * 
   * @param {string} name - document attribute name.
   * @param {Object} value - the value itself that will be searched.
   * @return { Promise } - promise that response  will be answered.
   */
  get(name, value) {
    return this.collection.where(name, "==", value).get();
  },
  /**
   * Create a new user with email and password credentials.
   * 
   * @param {string} email
   * @param {string} password
   * @param {Object} payload - additional data
   * @return { Promise } - promise that response  will be answered.
   */
  create(email, password, payload) {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password).then(response => {
        const profiles = [{ uuid: uuid.v4(), name: payload.name, main: true }]
        let user = { uid: response.user.uid, ...payload, profiles }

        this.collection.add(user)
          .then((response) => resolve(response))
          .catch(error => reject(error))

      }).catch(error => reject(error))
    })
  },
  /**
   * Identifies and authenticates a user by their credentials defined
   * in the registration.
   * 
   * @param {string} email 
   * @param { string} password 
   * @return { Promise } - promise that response  will be answered.
   */
  signIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  },
  /**
   * AuthCredential using Facebook user.
   * 
   * @return { Promise } - promise that response  will be answered.
   */
  signInWithFacebook() {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      return this.auth.signInWithPopup(provider)
        .then((response) => {
          const fbUser = response.user;
          const profiles = [{ uuid: uuid.v4(), name: fbUser.displayName, main: true }]
          let user = { uid: fbUser.uid, name: fbUser.displayName, profiles }

          // Create user on first login
          this.createIfNotExists(user)
            .then(() => resolve({ user: fbUser }))
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    });
  },
  /**
   * create if user doesn't exist, otherwise it returns user found.
   * 
   * @param {object} user 
   */
  createIfNotExists(user) {
    return new Promise((resolve, reject) => {
      this.collection.where("uid", "==", user.uid).get().then(response => {
        const documents = response.docs.map((doc) => doc.data());

        if (documents.length == 0) {
          this.collection.add(user)
            .then((response) => resolve(response))
            .catch(error => reject(error))
        } else {
          const user = documents[0]
          resolve({ user })
        }
      }).catch(error => reject(error))
    })
  },
  /**
   * Get the authenticated and previously authorized user at sign in.
   */
  getCurrentUser() {
    return this.auth.currentUser;
  }
}