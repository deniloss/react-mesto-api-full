import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({

      avatar: avatarRef.current.value
      
    })
  }

  return(
    <PopupWithForm 
    name='avatar'   
    title='Обновить аватар' 
    textButton='Сохранить'
    isOpen={props.isOpen} 
    onClose={props.onClose}
    onSubmit={handleSubmit}>
    <section className="popup__section">
      <input 
      type="url" 
      ref={avatarRef} 
      name="form_link" 
      id="form_link-avatar" 
      className="popup__input popup__input_type_link popup__input_type_photo" 
      placeholder="Введите ссылку на фото" 
      required autoComplete="off" />
      <span className="popup__input-error" id="form_link-avatar-error"/>
    </section>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;