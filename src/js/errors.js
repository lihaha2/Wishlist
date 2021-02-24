export const errorBase = (err)=>{
    const errBase = new Map([
        ['auth/wrong-password', 'Пароль введён неправильно'],
        ['auth/user-not-found', 'Пользователь не найден. Проверьте правильно ли введён email'],
        ['auth/email-already-in-use', 'Пользователь с таким email уже существует'],
        ['auth/invalid-email', 'Неправильный формат email. Пример: example@ex.com'],
        ['auth/argument-error','Ошибка регистрации вернитесь к началу'],
        ['auth/weak-password','Пароль должен быть не меньше 6 символов']
    ])

    window.alert(errBase.get(err))
    if (errBase.get(err) === 'Пользователь с таким email уже существует') {
        localStorage.clear()
        window.location.replace('/auth')
    }
}