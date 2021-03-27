import React, {useEffect, useState, Component} from 'react'
import {Link} from "react-router-dom"
import {ConnectToFireBase, setToUserWishlist, setToUserWishes, deleteUserWishlist, signOutUser} from '../js/Firebase.js'
import {AlertOpen, Confirm} from '../js/Errors.js'
import firebase from 'firebase/app'
import 'firebase/database'
//images
import Add from '../images/add.svg'
import AddWhite from '../images/add_white.svg'
import List from '../images/list_alt.svg'
import Text from '../images/text_snippet.svg'
import Sub from '../images/change.svg'
import Del from '../images/delete.svg'
import Default from '../images/default.svg'
import Mode from '../images/mode.svg'
import ModeRed from '../images/mode_red.svg'


const ChangeSize = () => {
  if(localStorage.getItem('reduce') === 'true'){
    document.querySelectorAll('.nav__link > span').forEach( e => e.style.display = 'block')
    document.querySelector('.home__header').style.padding = '2rem'
    document.querySelector('.nav__ul').style.display = 'block'
    document.querySelector('.change__img > img').style.transform = 'rotate(0deg)'
  }else{
    document.querySelectorAll('.nav__link > span').forEach( e => e.style.display = 'none')
    document.querySelector('.home__header').style.padding = '1rem 2rem 1rem 2rem'
    document.querySelector('.nav__ul').style.display = 'flex'
    document.querySelector('.nav__ul').style.justifyContent = 'center'
    document.querySelector('.change__img > img').style.transform = 'rotate(180deg)'
  }
}

const newListHandler = (i = 0) => {
  let title = document.querySelector('#newList').value.trim()
  
  if (title === '') {
    AlertOpen('Заполните поле')
  }else{
    document.querySelectorAll('.card__link > h3').forEach(e => e.innerHTML === title ? i = i + 1 : false)
    document.querySelector('#newList').value = ''
    i > 0 ? AlertOpen('Такой список уже существует!') : setToUserWishlist(title, localStorage.getItem('unique'))
    document.querySelectorAll('details')[0].open = false
  }
}

const newWishHandler = () => {
  let title = document.querySelector('#wishTitle').value.trim()
  let text = document.querySelector('#wishText').value.trim()

  if (title && text === '') {
    AlertOpen('Заполните поля')
  }else{
    setToUserWishes(title, localStorage.getItem('unique'), text)
    document.querySelector('#wishText').value = ''
    document.querySelectorAll('details')[1].open = false
  }
}

const deleteListHandler = title => Confirm(`Вы точно хотите УДАЛИТЬ список: ${title}`, ()=> deleteUserWishlist(title,localStorage.getItem('unique')))

const Wishlists = () => {
  const [wishlist, setWishlist] = useState()
  useEffect(()=>{
    ConnectToFireBase()
    firebase.database().ref(`Users/${localStorage.getItem('unique')}`).child("Wishlists").on("value",(snapshot)=>{
      const wish = snapshot.val()
      const wishlist = []
      for(let id in wish){
        wishlist.push(id)
      }
      setWishlist(wishlist)
    })
  },[])

  return(
    <div className="wishlist__content">
      {wishlist ? wishlist.map((e,i) => (
        <div className="content__card" key={i}>
          <Link to={`/wishlist?${e}`} className="card__link" title="Нажмите чтобы перейти к списку">
            <h3>{e}</h3>
            <img className="card__link-img" src={Default} alt="Wishlist default" />
          </Link>
          <div className="card__options">
            <a href="#newWishDetails" onClick={()=>document.querySelector('#newWishDetails').open === true ? document.querySelector('#newWishDetails').open = false : document.querySelector('#newWishDetails').open = true}><img className="svg" src={ModeRed} alt="Добавить желание" title="Добавить желание в список" /></a>
            <Link to="#" onClick={()=>deleteListHandler(e)}><img className="svg" src={Del} alt="Удалить список желаний" title="Удалить список желаний" /></Link>
          </div>
        </div>
      )) : <div className="noWishes">У вас нет ни одного списка желаний</div> }
    </div>
  )
}

const SelectWishlists = () => {
  const [wishlist, setWishlist] = useState()
  useEffect(()=>{
    ConnectToFireBase()
    firebase.database().ref(`Users/${localStorage.getItem('unique')}`).child("Wishlists").on("value",(snapshot)=>{
      const wish = snapshot.val()
      const wishlist = []
      for(let id in wish){
        wishlist.push(id)
      }
      setWishlist(wishlist)
    })
  },[])
  
  return(
    <>
      {wishlist ? wishlist.map((e,i)=>(
          <option key={i} value={e}>
            {e}
          </option>
        )) : '' }
    </>
  )
}
const signOutHandler = () => Confirm('Вы точно хотите выйти из учётной записи?',signOutUser)

export class Home extends Component {
  componentDidMount(){
    ChangeSize()
  }

  render() {
    return(
      <main className="home">
        <header className="home__head">
          <div className="home__header">
            <div className="header__container grow">
              <Link to="/" className="header__title " title="Домашняя страница">
                  WISH LIST
              </Link>
            </div>
            <nav className="header__nav grow">
              <ul className="nav__ul">
                <li><a href="#about" className="nav__link"><img className="svg" title="Описание" src={Text} alt="Описание" /><span> Описание</span></a></li>
                <li><a href="#wishlists" className="nav__link" onClick={()=>{
                  document.querySelector('.wishlists__nav > h2').classList.add('underline')
                  document.querySelector('.wishlists__nav > h2').classList.remove('nonunderline')
                  setTimeout(() => {
                    document.querySelector('.wishlists__nav > h2').classList.add('nonunderline')
                    document.querySelector('.wishlists__nav > h2').classList.remove('underline')
                  }, 800)
                }}><img className="svg" title="Ваши списки желаний" src={List} alt="Список" /><span> Ваши списки желаний</span></a></li>
                <li><a href="#newListDetails" className="nav__link" onClick={()=>document.querySelector('#newListDetails').open === true ? document.querySelector('#newListDetails').open = false : document.querySelector('#newListDetails').open = true }><img className="svg" title="Создать новый список желаний" src={Add} alt="Создать" /><span> Создать новый список желаний</span></a></li>
              </ul>
            </nav>
            <div className="header__account grow">
              <p title="Ваш аккаунт">{localStorage.getItem('email')}</p>
              <Link to="#" onClick={signOutHandler} className="account__button" title="Выйти из аккаунта">Выйти</Link>
            </div>
          </div>
          <div className="home__header-change">
            <div className="change__img" title="Показать/Скрыть навигацию" onClick={ ()=>{localStorage.getItem('reduce') === 'true' ? localStorage.setItem('reduce', false) : localStorage.setItem('reduce', true); ChangeSize()} }>
              <img src={Sub} alt="reduce/increase" />
            </div>
          </div>
        </header>
        <section className="home__wishlists" id="wishlists">
          <div className="wishlists__nav">
            <h2 title="Управляйте вашими желаниями здесь">Ваши списки желаний</h2>
            <div className="nav__buttons">
            <details className="details" id="newListDetails" title="Нажмите чтобы создать новый список желаний">
              <summary className="nav__buttons-link"><img src={AddWhite} alt="Создать новый список" /> Создать новый список</summary>
              <div className="details__show">
                <input id="newList" className="show__input" type="text" placeholder="Название списка" maxLength="20" title="Максимум 20 символов" />
                <Link to="#" className="show__button"  onClick={newListHandler} title="Создать список желаний">Создать</Link>
              </div>
            </details>
            <details className="details" id="newWishDetails" title="Нажмите чтобы создать новое желание">
              <summary className="nav__buttons-link"><img src={Mode} alt="Добавить новое желание" /> Добавить новое желание</summary>
              <div className="details__show">
                <select className="show__input select" id="wishTitle">
                  <SelectWishlists />
                </select>
                <textarea className="show__input" type="text" placeholder="Чего желаете?" id="wishText" />
                <Link to="#" className="show__button" title="Добавить желание" onClick={newWishHandler}>Добавить</Link>
              </div>
            </details>
            </div>
          </div>
          <hr />
          <Wishlists />
        </section>
        <section className="home__about" id="about"> 
        </section>
      </main>
    )
  }
}