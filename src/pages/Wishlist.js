import React, {useEffect, useState} from 'react'
import {Link, Redirect, Route} from "react-router-dom"
import firebase from 'firebase/app'
import 'firebase/database'
import {setToUserWishes, deleteUserWishes, completeUserWishes} from '../js/Firebase'
import {Alert, Confirm} from '../js/Errors'
//images
import Del from '../images/delete.svg'
import Complete from '../images/check.svg'
import CompleteSuccessful from '../images/check_complete.svg'
import Back from '../images/back.svg'
import Mode from '../images/mode.svg'
import Add from '../images/add_white.svg'
import Preloader from '../images/preloader.svg'

const deleteWish = (title, text) => 
  Confirm(`Вы точно хотите УДАЛИТЬ желание: 
  ${text}`, ()=> deleteUserWishes(title,localStorage.getItem('unique'),text))

const completeWish = (title, text, status) => {
  status === false ? status = true : status = false
  completeUserWishes(title,localStorage.getItem('unique'),text,status)
}

const addNewWish = (title) => {
  let wish = document.getElementById('wishText').value
  wish !== '' ? setToUserWishes(title,localStorage.getItem('unique'),wish.trim()) : Alert('Заполните поле')
  document.querySelector('#wishText').value = ''
  document.querySelectorAll('details')[0].open = false
}

const Parser = async(url)=>{
  let res = await fetch(`http://localhost:7000/Parser?site=${url}`)
  let result = await res.json()
  document.querySelector('.find__card-title').innerHTML = result.title
  document.querySelector('.find__card-img').src = `http://localhost:7000/images/${result.img}`
  document.querySelector('.find__card-price').innerHTML = result.price
  document.querySelector('.preloader').style.display= 'none'
  document.querySelector('.scrap__output').style.display= 'block'
}

const FindProduct = ()=>{
  let href = document.querySelector('#scrap').value.trim()
  if (href === '') {
    Alert('Заполните поле')
    return false
  }else{
    Parser(href)
    document.querySelector('.preloader').style.display = 'block'
  }
  
}

const Output = ()=>{
  return(
    <div className="scrap__output content__card" style={{display:'none'}}>
      <div className="find__card">
        <h3 className="find__card-title" >def</h3>
        <img className="find__card-img" src="" alt="product"/>
        <p className="find__card-price"></p>
        <div className="find__card-buttons">
          <button>Добавить</button>
          <button>Отмена</button>
        </div>
      </div>
    </div>
  )    
}

const Wishlist = ({get})=>{
  return <Route path="/wishlist" 
    render={ ()=> get ==='' ? <Redirect to="/" /> : <Sosi get={get} /> }
  />
}

const Sosi = ({get}) => {

  let title = get.trim()
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
    return true
  },[])

  return(
    <main className="container">
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
                <div className="show__button onEnter" title="Добавить желание" onClick={()=>addNewWish(title)}>Добавить</div>
              </div>
            </details>
        </div>
        <hr/>
        <div className="user__wishlist">
          {(wishlist !== undefined && wishlistStatus!==undefined )? wishlist.map((e,i) => (
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
                <div onClick={() => completeWish(title,e,wishlistStatus.get(e))}><img className={`svg`} src={!wishlistStatus.get(e) ? Complete : CompleteSuccessful} alt="Желание выполнено" title="Желание выполнено" /></div>
                <div onClick={() => deleteWish(title,e)}><img className="svg" src={Del} alt="Удалить желание" title="Удалить желание" /></div>
              </div>
            </div>
            )) : <div></div>
          }
        </div>
      </div>
      <div className="auth__content wishes__content scrap">
          <h2>Желания со ссылками (Beta)</h2>
          <p className="scrap__text">
            Желания со ссылками - это ваши желания из других магазинов. <br/>
            Вы можете вставить ссылку на понравившийся вам товар, мы найдём его и отправим в ваш список. <br/><br/>
            <b>Будьте внимательны!!! Список магазинов ограничен.</b><br/><br/> 
            Поддерживаемые магазины: <a href="https://www.citilink.ru/" target="__blank">СИТИЛИНК</a>.
          </p>
          <div className="scrap__body">
            <p>
              Вставьте ссылку на товар - пример: <a target="__blank" href="https://www.citilink.ru/product/noutbuk-lenovo-ideapad-s340-14api-14-ips-amd-ryzen-3-3200u-2-6ggc-8gb-1153686/">https://www.citilink.ru/product/noutbuk-lenovo-ideapad-s340-14api-14-ips-amd-ryzen-3-3200u-2-6ggc-8gb-1153686/</a>
            </p>
            <div className="scrap__body-wrapper">
              <div className="scrap__body-wrapper--button" title="Найти товар из магазина" onClick={FindProduct} ><img src={Add} alt="Добавить"/></div>
              <input className="scrap__body-wrapper--input" title="Вставьте ссылку на товар" type="text" name="scrap" id="scrap" placeholder="https://example.com/product?id=143289" />
            </div>
            <Output />
            <img className="preloader" style={{display: 'none'}} src={Preloader} alt="Загрузка..."/>
          </div>
      </div>
    </main>
  )
}

export default Wishlist