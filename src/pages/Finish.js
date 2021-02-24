import React from 'react'
import {Link} from "react-router-dom"

export const Finish = ()=>{
  const Redirect = ()=>{
    localStorage.removeItem('verifyEmail')
    window.location.replace('/auth')
  }

    return (
      <div className="auth__content">
        <header className="content__header">
          <Link to="/" className="header__title">
            WISH LIST
          </Link>
        </header>
        <hr/>
        <div className="content__wrapper">
          <form className="wrapper__form">
            <p className="verify_text">Регистрация прошла успешно!!!</p>
            <Link to="#" className="button form__button verify_button" onClick={Redirect}>Перейти на страницу входа</Link>
          </form>
        </div>
      </div>
    )
}