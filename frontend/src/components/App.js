import React from 'react';
import { 
  Route,  
  Switch,
  useHistory } from "react-router-dom";

import '../index.css';

import { CurrentUser } from '../contexts/CurrentUserContext';
import Login from './Login'
import Register from './Register'

import api from '../utils/Api'
import * as auth from '../utils/Auth'
import ProtectedRoute from './ProtectedRoute'

import Header from './Header'
import Main from './Main'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoToolTip from './InfoToolTip'

function App() {

  const history = useHistory()

  // ****************** Работа с хуками для открытия Popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    console.log('1')
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImageOpen(false);
    setInfoToolTipOpen(false);
  }


  // ****************** Работа с карточками
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => console.log(err))
  }, [])

// ****************** Функция обработки лайка карточки
  function handleCardLike(card, userId) {
    const isLiked = card.likes.some(i => i._id === userId);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

// ****************** Функция обработки удаления карточки
  function handleCardDelete(id) {
    api.deleteCard(id)
      .then(() => setCards(cards.filter(item => item._id !== id)))
      .catch((err) => console.log(err))
  }

  // ****************** Работа с полноэкранной картинкой карточки
  const [selectedCard, setSelectedCard] = React.useState({})
  const [isImageOpen, setImageOpen] = React.useState(false)


  function handleCardClick(card) {
    setImageOpen(true);
    setSelectedCard(card);
  }

  // ****************** Работа с данными пользователя
  const [currentUser, setUser] = React.useState({})

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUser(data)
      })
      .catch((err) => console.log(err))
  }, [])

// ****************** Обработка данных пользователя
  function handleUpdateUser(obj) {
    api.editProfile(obj.name, obj.about)
      .then((data) => {
        setUser({name: data.name, about: data.about, avatar: data.avatar})
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

// ****************** Обработка Аватара пользователя
  function handleUpdateAvatar(obj) {
    api.changeAvatar(obj.avatar)
      .then((data) => {
        setUser({name: data.name, about: data.about, avatar: data.avatar})
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))

  }

// ****************** Обработка добавления новой карточки с фото
  function handleAddPlaceSubmit(data) {
    api.createNewCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

// ****************** Авторизация пользователей

  const [loggedIn, setLog] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('')
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [infoToolTipOpen, setInfoToolTipOpen] = React.useState(false)

  function handleRegister(data) {
    auth.register(data)
    .then((res) => {
      if (!res.error) {
        setRegistrationSuccess(true);
        history.push('/sign-in')
      }
    })
    .catch((err) => {
      switch (err) {
        case 400:
          console.log('Ошибка 400. Некорректно заполнено одно из полей.');
          break;
        default:
          console.log(`Регистрация не выполнена. Ошибка ${err}`);
      };
    })
    .finally(() => {
      setInfoToolTipOpen(true)
    })
  }

  function handleAuthorize(data) {
    auth.authorize(data)
    .then((err) => {
      if (!err.error) {
        setLog(true);
        localStorage.setItem('jwt', err.token);
        setUserEmail(data.email);
        history.push('/');
      }
    })
    .catch((err) => {
      switch(err) {
        case 400:
          console.log('Ошибка 400 - не передано одно из полей');
          break;

        case 401: 
          console.log('Ошибка 401 - пользователь с email не найден')
          break;

        default:
          console.log(`Авторизация не выполнена. Ошибка ${err}`);
      }
    })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in')
  }

  React.useEffect(() => {
    validateToken()
  }, [])

  function validateToken() {
    if(localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.validateToken(jwt)
      .then((res) => {
        if (res) {
          console.log(res)
          setUserEmail(res.data.email)
          setLog(true);
          history.push('/')
        }
      })
      .catch((err) => {
        switch(err) {
          case 400:
            console.log('Ошибка 400 — Токен не передан или передан не в том формате');
            break;
  
          case 401: 
            console.log('Ошибка 401 — Переданный токен некорректен');
            break;
  
          default:
            console.log(`Ошибка ${err}`);
            break;
        }
      })
    }
  }

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="content">
        <Header
          userEmail={userEmail}
          onSignOut={handleSignOut} />
        <Switch>

          <Route exact path='/sign-up'>
            <Register 
              handleRegister={handleRegister}
            /> 
          </Route>

          <Route exact path='/sign-in'>
            <Login 
              handleAuthorize={handleAuthorize}
            />
          </Route>

          <ProtectedRoute
            path='/' exact
            component={Main}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            loggedIn={loggedIn}
          />

        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
              
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <InfoToolTip
          isOpen={infoToolTipOpen}
          registrationSuccess={registrationSuccess}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImageOpen} />
      </div>
    {/* <PopupWithForm name='delete-card' title='Вы уверены?' textButton='Да' /> */}
    </CurrentUser.Provider>
  );
}

export default App;