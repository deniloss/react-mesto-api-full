import React from 'react';
import { 
  Switch,
  Route, 
  Link } from 'react-router-dom';

import logo from '../images/header_logo.svg';

function Header(props) {
  return(
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Switch>

        <Route path='/sign-in'>
          <div className="header__container">
            <Link to='/sign-up' className="header__link">Регистрация</Link>
          </div>
        </Route>

        <Route path='/sign-up'>
          <div className="header__container">
            <Link to='/sign-in' className="header__link">Войти</Link>
          </div>
        </Route>

        <Route path='/'>
          <div className="header__container">
            <p className="header__email">{props.userEmail}</p>
            <Link 
              className="header__link"
              onClick={props.onSignOut}
              to='/sign-in'
            >
              Выйти
            </Link>
          </div>
        </Route>
        
      </Switch>
    </header>
  )
}

export default Header;