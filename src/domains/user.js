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
  * Find a user by a value in a given users document field.
  * 
  * @param {string} name - document attribute name.
  * @param {Object} value - the value itself that will be searched.
  * @return { Promise } - promise that response  will be answered.
  */
  find(name, value) {
    return new Promise((resolve, reject) => {
      this.get(name, value).then((response) => {
        const documents = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        });
        const user = (documents.length == 0) ? null : documents[0]
        resolve({ user })
      }).catch((error) => reject(error))
    })
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
          .catch((error) => reject(error))

      }).catch((error) => reject(error))
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
        .catch((error) => reject(error))
    });
  },
  /**
   * create if user doesn't exist, otherwise it returns user found.
   * 
   * @param {object} user
   * @return { Promise } - promise that response  will be answered.
   */
  createIfNotExists(user) {
    return new Promise((resolve, reject) => {
      this.find("uid", user.uid).then(response => {
        if (!response.user) {

          this.collection.add(user)
            .then((response) => resolve(response))
            .catch(error => reject(error))

        } else {
          resolve({ user: response.user })
        }
      }).catch((error) => reject(error))
    })
  },
  /**
   * Get the authenticated and authorized user at sign in.
   */
  getCurrentUser() {
    const auth = this.auth.currentUser;
    return this.find("uid", auth.uid)
  },
  /**
   * Get the credentials of user authenticated and authorized at sign in.
   */
  getUserCredentials() {
    return this.auth.currentUser;
  },
  /**
   * Adds a new profile for the user.
   * 
   * @param {string} id - User id
   * @param {strin} name - profile name
   * @param {main} main - define if profile is principal. Default is false.
   * @return { Promise } - promise that response  will be answered.
   */
  addProfile(id, name, main = false) {
    let profile = { uuid: uuid.v4(), name, main };
    return new Promise((resolve, reject) => {
      this.collection.doc(id)
        .update({ profiles: firebase.firestore.FieldValue.arrayUnion(profile) })
        .then(() => resolve({ profile }))
        .catch((error) => reject(error))
    })
  },
  /**
   *  Removes profile for the user.
   * 
   * @param {string} id - User id
   * @param {Object} profile 
   * @return { Promise } - promise that response  will be answered.
   */
  removeProfile(id, profile) {
    return this.collection.doc(id)
      .update({ profiles: firebase.firestore.FieldValue.arrayRemove(profile) })
  }
}