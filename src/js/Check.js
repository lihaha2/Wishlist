import {Redirect} from "react-router-dom"

const Check = () => {
    const Continue = ()=>{
        let url = window.location.search.split('&')[3].split('=')[1]
        localStorage.setItem('check', true)
        window.location.replace(url)
    }
    return window.location.search === '' ? <Redirect to="/auth" /> : <Continue />
}

export default Check