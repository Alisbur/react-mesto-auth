import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useValidation } from "../hooks/useValidation";

function AddPlacePopup(props) {

  const {values, setValues, errors, setErrors, isValid, setIsValid, handleChange, resetForm} = useValidation();  

  //Обнуляем инпут при открытии и закрытии попапа
  React.useEffect(()=>{
    if(props.isOpen) {
      resetForm({ name: '', link: '' }, { name: '', link: '' }, false);
    }
  },[props.isOpen]);

//Обработчик сабмита вызывает функцию сохранения новой карточки из props
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(values);
  } 

  return (
    <PopupWithForm name='cardPopup' title='Новое место' onSubmit={ handleSubmit } isOpen={ props.isOpen } onClose={ props.onClose } children={
      <>
        <fieldset className="popup__fieldset">
          <input type="text" value={ values.name ? values.name : "" } onChange={ handleChange } className="popup__input popup__input_type_place" placeholder="Введите название места"
          name="name" required minLength="2" maxLength="30" />
          <span className={`popup__input-error ${!isValid&&props.isOpen ? "popup__input-error_visible" : "" }`}>{ errors.name }</span>
        </fieldset>
        <fieldset className="popup__fieldset">
          <input type="url" value={ values.link ? values.link : "" } onChange={ handleChange } className="popup__input popup__input_type_link" placeholder="Введите ссылку" name="link" required />
          <span className={`popup__input-error ${!isValid&&props.isOpen ? "popup__input-error_visible" : "" }`}>{ errors.link }</span>
        </fieldset>
        <button type="submit" className={`popup__save-button ${props.submitBtnDisabled||!isValid ? "popup__save-button_inactive" : ""}`} name="submitBtn" disabled={props.submitBtnDisabled||!isValid}>{props.submitBtnCap}</button>        
      </>
    } />
  );
}

export default AddPlacePopup;