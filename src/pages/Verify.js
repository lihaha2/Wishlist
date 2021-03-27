import React from 'react'
import {Link} from "react-router-dom"

export const Verify = () => (
  <div className="auth__content">
    <header className="content__header">
      <Link to="/" className="header__title">
        WISH LIST
      </Link>
    </header>
    <hr/>
    <div className="content__wrapper">
      <form className="wrapper__form">
        <p className="verify_text">Проверьте свой почтовый ящик по адресу {localStorage.getItem('verifyEmail')}</p>
        <Link to="/auth" className="button form__button verify_button">Перейти на страницу входа</Link>
      </form>
    </div>
  </div>
)