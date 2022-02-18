import React from 'react';
import { useState } from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import ImagePopup from './ImagePopup.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);


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

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onDeleteClick={handleDeleteClick} />
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
    </div>
  );
}

export default App;
