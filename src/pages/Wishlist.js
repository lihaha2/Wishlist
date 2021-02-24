import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import firebase from 'firebase/app'
import 'firebase/database'
import {ConnectToFireBase, setToUserWishes, deleteUserWishes} from '../js/Firebase.js'
//images
import Del from '../images/delete.svg'
import Back from '../images/back.svg'
import Mode from '../images/mode.svg'

export const Wishlist = ()=>{
  const deleteWish = (text)=>{
    let title = decodeURI(window.location.search).split('?')[1]
    let result = window.confirm(`Вы точно хотите УДАЛИТЬ желание: 
    ${text}`)
    result ? deleteUserWishes(title,localStorage.getItem('unique'),text) : console.log('')
  }

  const addNewWish = ()=>{
    let title = decodeURI(window.location.search).split('?')[1]
    let wish = document.getElementById('wishText').value
    wish !== '' ? setToUserWishes(title,localStorage.getItem('unique'),wish.trim()) : window.alert('Заполните поле')
    document.querySelectorAll('details')[0].open = false
  }

    ConnectToFireBase()
    let title = decodeURI(window.location.search).split('?')[1]
    const [wishlist, setWishlist] = useState()
    useEffect(()=>{
      firebase.database().ref(`Users/${localStorage.getItem('unique')}/Wishlists/${title}`).child("Wishes")
      .on("value",e=>{
        let res = e.val()
        let wishlist = []
        for(let id in res){
          wishlist.push(id)
        }
        setWishlist(wishlist)
      })
    },[])

    return(
        <div className="auth__content wishes__content">
            <header className="content__header">
              <Link to="/" className="header__title">
              WISH LIST
              </Link>
              <Link to="/" title="На главную"><img src={Back} alt="На главную" /></Link>
            </header>
            <div className="content__header">
                <Link to="/" className="header__title wish__header-title">
                {title}
                </Link>
                <details className="details" id="newWishDetails">
                  <summary className="nav__buttons-link"><img src={Mode} alt="Добавить новое желание" /> Добавить новое желание</summary>
                  <div className="details__show">
                    <textarea className="show__input" type="text" placeholder="Чего желаете?" id="wishText" />
                    <Link to={`wishlist?${title}`} className="show__button" title="Добавить желание" onClick={addNewWish}>Добавить</Link>
                  </div>
                </details>
            </div>
            <hr/>
            <div className="user__wishlist">
              {wishlist ? wishlist.map((e,i)=>(
                  <div className="wish" key={i}>
                  <div className="wish__content">
                    <div className="wish__num">
                      {i+1}.
                    </div>
                    <div className="wish__text">
                      {e}
                    </div>
                  </div>
                  <div className="wish__buttons">
                    <Link to={`wishlist?${title}`} onClick={() => deleteWish(e)}><img className="svg" src={Del} alt="Удалить список желаний" title="Удалить список желаний" /></Link>
                  </div>
                </div>
                )) : <div></div>
              }
            </div>
        </div>
    )
}