import React from "react";
import {NavLink} from "react-router-dom";

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  } 

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  } 

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({email, password});
    console.log(`Регистрация ${email, password} выполнена`);
  } 

  return (
    <section className="sign">
      <div className="sign__form-container">
        <form className="sign__form" name="sign-form" onSubmit={handleSubmit}>
          <h2 className="sign__title">{props.title}</h2>
          <fieldset className="sign__fieldset">
            <input type="email" value={email} onChange={handleEmailChange} className="sign__input" placeholder="Email" name="email" required minLength="2" maxLength="40" />
            <span className="popup__input-error name-error"></span>
          </fieldset>
          <fieldset className="sign__fieldset">
            <input type="password" value={password} onChange={handlePasswordChange} className="sign__input" placeholder="Пароль" name="password" required minLength="5" maxLength="40" autoComplete="new-password" />
            <span className="popup__input-error prof-error"></span>
          </fieldset>
          <button type="submit" className={`sign__submit-button`} name="submitBtn">{props.submitBtnCap}</button>
          <span className="sign__span-text">Уже зарегистрированы? <NavLink to="/sign-in" className="sign__link">Войти</NavLink></span>
        </form>
      </div>
    </section>
  );
}

export default Register;