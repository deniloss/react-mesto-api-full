import React from "react";

function Login(props) {

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
    props.handleAuthorize({
      email: email,
      password: password
    })
  }

  return(
    <form className="login" onSubmit={handleSubmit}>
      <div className="login__block">
        <h1 className="login__title">Вход</h1>
        <input 
        type="email" 
        className="login__input" 
        placeholder='Email'
        value={email || ''} 
        onChange={handleEmailChange}
        />

        <input 
        type="password" 
        className="login__input" 
        placeholder='Пароль'
        value={password || ''} 
        onChange={handlePasswordChange}
        />

      </div>
      <div className="login__block">
       <button className="login__butt">Войти</button>
      </div>
    </form>
  )
}
export default Login;