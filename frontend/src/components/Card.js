import React from "react";
import { CurrentUser } from "../contexts/CurrentUserContext";


function Card(props) {

  const currentUserContext = React.useContext(CurrentUser)

  // Определение владельца карточки
  const isOwn = props.item.owner._id === currentUserContext._id;
  const cardDeleteButtonClassName = (
    `elements__delete-icon ${isOwn ? 'elements__delete-icon_visible' : ''}`
  );

  // Определение  есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.item.likes.some(i => i._id === currentUserContext._id)
  const cardLikeIconClassName = (
    `elements__like-icon ${isLiked ? 'elements__like-icon_black' : ''}`
  )

  // Обработка клика по карточке
  function handleCardClick() {
    props.onCardClick(props.item);
  }

  // Обработка клика по иконке лайка
  function handleLikeClick() {
    props.onCardLike(props.item, currentUserContext._id)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.item._id)
  }
  
    return(
      <div className='elements__item'>
        <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
        <img 
        src={props.item.link} 
        alt={props.item.alt} 
        className="elements__image" 
        onClick={handleCardClick}
        />
        <div className="elements__text">
          <h2 className="elements__name">{props.item.name}</h2>
          <div className="elements__like">
            <button className={cardLikeIconClassName} onClick={handleLikeClick} type="button"></button>
            <p className="elements__like-counter">{props.item.likes.length}</p>
        </div>
      </div>
    </div>
    )
}

export default Card;