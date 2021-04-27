import React from 'react'
import {Link} from "react-router-dom"

const Redirect = () => {
  localStorage.removeItem('verifyEmail')
  window.location.replace('/auth')
}

const Finish = () => (
  <div className="auth__content">
    <header className="content__header">
      <Link to="/auth" className="header__title">
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

export default Finish