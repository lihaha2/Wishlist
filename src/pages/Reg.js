import React from 'react'
import {Link} from "react-router-dom"
import {verifyAccount} from '../js/Firebase.js'
import {Alert} from '../js/Errors.js'
//images
import Back from '../images/back.svg'
  
const Registration = ()=>{
  let email = document.querySelector('#email').value
  email === '' ? Alert('Заполните поле Почта') : verifyAccount(email)
}
export const Reg = ()=>(
  <div className="auth__content">
    <header className="content__header">
      <Link to="/" className="header__title">
        WISH LIST
      </Link>
      <Link to="/auth" title="На главную"><img src={Back} alt="На главную" /></Link>
    </header>
    <hr/>
    <div className="content__wrapper">
      <form className="wrapper__form">
        <h2 className="form__title">Регистрация</h2>
        <p className="form__subtext">Аккаунт позволяет сохранять ваши желания</p>
        <input id="email" className="form__input reg__form" type="text" name="auth" placeholder="Почта" required />
        <p className="form__subtext">Вам будет отправлена ссылка с подтверждением</p>
        <Link to="#" className="button" onClick={Registration}>Подтвердить email</Link>
      </form>
    </div>
  </div>
)