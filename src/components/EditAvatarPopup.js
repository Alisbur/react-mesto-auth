import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useValidation } from "../hooks/useValidation";

function EditAvatarPopup(props) {

  const {values, setValues, errors, setErrors, isValid, setIsValid, handleChange, resetForm} = useValidation();

  //Обнуляем инпут при открытии и закрытии попапа
  React.useEffect(()=>{
    if(props.isOpen) {
      resetForm({ link: '' }, { link: '' }, false);
    }
  },[props.isOpen]);

/*  React.useEffect(() => {
    if (props.isOpen)
      inputRef.current.value = '';
  }, [props.isOpen]);*/

  //ОБработчик сабмита с сохранением ссылки на новый аватар с помощью функции, проброшенной через props
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(values);
  }

  return (
    <PopupWithForm name='avatarPopup' title='Обновить аватар' onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} children={
      <>
        <fieldset className="popup__fieldset">
          <input type="url" value={values.link ? values.link : ""} onChange={handleChange} className="popup__input popup__input_type_link" placeholder="Введите ссылку" name="link" required />
          <span className={`popup__input-error ${!isValid&&props.isOpen ? "popup__input-error_visible" : "" }`}>{ errors.link }</span>
        </fieldset>
        <button type="submit" className={`popup__save-button ${props.submitBtnDisabled||!isValid ? "popup__save-button_inactive" : ""}`} name="submitBtn" disabled={props.submitBtnDisabled||!isValid}>{props.submitBtnCap}</button>
      </>
    } />
  );
}

export default EditAvatarPopup;