import React, {useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import './css/App.css'
import Auth from './pages/Auth'
import {Reg} from './pages/Reg'
import {RegTwo} from './pages/Reg_two'
import Home from './pages/Home'
import {Verify} from './pages/Verify'
import Finish from './pages/Finish'
import {Wishlist} from './pages/Wishlist'
import Check from './js/Check'
import {AlertBox} from './js/Errors'
import {ConnectToFireBase} from './js/Firebase.js'

const App = ()=> {
  const [wishlistName, setWishlistName] = useState('')
  const increment = (val)=>{
    setWishlistName(val+'')
  }

  ConnectToFireBase()

  return(
    <>
      <Router>
        <Switch>
            <Route path="/" 
              exact 
              render={()=><Home increment={increment} />} 
            />
            <Route path="/verify"
              render={
                ()=>(
                  <div className="container">
                    {localStorage.getItem('verifyEmail') === null ? <Redirect to="/" /> : <Verify/>}
                  </div>
                )
              }
            />
            <Route path="/auth" 
              render={
                ()=>(
                  <div className="container">
                    {localStorage.getItem('email') !== null ? <Redirect to="/" /> : <Auth />}
                  </div>
                )
              }
            />
            <Route path="/reg" 
              render={
                ()=>(
                  <div className="container">
                    {localStorage.getItem('email') !== null ? <Redirect to="/" /> : <Reg/> }
                  </div>
                )
              }  
            />
            <Route path="/reg_two" 
              render={
                ()=>(
                  <div className="container">
                    {localStorage.getItem('email') !== null ? <Redirect to="/" /> : localStorage.getItem('check') !== 'true' ? <Redirect to="/reg" /> : <RegTwo/> }
                  </div>
                )
              }
            />
            <Route path="/check" 
              render={
                ()=>(
                  <Check/>
                )
              }
            />
            <Route path="/wishlist" 
              render={
                ()=>localStorage.getItem('email') === null ? <Redirect to="/auth" /> : <Wishlist get={wishlistName} /> }
            />
            <Route path="/finish" 
              render={
                ()=>(
                  <div className="container">
                    {localStorage.getItem('verifyEmail')=== null ? <Redirect to="/" /> : <Finish/>}
                  </div>
                )
              }
            />
          </Switch>
      </Router>
      <AlertBox />
    </>
  )
}

export default App;