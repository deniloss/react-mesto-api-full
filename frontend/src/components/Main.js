import React from "react";
import pencil from '../images/profile__pencil.svg'
import addButtonImage from '../images/add-button-pic.svg'

import Card from "./Card";
import Footer from './Footer'
import { CurrentUser } from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUserContext = React.useContext(CurrentUser);

  return(  
    <main className="main"> 
    
      <section className="profile">
        <div className="profile__info">
          <div className="profile__ava" onClick={props.onEditAvatar}>
            <img src={currentUserContext.avatar} alt="фото профиля" className="profile__avatar" />
            <img className="profile__pencil" src={pencil} alt="Карандаш" />
          </div>
          <div className="profile__text">
            <div className="profile__name-with-butt">
              <h1 className="profile__name">{currentUserContext.name}</h1>
              <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
              </button>
            </div>
            <p className="profile__subtext">{currentUserContext.about}</p>
          </div>   
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
          <img src={addButtonImage} alt="кнопка добавления фото" className="profile__add-button-pic" />
        </button>
      </section>

      <section className="elements">
        <div className="elements__grid">
          {props.cards.map(item => {
            return (<Card 
              item={item} 
              key={item._id} 
              onCardClick={item} 
              onCardLike={props.onCardLike} 
              onCardDelete={props.onCardDelete} 
              {...props}
              />
            )
          })}
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default Main;