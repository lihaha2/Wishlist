import {useState} from 'react'
import {Link, Route, Redirect} from "react-router-dom"
import {createAccount} from '../js/Firebase'
import {Alert} from '../js/Errors'
//images
import Back from '../images/back.svg'



const RegTwo =()=>{
    const [RegTwoSuccess, setRegTwoSuccess] = useState(false)

    window.location.search === '' ?<Route path="/reg_two" render={ ()=> <Redirect to="/auth" /> }/>
    : localStorage.setItem('verifyEmail', window.location.search.split('?')[1])

    const Create = (password, confPassword) => {
        (password && confPassword) === '' ? 
        Alert('Заполните все поля') : 
        confPassword !== password ? Alert('Пароли не совпадают') : 
        createAccount(localStorage.getItem('verifyEmail'),password, setRegTwoSuccess)
    }

    const RegTwoRender = ()=>
        <main className="auth__content">
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
                    <Link to="#" className="button form__button" onClick={()=>Create(document.querySelector('#password').value, document.querySelector('#confPassword').value)}>Регистрация</Link>
                </form>
            </div>
        </main>

    return RegTwoSuccess ? <Redirect to="/finish" /> : <RegTwoRender />
}

export default RegTwo