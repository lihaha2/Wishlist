import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import {errorBase} from './Errors.js'

class ConnectToBase {
  #firebaseConfig = {
    apiKey: "AIzaSyA-Q58InDi3KHGXKwIg48CEw0NMIb_aKjw",
    authDomain: "diplom-7410a.firebaseapp.com",
    databaseURL: "https://diplom-7410a-default-rtdb.firebaseio.com",
    projectId: "diplom-7410a",
    storageBucket: "diplom-7410a.appspot.com",
    messagingSenderId: "511026974172",
    appId: "1:511026974172:web:1be336cdd5c016252f9319",
    measurementId: "G-CXWNE0TWSZ"
  }
  
  get iniApp(){
    return !firebase.apps.length ? firebase.initializeApp(this.#firebaseConfig) : firebase.app()
  }
}

const ConnectToFireBase = () => new ConnectToBase().iniApp

const createAccount = (email,password) => {
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(() => {
    localStorage.clear()
    window.location.replace('/finish')
  })
  .catch(error => {errorBase(error.code)})
}

const authAccount = (email,password) => {
  firebase.auth().signInWithEmailAndPassword(email,password)
  .then( e => {
    e.user.W !== undefined ? window.localStorage.setItem('unique',e.user.W.X) : window.localStorage.setItem('unique',e.user.X.X)
    window.localStorage.setItem('email',email)
    window.location.replace('/')
  })
  .catch( error => errorBase(error.code))
}

const verifyAccount = email => {
  firebase.auth().sendSignInLinkToEmail(email,{
    url: `https://wishlistforyou.netlify.app/reg_two?${email}`,
    handleCodeInApp: true
  }).then( async() => {
    localStorage.setItem('verifyEmail', email)
    await firebase.database().ref(`Emails/`).child(email.split('@')[0]).update({status: 'during'})
    window.location.replace('/verify')
  }).catch(error => errorBase(error.code))

}

const setToUserWishlist = (title, user) => firebase.database().ref(`Users/${user}/Wishlists`).child(title).child('Wishes').set('', false)

const setToUserWishes = (title, user, text) => firebase.database().ref(`Users/${user}/Wishlists/${title}/Wishes`).child(text).set({status: false}, false)

const deleteUserWishlist = (title, user) => firebase.database().ref(`Users/${user}/Wishlists/`).child(title).remove()

const deleteUserWishes = (title, user, text) => firebase.database().ref(`Users/${user}/Wishlists/${title}/Wishes`).child(text).remove()

const signOutUser = () => {
  firebase.auth().signOut()
  .then(() => {
    localStorage.clear()
    window.location.replace('/auth')
  })
  .catch( error => window.alert(error))
}

const completeUserWishes = (title, user, text, stat) => firebase.database().ref(`Users/${user}/Wishlists/${title}/Wishes`).child(text).update({status: stat})


export {ConnectToFireBase, createAccount, authAccount, verifyAccount, setToUserWishlist, setToUserWishes, deleteUserWishlist, deleteUserWishes, signOutUser, completeUserWishes}