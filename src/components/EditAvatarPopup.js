import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  //Создаём реф
  const inputRef = React.useRef(null);

  //Обнуляем инпут при закрытии попапа
  React.useEffect(() => {
    if (props.isOpen)
      inputRef.current.value = '';
  }, [props.isOpen]);

  //ОБработчик сабмита с сохранением ссылки на новый аватар с помощью функции, проброшенной через props
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      link:inputRef.current.value
    });
  }

  return (
    <PopupWithForm name='avatarPopup' title='Редактировать профиль' submitBtnCaption={props.submitBtnCap} submitBtnDisabled={props.submitBtnDisabled} onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} children={
      <fieldset className="popup__fieldset">
        <input ref={inputRef} type="url" className="popup__input popup__input_type_link" placeholder="Введите ссылку" name="link" required />
        <span className="popup__input-error link-error"></span>
      </fieldset>
    } />
  );
}

export default EditAvatarPopup;