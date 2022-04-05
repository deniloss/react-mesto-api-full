import React from "react";
import { CurrentUser } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

  //Подписка на контекст текущего пользователя 
  const currentUserContext = React.useContext(CurrentUser)

  const [name, setName] = React.useState(currentUserContext.name);
  const [description, setDescription] = React.useState(currentUserContext.about);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  React.useEffect(() => {
    setName(currentUserContext.name);
    setDescription(currentUserContext.about);
  }, [currentUserContext, props.isOpen])

  // Функция сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
      avatar: currentUserContext.avatar
    })
  }

  return (
    <PopupWithForm 
    name='edit' 
    isOpen={props.isOpen} 
    onClose={props.onClose} 
    title='Редактировать профиль' 
    textButton='Сохранить'
    onSubmit={handleSubmit}>

      <section className="popup__section">
        <input 
        type="text" 
        name="form_name" 
        id="form_name" 
        className="popup__input popup__input_type_name" 
        placeholder="Как вас зовут?"
        value={name || ''}
        required autoComplete="off" 
        minLength="2" 
        maxLength="40"
        onChange={handleNameChange} />
        <span className="popup__input-error" id="form_name-error"/>
      </section>

      <section className="popup__section">
        <input 
        type="text" 
        name="form_job" 
        id="form_job" 
        className="popup__input popup__input_type_job" 
        placeholder="Ваша проффесия"
        value={description || ''}
        required autoComplete="off" 
        minLength="2" 
        maxLength="200"
        onChange={handleDescriptionChange} />
        <span className="popup__input-error" id="form_job-error"/>
      </section>
    </PopupWithForm>
  )
}

export default EditProfilePopup;