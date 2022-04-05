import React from "react";

function PopupWithForm(props) {

   React.useEffect(() => {

    if(!props.isOpen) return;

    const handleCloseByEscape = (evt) => {
      if (evt.key === 'Escape') {
        props.onClose();
      }
    };
    document.addEventListener('keyup', handleCloseByEscape);
    return () => document.removeEventListener('keyup', handleCloseByEscape);
  });

  React.useEffect(()=> {

    if(!props.isOpen) return;

    const handleCloseByOverlay = (evt) => {
      if (evt.target.classList.contains('popup')) {
        props.onClose();
      }
    };
      document.addEventListener('mousedown', handleCloseByOverlay);
    return () => document.removeEventListener('mousedown', handleCloseByOverlay);
  })

  return(
    <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__content">
          <h2 className="popup__title">{props.title}</h2>
          <form onSubmit={props.onSubmit} action="#" name={`form_${props.name}`} className={`popup__form popup__form_${props.name}`}>

            {props.children}

            <button className={`popup__button popup__button_${props.name}`} type="submit">{props.textButton}</button>
            <button className="popup__close" type="button" onClick={props.onClose} ></button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PopupWithForm