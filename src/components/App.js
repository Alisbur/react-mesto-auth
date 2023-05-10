import React, { useState } from 'react';
import { Navigate, useNavigate, Routes, Route } from "react-router-dom";
import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import auth from '../utils/Auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Login from './Login.js';
import Register from './Register.js';
import Page404 from './Page404.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';


function App() {

  const navigate = useNavigate();
    
  //Переменные состояний 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' });
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Получаем с сервера данные пользователя
  React.useEffect(function () {
    api.getProfileData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        alert(`Не удалось загрузить данные профиля! Ошибка: ${err}`);
      });
  }, []);

  //Получаем с сервера данные карточек
  React.useEffect(function () {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        alert(`Не удалось загрузить данные карточек! Ошибка: ${err}`);
      });
  }, []);

  //Добавляем лисенер нажатия на кнопки для закрытия попапов по Esc 
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscPress);
  }, [])

  //Проверяем аутентифицирован ли пользователь
  React.useEffect(() => {
    handleAuthCheck();
  }, [])

  //Обработчик нажатия на кнопку Esc
  function handleEscPress(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  //Обработчик клика на аватар 
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //Обработчик клика на кнопку редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //Обработчик клика на кнопку добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //Закрытие всех попапов и обнуление переменных состояния
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '' });
    setCardToDelete(null);
  }

  //Обработчик клика по карточке
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //Обработчик клика по лайку 
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        alert(`Не удалось поставить лайк! Ошибка: ${err}`);
      });
  }

  //Обработчик клика по иконке с корзиной
  function handleCardDelete(card) {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  }

  //Обработчик удаления карточки после подтверждения в соответствующем попапе
  function handleConfirmCardDelete() {
    setIsSaving(true);
    api.deleteCard(cardToDelete._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось удалить карточку! Ошибка: ${err}`);
      })
      .finally(() => setTimeout(() => setIsSaving(false), 1000));
  }

  //Обработчик сохранения новых данных пользователя на сервере
  function handleUpdateUser(newProfileData) {
    setIsSaving(true);
    api.modifyProfileData(newProfileData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось сохранить новые данные профиля! Ошибка: ${err}`);
      })
      .finally(() => setTimeout(() => setIsSaving(false), 1000));
  }

  //Обработчик сохранения новых данных аватара на сервере
  function handleUpdateAvatar(newLink) {
    setIsSaving(true);
    api.setUserAvatar(newLink)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось сохранить новый аватар! Ошибка: ${err}`);
      })
      .finally(() => setTimeout(() => setIsSaving(false), 1000));
  }

  //Обработчик сохранения новой карточки места на сервере  
  function handleAddPlaceSubmit(newPlaceData) {
    setIsSaving(true);
    api.addNewCard(newPlaceData)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось сохранить новое место! Ошибка: ${err}`);
      })
      .finally(() => setTimeout(() => setIsSaving(false), 1000));
  }

  //Обработчик регистрации нового пользователя на сервере  
  function handleRegisterSubmit( newUserData ) {
    auth.register(newUserData)
      .then((data) => {
        setInfoTooltipOpen(true);
        navigate("/sign-in", {replace:true});
      })
      .catch((err) => {
        alert(`Не удалось зарегистрировать пользователя! Ошибка: ${err}`);
      })
  }  

  //Обработчик авторизации пользователя на сервере
  function handleLoginSubmit( userData ) {
    auth.login(userData)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate("/cards", {replace:true});
      })
      .catch((err) => {
        alert(`Не удалось войти в систему! Ошибка: ${err}`);
      })
  }
  
  //Обработчик авторизации пользователя на сервере
  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate("/sign-in", {replace:true});
  }    

  //Обработчик проверки выполненной авторизации
  function handleAuthCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.authCheck(jwt).then((data) => {
        setIsLoggedIn(true);
        console.log(data);
        navigate("/cards", {replace:true});
      })
    }
  }   
  

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={isLoggedIn} onBtnClick={handleLogout} />
        <Routes>
          <Route path="/sign-up" element={<Register submitBtnCap='Зарегистрироваться' title="Регистрация" onSubmit={handleRegisterSubmit} />} />
          <Route path="/sign-in" element={<Login submitBtnCap='Войти' title="Вход" onSubmit={handleLoginSubmit} />} />

          <Route path="/" element={isLoggedIn ? <Navigate to="/cards" replace /> : <Navigate to="/sign-in" replace />}/>
          <Route path="*" element={<Page404 />} />
          <Route path="/cards" element={<ProtectedRouteElement element={Main} loggedIn={isLoggedIn} 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />} />
        </Routes>

        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} submitBtnCap={!isSaving ? 'Сохранить' : 'Сохранение...'} submitBtnDisabled={isSaving} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} submitBtnCap={!isSaving ? 'Сохранить' : 'Сохранение...'} submitBtnDisabled={isSaving} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />
        <ConfirmPopup isOpen={isConfirmPopupOpen} submitBtnCap={!isSaving ? 'Да' : 'Удаление...'} submitBtnDisabled={isSaving} onSubmit={handleConfirmCardDelete} onClose={closeAllPopups} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} submitBtnCap={!isSaving ? 'Создать' : 'Сохранение...'} submitBtnDisabled={isSaving} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} />
        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} isOk={true} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;