import React, {Component} from 'react'

export class Check extends Component {
    componentDidMount(){
        let url = window.location.search.split('&')[3].split('=')[1]
        if (window.location.search === '') {
            window.location.replace('/')
        }else{
            console.log(url)
            localStorage.setItem('check', true)
            window.location.replace(url) //url
        }
    }
    render() {
        return(
            <div>
                {window.location.search.split('&')}
            </div>
        )
    }
}