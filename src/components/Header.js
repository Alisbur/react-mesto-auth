import logo from '../images/logo_white.svg';
import {NavLink} from "react-router-dom";
import React from "react";

function Header(props) {

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Mesto" />
      <div className='header__nav'>
        {props.loggedIn
          ? ( <>
                {props.email && <span className="header__email">{props.email}</span>}
                <button onClick={()=>props.onBtnClick()} className="header__btn">Выйти</button>
              </>)
          : (<NavLink to={props.page==="/sign-up" ? "/sign-in" : "/sign-up"} className="header__link link-transparency">{props.page==="/sign-up" ? "Войти" : "Регистрация"}</NavLink>)
        }

      </div>
    </header>
  );
}

export default Header;