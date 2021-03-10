import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import firebase from 'firebase/app'
import 'firebase/database'
import {ConnectToFireBase, setToUserWishes, deleteUserWishes, completeUserWishes} from '../js/Firebase.js'
//images
import Del from '../images/delete.svg'
import Complete from '../images/check.svg'
import Back from '../images/back.svg'
import Mode from '../images/mode.svg'

export const Wishlist = ()=>{
  document.addEventListener('DOMContentLoaded', () => checkStatusOfWish())
  const checkStatusOfWish = ()=>{

  }
  const deleteWish = (text)=>{
    let title = decodeURI(window.location.search).split('?')[1]
    let result = window.confirm(`Вы точно хотите УДАЛИТЬ желание: 
    ${text}`)
    result ? deleteUserWishes(title,localStorage.getItem('unique'),text) : console.log('')
  }
  const completeWish = (text,status)=>{
    status == false ? status = true : status = false
    let title = decodeURI(window.location.search).split('?')[1]
    completeUserWishes(title,localStorage.getItem('unique'),text,status)
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
  const [wishlistStatus, setWishlistStatus] = useState()
  useEffect(()=>{
    firebase.database().ref(`Users/${localStorage.getItem('unique')}/Wishlists/${title}`).child("Wishes")
    .on("value",e=>{
      let res = e.val()
      let wishlist = []
      let wishlistStatus = new Map()
      for(let id in res){
        wishlist.push(id)
        wishlistStatus.set(id,res[id].status)
      }
      setWishlist(wishlist)
      setWishlistStatus(wishlistStatus)
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
                  <div className={wishlistStatus ? 'wish__text ' + wishlistStatus.get(e) : 'sosi'} >
                    {e}
                  </div>
                </div>
                <div className="wish__buttons">
                  <Link to={`wishlist?${title}`} onClick={() => completeWish(e,wishlistStatus.get(e))}><img className={`svg`} src={Complete} alt="Желание выполнено" title="Желание выполнено" /></Link>
                  <Link to={`wishlist?${title}`} onClick={() => deleteWish(e)}><img className="svg" src={Del} alt="Удалить желание" title="Удалить желание" /></Link>
                </div>
              </div>
              )) : <div></div>
            }
          </div>
      </div>
  )
}