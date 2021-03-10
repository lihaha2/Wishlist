import React from 'react'
import {BrowserRouter as Router, Switch,Route, Redirect} from "react-router-dom"
import './css/App.css'
import {Auth} from './pages/Auth'
import {Reg} from './pages/Reg'
import {RegTwo} from './pages/Reg_two'
import {Home} from './pages/Home'
import {Verify} from './pages/Verify'
import {Finish} from './pages/Finish'
import {Wishlist} from './pages/Wishlist'
import {Check} from './js/check'
import {ConnectToFireBase} from './js/Firebase'

document.addEventListener('DOMContentLoaded', () => ConnectToFireBase())
const App = ()=>{
    return (
      <Router>
        <Switch>
          <Route 
            exact 
            path="/" 
            render={()=>(localStorage.getItem('email') !== null ? <Home/> : <Redirect to="/auth" /> )} 
          />
          <Route path="/verify">
            <div className="container">
              {localStorage.getItem('verifyEmail') === null ? <Redirect to="/" /> : <Verify/>}
            </div>
          </Route>
          <Route path="/auth">
            <div className="container">
              {localStorage.getItem('email') !== null ? <Redirect to="/" /> : <Auth /> }
            </div>
          </Route>
          <Route path="/reg">
            <div className="container">
              {localStorage.getItem('email') !== null ? <Redirect to="/" /> : <Reg/> }
            </div>
          </Route>
          <Route path="/reg_two">
            <div className="container">
            {localStorage.getItem('email') !== null ? <Redirect to="/" /> : localStorage.getItem('verifyEmail')=== null ? <Redirect to="/reg" /> : <RegTwo/> }
            </div>
          </Route>
          <Route path="/check">
            <Check/>
          </Route>
          <Route path="/wishlist">
            <div className="container">
              {localStorage.getItem('email') === null ? <Redirect to="/auth" /> : <Wishlist /> }
            </div>
          </Route>
          <Route path="/finish">
            <div className="container">
              {localStorage.getItem('verifyEmail')=== null ? <Redirect to="/" /> : <Finish/>}
            </div>
          </Route>
        </Switch>
      </Router>
    )
}

export default App;