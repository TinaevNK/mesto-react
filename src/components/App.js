import React from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);


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
    setSelectedCard({name: '', link: ''}); // можно было установить null но тогда бы в самом компоненте пришлось писать несколько раз одно и тоже условие сравнения, посчитал это более верным
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
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onDeleteClick={handleDeleteClick} />
      <Footer />

      {/* попап редактирования профиля */}

      <PopupWithForm name="edit" title="Редактировать профиль" submitText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
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

      <PopupWithForm name="avatar" title="Обновить аватар" submitText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
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

// в инпутах поменял value на defaultValue для скрытия ошибки в консоли. В дальнейшем уберу, надеюсь верное решение)
// добавил также открытие/закрытие попапа удаления карточки (если пока не нужно - удалю)
// ещё думал что можно убрать из html в папке public, но пока только фавикон заменил, остальное там не очень понял как работает
