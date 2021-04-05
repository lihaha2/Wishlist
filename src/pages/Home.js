import React, {useEffect, useState, Component} from 'react'
import {Link} from "react-router-dom"
import {setToUserWishlist, setToUserWishes, deleteUserWishlist, signOutUser} from '../js/Firebase.js'
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
import Logout from '../images/logout.svg'
import Login from '../images/login.svg'
import Car from '../images/car.png'
import Phone from '../images/phone.png'
import Flight from '../images/flight.png'
import Prewiew from '../images/prewiew.png'

const ScrollTo = target=>{
  let t
  let pos = document.documentElement.scrollTop

  const up = ()=>{
    window.scrollBy(0,-20)
    pos = document.documentElement.scrollTop
    t = setTimeout(up, 10)
    if(pos < target.offsetTop){
      clearTimeout(t)
      return false
    }
  } 
  
  const down = ()=>{
    window.scrollBy(0,20)
    pos = document.documentElement.scrollTop
    t = setTimeout(down, 10)
    if(pos > target.offsetTop){
      clearTimeout(t)
      return false
    }
  }

  pos > target.offsetTop ? 
    up() : 
  pos < target.offsetTop ? 
    down() : clearTimeout(t)
}

const ChangeSize = () => {
  if(localStorage.getItem('reduce') === 'true'){
    document.querySelectorAll('.nav__link > span').forEach( e => e.style.display = 'block')
    document.querySelector('.home__header').style.transition = 'padding 0.5s cubic-bezier(0, 0, 1, 1)'
    document.querySelector('.home__header').style.padding = '2rem'
    
    document.querySelector('.nav__ul').style.display = 'block'
    document.querySelector('.change__img > img').style.transform = 'rotate(0deg)'
  }else{
    document.querySelectorAll('.nav__link > span').forEach( e => e.style.display = 'none')
    document.querySelector('.home__header').style.transition = 'padding 0.5s cubic-bezier(0, 0, 1, 1)'
    document.querySelector('.home__header').style.padding = '1rem 2rem 1rem 2rem'
    document.querySelector('.nav__ul').style.display = 'flex'
    document.querySelector('.nav__ul').style.justifyContent = 'center'
    document.querySelector('.change__img > img').style.transform = 'rotate(180deg)'
  }
}

const Underline = target => {
  target.classList.add('underline')
  target.classList.remove('nonunderline')
  setTimeout(() => {
    target.classList.add('nonunderline')
    target.classList.remove('underline')
  }, 800)
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
            <div onClick={()=>{document.querySelector('#newWishDetails').open === true ? document.querySelector('#newWishDetails').open = false : document.querySelector('#newWishDetails').open = true; ScrollTo(document.querySelector('#newWishDetails'))}}><img className="svg" src={ModeRed} alt="Добавить желание" title="Добавить желание в список" /></div>
            <div onClick={()=>deleteListHandler(e)}><img className="svg" src={Del} alt="Удалить список желаний" title="Удалить список желаний" /></div>
          </div>
        </div>
      )) : <div className="noWishes">У вас нет ни одного списка желаний</div> }
    </div>
  )
}

const SelectWishlists = () => {
  const [wishlist, setWishlist] = useState()
  useEffect(()=>{
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

const OpenListHandler = ()=> setTimeout(()=>document.querySelector('#newListDetails').open = true , 500)

const About = ()=>{
  return(
    <section className="home__about home__wishlists"> 
      <h2 className="about__title">Добавляйте свои желания при помощи <span className="header__title goto" onClick={()=> document.querySelector('#wishlists') !== null ? ScrollTo(document.querySelector('#wishlists')) : ''}>WISHLIST</span></h2>
      <div className="about__content">
        <div className="about__content-text">
          <p className="about__content-text--p">
              Вопрос о смысле жизни, так или иначе, затрагивает со временем каждого из нас. 
            Кого-то раньше, кого-то позже. Однако это не меняет сути вопроса. 
            Говорят, что смысл жизни у каждого свой, однако если подумать…<br /> 
            На протяжении дней, месяцев, долгих лет мы стремимся к исполнению своей заветной мечты, 
            и если 10 процентов результата зависит от внешних обстоятельств, 
            то остальные 90 часто зависят от нас самих.
          </p>
          <div className="about__prewiew">
            <img src={Prewiew} className="about__prewiew-img" alt="Превью сайта"/>
            <p className="about__content-text--p">
              Наша команда попыталась заполнить часть из 10 процентов внешних обстоятельств,
              что бы вы смогли исполнить свою мечту.
            </p>
          </div>
          
        </div>
        <div className="about__content-articles">
          <article className="about__content-articles--article">
            Мечтай
          </article>
          <img src={Car} alt="Машина" className="about__content-articles--img" />
        </div>
        <div className="about__content-articles">
          <img src={Phone} alt="Телефон" className="about__content-articles--img---vertical" />
          <article  className="about__content-articles--article">
            Планируй
          </article>
        </div>
        <div className="about__content-articles">
          <article className="about__content-articles--article goto" onClick={()=>{if(document.querySelector('#wishlists') !==null){ScrollTo(document.querySelector('#wishlists')); OpenListHandler()}}}>
            Реализуй
          </article>
          <img src={Flight} alt="Самолет" className="about__content-articles--img" />
        </div>
      </div>
    </section>
  )
}

const HomeWishlists = ()=>{
  return(
    <section className="home__wishlists" id="wishlists">
      <div className="wishlists__nav">
        <h2 title="Управляйте вашими желаниями здесь">Ваши списки желаний</h2>
        <div className="nav__buttons">
        <details className="details" id="newListDetails" title="Нажмите чтобы создать новый список желаний">
          <summary className="nav__buttons-link"><img src={AddWhite} alt="Создать новый список" /> Создать новый список</summary>
          <div className="details__show">
            <input id="newList" className="show__input" type="text" placeholder="Название списка" maxLength="21" title="Максимум 20 символов" />
            <div className="show__button"  onClick={newListHandler} title="Создать список желаний">Создать</div>
          </div>
        </details>
        <details className="details" id="newWishDetails" title="Нажмите чтобы создать новое желание">
          <summary className="nav__buttons-link"><img src={Mode} alt="Добавить новое желание" /> Добавить новое желание</summary>
          <div className="details__show">
            <select className="show__input select" id="wishTitle">
              <SelectWishlists />
            </select>
            <textarea className="show__input" type="text" placeholder="Чего желаете?" id="wishText" />
            <div className="show__button" title="Добавить желание" onClick={newWishHandler}>Добавить</div>
          </div>
        </details>
        </div>
      </div>
      <hr />
      <Wishlists />
    </section>
  )
}

export class Home extends Component {
  componentDidMount(){
    ChangeSize()
  }

  render() {
    const Navlinks = ()=>(
      <>
      <li>
        <div className="nav__link" onClick={()=>{ ScrollTo(document.querySelector('#wishlists')); Underline(document.querySelector('.wishlists__nav > h2'))}}>
          <img className="svg" title="Ваши списки желаний" src={List} alt="Список" />
          <span> Ваши списки желаний</span>
        </div>
      </li>
      <li>
        <div className="nav__link" onClick={()=>{ ScrollTo(document.querySelector('#newListDetails')); OpenListHandler()}}>
          <img className="svg" title="Создать новый список желаний" src={Add} alt="Создать" />
          <span> Создать новый список желаний</span>
        </div>
      </li>
      <li>
        <div className="nav__link" onClick={signOutHandler} title="Выйти из аккаунта">
          <img className="svg" title="Выйти из аккаунта" src={Logout} alt="Выход" />
          <span> Выход</span>
        </div>
      </li>  
      </>
    )
    
    const Account = ()=>{
      if (localStorage.getItem('email') !== null) {
        return(
          <div className="header__account grow">
            <p title="Ваш аккаунт">{localStorage.getItem('email')}</p>
          </div>
        )
      }else{
        return(
          <>
          </>
        )
      }
    }

    const Log = ()=>{
      return(
        <li>
          <Link to="/auth" className="nav__link" title="Войти в аккаунт">
            <img className="svg" title="Вход" src={Login} alt="Вход" />
            <span> Вход</span>
          </Link>
        </li>
      )
    }

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
                <li>
                  <div className="nav__link" onClick={()=>{ ScrollTo(document.querySelector('#about')); Underline(document.querySelector('.home__about > h2'))}}>
                    <img className="svg" title="Описание" src={Text} alt="Описание" />
                    <span> Описание</span>
                  </div>
                </li>
                {
                  localStorage.getItem('unique') !== null ? <Navlinks/> : <Log/>
                }
              </ul>
            </nav>
            <Account/>
          </div>
          <div className="home__header-change">
            <div className="change__img" title="Показать/Скрыть навигацию" onClick={ ()=>{localStorage.getItem('reduce') === 'true' ? localStorage.setItem('reduce', false) : localStorage.setItem('reduce', true); ChangeSize()} }>
              <img src={Sub} alt="reduce/increase" />
            </div>
          </div>
        </header>
        {
          localStorage.getItem('unique') !== null ? <HomeWishlists /> : <></>
        }
        <div id="about"></div>
        <About/>
      </main>
    )
  }
}