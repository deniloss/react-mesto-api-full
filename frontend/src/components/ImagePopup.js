import React from "react";

function ImagePopup(props) {

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
    <section className={`popup popup_places ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup_places__container">
        <img src={props.card.link} alt={props.card.name} className="popup_places__pic" />
        <p className="popup_places__name">{props.card.name}</p>
        <button className="popup_places__butt popup__close" onClick={props.onClose}></button>
      </div>
    </section>
  ) 
}

export default ImagePopup;