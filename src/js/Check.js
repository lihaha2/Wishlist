const Check = () => {
    let url = window.location.search.split('&')[3].split('=')[1]
    if (window.location.search === '') {
        window.location.replace('/auth')
    }else{
        localStorage.setItem('check', true)
        window.location.replace(url)
    }
    
    return <></>
}

export default Check