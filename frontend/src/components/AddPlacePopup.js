import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: name,
      link: link
    })
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm 
    name='add' 
    isOpen={props.isOpen} 
    onClose={props.onClose}  
    title='Новое место' 
    textButton='Создать'
    onSubmit={handleSubmit}>

      <section className="popup__section">
        <input 
        type="text" 
        name="form_name" 
        id="form_image-name" 
        placeholder="Название"
        value={name}
        className="popup__input popup__input_type_name" 
        required autoComplete="off" 
        minLength="2" maxLength="30"
        onChange={handleNameChange} />
        <span className="popup__input-error" id="form_image-name-error"/>
      </section>

      <section className="popup__section">
        <input 
        type="url" 
        name="form_link" 
        id="form_link" 
        placeholder="Ссылка на картинку"
        value={link} 
        className="popup__input popup__input_type_link" 
        required autoComplete="off"
        onChange={handleLinkChange} />
        <span className="popup__input-error" id="form_link-error"/>
      </section>
    </PopupWithForm>
  )
}

export default AddPlacePopup;