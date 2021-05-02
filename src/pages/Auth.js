import React, {useState, useEffect} from 'react'
import {Link, Redirect} from "react-router-dom"
import {authAccount} from '../js/Firebase.js'
import {Alert} from '../js/Errors.js'



const Auth = () => {
  const [authSuccess, setauthSuccess] = useState(false)
  
  useEffect(() => {
    document.addEventListener('keyup', e => e.key === 'Enter' && document.querySelector('.onEnter').click())
    return true
  })
  
  const Authentication = () =>{
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    email && password !== '' ? authAccount(email, password, setauthSuccess) : Alert('Заполните все поля')
  }

  const AuthRender = ()=>{
    localStorage.clear()
    return <div className="auth__content">
      <header className="content__header">
        <Link to="/" className="header__title">
          WISH LIST
        </Link>
      </header>
      <hr/>
      <div className="content__wrapper wrapper__form">
        <h2 className="form__title">Вход</h2>
        <p className="form__subtext">У вас нет аккаунта? <Link className="form__subtext-link" to="/reg">Зарегистрироваться</Link></p>
        <input id="email" className="form__input" type="email" name="auth" placeholder="Почта" required />
        <input id="password" className="form__input" type="password" name="auth" placeholder="Пароль" required/>
        {/* <p className="form__subtext">Забыли пароль? <Link className="form__subtext-link" to="/backup">Восстановить</Link></p> */}
        <Link to="#" className="button form__button temp_class onEnter" onClick={Authentication}>Войти</Link>
      </div>
    </div>
  }

  return authSuccess ? <Redirect to="/" /> : <AuthRender/>

}

export default Auth