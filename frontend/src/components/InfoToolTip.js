import regSuccess from '../images/RegSuccess.svg'
import noRegSuccess from '../images/noRegSuccess.svg'

function InfoToolTip(props) {
  return(
    <form className={`popup-tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup-tooltip__container">
        <img src={props.registrationSuccess ? regSuccess : noRegSuccess} alt="" className="popup-tooltip__image" />
        <p className="popup-tooltip__text">
          {props.registrationSuccess ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так! Попробуйте ещё раз.`}
        </p>
        <button className="popup-tooltip__close" type="button" onClick={props.onClose} ></button>
      </div>
    </form>
  )
}

export default InfoToolTip;