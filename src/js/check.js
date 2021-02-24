export const Check = ()=>{
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.search === '') {
            window.location.replace('/')
        }else{
            let GET = window.location.search.split('&')
            let continueUrl = GET[3].split('=')[1]
            window.location.replace(continueUrl)
        }
    }, false)
    
    return(
        <div>
            {window.location.search.split('&')}
        </div>
    )
}