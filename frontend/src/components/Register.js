import React from "react";
import { Link } from "react-router-dom";



function Register(props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleRegister({
      email: email,
      password: password
    })
  }

  return(
    <form className="register" onSubmit={handleSubmit} >
      <div className="register__block">
        <h1 className="register__title">Регистрация</h1>
        <input 
        type="email" 
        className="register__input" 
        placeholder='Email' 
        value={email || ''}
        onChange={handleEmailChange}
        />

        <input 
        type="password" 
        className="register__input" 
        placeholder='Пароль'
        value={password || ''}
        onChange={handlePasswordChange}
        />
      </div>
      <div className="register__block">
       <button type='submit' className="register__butt">Зарегистрироваться</button>
       <Link to='/sign-in' className='register__link'>Уже зарегистрированы? Войти</Link>
      </div>
    </form>
  )
}

export default Register;