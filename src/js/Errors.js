import Close from '../images/close.svg'

const errBase = new Map([
    ['auth/wrong-password', 'Пароль введён неправильно'],
    ['auth/user-not-found', 'Пользователь не найден. Проверьте правильно ли введён email'],
    ['auth/email-already-in-use', 'Пользователь с таким email уже существует'],
    ['auth/invalid-email', 'Неправильный формат email. Пример: example@ex.com'],
    ['auth/argument-error','Ошибка регистрации вернитесь к началу'],
    ['auth/unauthorized-continue-uri','Недопустимый домен'],
    ['auth/weak-password','Пароль должен быть не меньше 6 символов']
])

const errorBase = err =>{
    Alert(errBase.get(err))
    if (errBase.get(err) === 'Пользователь с таким email уже существует') {
        localStorage.clear()
        setTimeout(()=>window.location.replace('/auth'), 3000)
    }
}

const Alert = text => {
    const alertBox = document.querySelector('.custom__container')
    document.querySelectorAll('details').forEach(e=>{e.style.pointerEvents = 'none'})
    document.querySelectorAll('a').forEach(e=>{e.style.pointerEvents = 'none'})
    document.querySelector('.alert').innerHTML = text
    alertBox.style.display = 'block'
    document.querySelector('.custom__container img').style.pointerEvents = ''
}

const AlertClose = ()=>{
    const alertBox = document.querySelector('.custom__container')
    document.querySelectorAll('details').forEach(e=>{e.style.pointerEvents = ''})
    document.querySelectorAll('a').forEach(e=>{e.style.pointerEvents = ''})
    alertBox.style.display = 'none'
    document.querySelector('.custom__container img').style.pointerEvents = 'none'
    document.querySelector('.custom__window-buttons').style.display = 'none'
    document.querySelector('.ok').onClick = ''
}

const AlertBox = ()=>(
    <div className="custom__container">
        <div className="custom__window">
            <article className="custom__window-text"><div className="alert">Дефолтный див</div></article>
            <div className="custom__window-buttons">
                <button className="ok" onClick={AlertClose}>ОК</button>
                <button onClick={AlertClose}>Отмена</button>
            </div>
            <img src={Close} className="custom__window-close" onClick={AlertClose} alt="Закрыть" title="Закрыть" />
        </div>
    </div>
)

const ConfirmOpen = func => {
    document.querySelector('.custom__window-buttons').style.display = 'flex'
    document.querySelector('.ok').addEventListener('click', func,{once: true})
}

const Confirm = (text, callback)=>{
    Alert(text)
    ConfirmOpen(callback)
}

export {Confirm, AlertBox, Alert, errorBase}