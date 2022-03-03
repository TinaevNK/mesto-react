import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import ImagePopup from './ImagePopup.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import avatar from '../images/avatar.png';

function App() {
  // стейты:
  // открытие попапа редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // открытития попапа добавления карточек
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // открытие попапа смены аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // открытие попапа карточки на полный экран
  const [selectedCard, setSelectedCard] = useState({});
  // открытие попапа удаления карточки
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  // данные пользователя
  const [currentUser, setCurrentUser] = useState({ name: 'Имя пользователя', about: 'О пользователе', avatar: avatar});
  // карточки
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // рендер информации о пользователе
    api.getUserInfo()
    .then(userInfo => { setCurrentUser(userInfo) })
    .catch(err => { console.log(err) })

    // рендер карточек
    api.getInitialCards()
    .then(cards => { setCards(cards) })
    .catch(err => { console.log(err) })
  }, [])


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
  }

  function handleCardClick(data) {
    setSelectedCard(data)
  }

  function handleDeleteClick() {
    setIsDeletePopupOpen(true);
  }
  // функция постановки и снятия лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.setLike(card)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err))
    } else {
      api.deleteLike(card)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className="page">
      <currentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDeleteClick={handleDeleteClick}
          onCardLike={handleCardLike} />
        <Footer />

        {/* попап редактирования профиля */}

        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__info">
            <label className="popup__label">
              <input type="text" placeholder="Имя" name="name" defaultValue="" id="name" minLength="2" maxLength="40" required className="popup__input" />
              <span className="popup__error" id="name-error"></span>
            </label>
            <label className="popup__label">
              <input type="text" placeholder="О себе" name="about" defaultValue="" id="about" minLength="2" maxLength="200" required className="popup__input" />
              <span className="popup__error" id="about-error"></span>
            </label>
          </fieldset>
        </PopupWithForm>

        {/* попап добавления карточки */}

        <PopupWithForm name="create-card" title="Новое место" submitText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__info">
            <label className="popup__label">
              <input type="text" placeholder="Название" name="name" defaultValue="" id="create-card__title" minLength="2" maxLength="30" required className="popup__input" />
              <span className="popup__error" id="create-card__title-error"></span>
            </label>
            <label className="popup__label">
              <input type="url" placeholder="Ссылка на картинку" name="link" defaultValue="" id="create-card__link" required className="popup__input" />
              <span className="popup__error" id="create-card__link-error"></span>
            </label>
          </fieldset>
        </PopupWithForm>

        {/* попап обновления аватарки */}

        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__info">
            <label className="popup__label">
              <input type="url" placeholder="Ссылка на изображение" name="avatar" defaultValue="" id="avatar__link" required className="popup__input" />
              <span className="popup__error" id="avatar__link-error"></span>
            </label>
          </fieldset>
        </PopupWithForm>

        {/* попап удаления карточки */}

        <PopupWithForm name="delete-card" title="Вы уверены?" submitText="Да" isOpen={isDeletePopupOpen} onClose={closeAllPopups}/>

        {/* попап просмотра карточки */}

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
