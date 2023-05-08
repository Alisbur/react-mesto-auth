import React from "react";

function Login(props) {

  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  } 

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  } 

  function handleSubmit(e) {
    e.preventDefault();
    console.log('login submit');
  } 

  return (
    <section className="login">
      <div className="login__form-container">
        <form className="login__form" name="login-form" onSubmit={handleSubmit}>
          <h2 className="login__title">{props.title}</h2>
          <fieldset className="login__fieldset">
            <input type="text" value={name} onChange={handleNameChange} className="login__input" placeholder="Email" name="nnn" required minLength="2" maxLength="40" />
            <span className="popup__input-error name-error"></span>
          </fieldset>
          <fieldset className="login__fieldset">
            <input type="password" value={password} onChange={handlePasswordChange} className="login__input" placeholder="Пароль" name="ppp" required minLength="5" maxLength="40" />
            <span className="popup__input-error prof-error"></span>
          </fieldset>
          <button type="submit" className={`login__submit-button`} name="submitBtn">{props.submitBtnCap}</button>
        </form>
      </div>
    </section>
  );
}

export default Login;