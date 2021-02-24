import React from 'react'
import {Link} from "react-router-dom"
import {createAccount} from '../js/Firebase.js'
//images
import Back from '../images/back.svg'

export const RegTwo = ()=>{
  const Create = ()=>{
    let password = document.querySelector('#password').value
    let confPassword = document.querySelector('#confPassword').value
    if ((password && confPassword) === '') {
        window.alert('Заполните все поля')
    }else if (confPassword !== password){
        window.alert('Пароли не совпадают')
    }else{
        createAccount(localStorage.getItem('verifyEmail'),password)
    }
  }

  return (
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
                <p className="reg__twoConf">Ваша почта подтверждена!!!</p>
                <h2 className="form__title">Придумайте пароль</h2>
                <p className="form__subtext">Аккаунт позволяет сохранять ваши желания</p>
                <input id="password" className="form__input reg__form" type="password" name="auth" placeholder="Пароль" required/>
                <input id="confPassword" className="form__input reg__form" type="password" name="auth" placeholder="Повторите пароль" required/>
                <p className="form__subtext">Завершение регистрации</p>
                <Link to="#" className="button form__button" onClick={Create}>Регистрация</Link>
            </form>
        </div>
    </div>
  )
}