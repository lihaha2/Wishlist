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

const createAccount = (email,password, setRegTwoSuccess) => {
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(() => {
    localStorage.clear()
    return setRegTwoSuccess(true)
  })
  .catch(error => {errorBase(error.code)})
}

const authAccount = (email,password, setauthSuccess) => {
  firebase.auth().signInWithEmailAndPassword(email,password)
  .then( e => {
    e.user.W !== undefined ? window.localStorage.setItem('unique',e.user.W.X) : window.localStorage.setItem('unique',e.user.X.X)
    window.localStorage.setItem('email',email)
    return setauthSuccess(true)
  })
  .catch( error => errorBase(error.code))
}

const verifyAccount = (email, setregSuccess) => {
  firebase.auth().sendSignInLinkToEmail(email,{
    url: `https://wishlistforyou.netlify.app/reg_two?${email}`,
    handleCodeInApp: true
  }).then( () => {
    localStorage.setItem('verifyEmail', email)
    return setregSuccess(true)
  }).catch(error => errorBase(error.code))

}

const setToUserWishlist = (title, user) => firebase.database().ref(`Users/${user}/Wishlists`).child(title).child('Wishes').set('', false)

const setToUserWishes = (title, user, text) => firebase.database().ref(`Users/${user}/Wishlists/${title}/Wishes`).child(text).set({shortTitle: text.trim(),status: false}, false)

const setToUserWishesWithLink = (title, user, data) => firebase.database().ref(`Users/${user}/Wishlists/${title}/Wishes`).child((()=>{let title = (data.title).split(' '); return `${title[0]} ${title[1]}`})()).set({ shortTitle: (()=>{let title = (data.title).split(' '); return `${title[0]} ${title[1]}`})(), status: false, ...data}, false)

const deleteUserWishlist = (title, user) => firebase.database().ref(`Users/${user}/Wishlists/`).child(title).remove()

const deleteUserWishes = (title, user, data) => firebase.database().ref(`Users/${user}/Wishlists/${title}/Wishes`).child(data.shortTitle).remove()

const signOutUser = () => {
  firebase.auth().signOut()
  .then(() => {
    localStorage.clear()
    window.location.replace('/auth')
  })
  .catch( error => window.alert(error))
}

const completeUserWishes = (title, user, data, stat) => firebase.database().ref(`Users/${user}/Wishlists/${title}/Wishes`).child(data.shortTitle).update({...data, status: stat})



export {setToUserWishesWithLink, ConnectToFireBase, createAccount, authAccount, verifyAccount, setToUserWishlist, setToUserWishes, deleteUserWishlist, deleteUserWishes, signOutUser, completeUserWishes}