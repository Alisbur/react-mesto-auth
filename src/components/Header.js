import logo from '../images/logo_white.svg';
import {NavLink, useNavigate} from "react-router-dom";

function Header(props) {

  const navigate = useNavigate();

  function handleClick() {
    props.onBtnClick();
  }

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Mesto" />
      {props.loggedIn
        ? (<button onClick={handleClick} className="header__btn">Выйти</button>)
        : (<NavLink to="/sign-in" className="header__link">Войти</NavLink>)
      }
    </header>
  );
}

export default Header;