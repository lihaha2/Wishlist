import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import {errorBase} from './errors.js'

// window.firebase = firebase
export const ConnectToFireBase = ()=>{
  const firebaseConfig = {
    apiKey: "AIzaSyA-Q58InDi3KHGXKwIg48CEw0NMIb_aKjw",
    authDomain: "diplom-7410a.firebaseapp.com",
    databaseURL: "https://diplom-7410a-default-rtdb.firebaseio.com",
    projectId: "diplom-7410a",
    storageBucket: "diplom-7410a.appspot.com",
    messagingSenderId: "511026974172",
    appId: "1:511026974172:web:1be336cdd5c016252f9319",
    measurementId: "G-CXWNE0TWSZ"
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }else {
    firebase.app()
  }
}

export const createAccount = (email,password)=>{
  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(() => {
    localStorage.clear()
    window.location.replace('/finish')
  })
  .catch(error => {errorBase(error.code)})
}

export const authAccount = (email,password)=>{
  firebase.auth().signInWithEmailAndPassword(email,password)
  .then( (e) => {
    window.localStorage.setItem('email',email)
    window.localStorage.setItem('unique',e.user.W.X)
    window.location.replace('/')
  })
  .catch( error => errorBase(error.code))
}

export const verifyAccount = async(email)=>{
  await firebase.auth().sendSignInLinkToEmail(email,{
    url: 'http://localhost:3000/reg_two',
    handleCodeInApp: true
  })
  localStorage.setItem('verifyEmail', email)
  window.location.replace('/verify')
}

export const setToUserWishlist = window.setToUserWishlist = (title, user)=>{
  firebase.database().ref(`Users/${user}/Wishlists`).child(title).child('Wishes').set('',e=>{
    console.log(e)
  })
}

export const setToUserWishes = (title, user, text)=>{
  firebase.database().ref(`Users/${user}/Wishlists/${title}/Wishes`).child(text).set({status: false},e=>{
    console.log(e)
  })
}

export const deleteUserWishlist = (title, user)=>{
  firebase.database().ref(`Users/${user}/Wishlists/`).child(title).remove()
}

export const deleteUserWishes = (title, user, text)=>{
  firebase.database().ref(`Users/${user}/Wishlists/${title}/Wishes`).child(text).remove()
}

export const signOutUser = ()=>{
  firebase.auth().signOut().then(() => {
    localStorage.clear()
    window.location.replace('/auth')
  }).catch((error) => {
    window.alert(error)
  })
}

export const completeUserWishes = (title, user, text, stat)=>{
  firebase.database().ref(`Users/${user}/Wishlists/${title}/Wishes`).child(text).update({status: stat})
}