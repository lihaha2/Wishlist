import React, {Component} from 'react'

export class Check extends Component {
    componentDidMount(){
        if (window.location.search === '') {
            window.location.replace('/')
        }else{
            localStorage.setItem('check', true)
            window.location.replace('/reg_two')
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