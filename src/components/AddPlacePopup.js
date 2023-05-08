import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
//Переменные состояний
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

//Обнуление значений переменных состояний при закрытии попапа
  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');}
  }, [props.isOpen]);

//Изменение переменной названия 
  function handleNameChange(e) {
    setName(e.target.value);
  }

//Изменение переменной ссылки
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

//Обработчик сабмита вызывает функцию сохранения новой карточки из props
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  } 

  return (
    <PopupWithForm name='cardPopup' title='Новое место' submitBtnCaption={props.submitBtnCap} submitBtnDisabled = {props.submitBtnDisabled} onSubmit={ handleSubmit } isOpen={ props.isOpen } onClose={ props.onClose } children={
      <>
        <fieldset className="popup__fieldset">
          <input type="text" value={ name } onChange={ handleNameChange } className="popup__input popup__input_type_place" placeholder="Введите название места"
          name="name" required minLength="2" maxLength="30" />
          <span className="popup__input-error name-error"></span>
        </fieldset>
        <fieldset className="popup__fieldset">
          <input type="url" value={ link } onChange={ handleLinkChange } className="popup__input popup__input_type_link" placeholder="Введите ссылку" name="link" required />
          <span className="popup__input-error link-error"></span>
        </fieldset>
      </>
    } />
  );
}

export default AddPlacePopup;