import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import firebase from 'firebase/app'
import 'firebase/database'
import {setToUserWishes, deleteUserWishes, completeUserWishes} from '../js/Firebase'
import {AlertOpen, Confirm} from '../js/Errors'
//images
import Del from '../images/delete.svg'
import Complete from '../images/check.svg'
import CompleteSuccessful from '../images/check_complete.svg'
import Back from '../images/back.svg'
import Mode from '../images/mode.svg'

const deleteWish = text => {
  let title = decodeURI(window.location.search).split('?')[1]
  Confirm(`Вы точно хотите УДАЛИТЬ желание: 
  ${text}`, ()=> deleteUserWishes(title,localStorage.getItem('unique'),text))
}

const completeWish = (text, status) => {
  status === false ? status = true : status = false
  let title = decodeURI(window.location.search).split('?')[1]
  completeUserWishes(title,localStorage.getItem('unique'),text,status)
}

const addNewWish = () => {
  let title = decodeURI(window.location.search).split('?')[1]
  let wish = document.getElementById('wishText').value
  wish !== '' ? setToUserWishes(title,localStorage.getItem('unique'),wish.trim()) : AlertOpen('Заполните поле')
  document.querySelector('#wishText').value = ''
  document.querySelectorAll('details')[0].open = false
}

export const Wishlist = () => {
  document.addEventListener('DOMContentLoaded', () => window.location.search === '' ? window.location.replace('/') : '')

  let title = decodeURI(window.location.search).split('?')[1]
  const [wishlist, setWishlist] = useState()
  const [wishlistStatus, setWishlistStatus] = useState()
  useEffect(()=>{
    firebase.database().ref(`Users/${localStorage.getItem('unique')}/Wishlists/${title}`).child("Wishes")
    .on("value",e => {
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
      <main className="auth__content wishes__content">
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
                  <Link to={`wishlist?${title}`} className="show__button onEnter" title="Добавить желание" onClick={addNewWish}>Добавить</Link>
                </div>
              </details>
          </div>
          <hr/>
          <div className="user__wishlist">
            {wishlist ? wishlist.map((e,i) => (
                <div className="wish" key={i}>
                <div className="wish__content">
                  <span className="wish__num">
                    {i+1}.
                  </span>
                  <article className={wishlistStatus ? 'wish__text ' + wishlistStatus.get(e) : 'sosi'} >
                    {e}
                  </article>
                </div>
                <div className="wish__buttons">
                  <Link to={`wishlist?${title}`} onClick={() => completeWish(e,wishlistStatus.get(e))}><img className={`svg`} src={!wishlistStatus.get(e) ? Complete : CompleteSuccessful} alt="Желание выполнено" title="Желание выполнено" /></Link>
                  <Link to={`wishlist?${title}`} onClick={() => deleteWish(e)}><img className="svg" src={Del} alt="Удалить желание" title="Удалить желание" /></Link>
                </div>
              </div>
              )) : <div></div>
            }
          </div>
      </main>
  )
}