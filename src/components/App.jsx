import React, { useState, useEffect } from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import avatar from '../images/avatar.png';
import api from '../utils/api.js';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import ImagePopup from './ImagePopup.jsx';
import Main from './Main.jsx';
import EditProfilePopup from './EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import AcceptDeleteCardPopup from './AcceptDeleteCardPopup.jsx';
import Loader from './Loader.jsx';

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
  // данные для удалённой карточки
  const [cardDelete, isCardDelete] = useState({});
  // данные пользователя
  const [currentUser, setCurrentUser] = useState({ name: 'Имя пользователя', about: 'О пользователе', avatar: avatar});
  // карточки
  const [cards, setCards] = useState([]);
  // лоадер
  const [isLoader, setLoader] = React.useState(false);

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

  // функция открытия на полный экран картинки
  function handleCardClick(data) {
    setSelectedCard(data)
  }

   // функция слушатель на клик по корзинке, чтобы открыть попап
  function handleDeleteCardClick(data) {
    isCardDelete(data)
    setIsDeletePopupOpen(true);
  }

  // ф-ция управляет удалением карточки
  function handleDeleteCard() {
    setLoader(true);
    api.deleteCard(cardDelete)
      .then(() => {
        setCards((state) => state.filter(item => item._id !== cardDelete._id))
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setLoader(false))
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

  // отправка данных пользователя на сервер
  function handleUpdateUser(info) {
    setLoader(true);
    api.setUserInfo(info)
    .then((newInfo) => { setCurrentUser(newInfo) })
    .then(() => { closeAllPopups() })
    .catch(err => console.log(err))
    .finally(() => setLoader(false))
  }

  // отправка аватара пользователя на сервер
  function handleUpdateAvatar(input) {
    setLoader(true);
    api.setUserAvatar(input)
    .then(newInfo => { setCurrentUser(newInfo) })
    .then(() => { closeAllPopups() })
    .catch(err => console.log(err))
    .finally(() => setLoader(false))
  }

  // отправка новой карточки и обновление стейта
  function handleAddPlace(data) {
    setLoader(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoader(false))
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
          onCardDelete={handleDeleteCardClick}
          onCardLike={handleCardLike} />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <AcceptDeleteCardPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          isAccept={handleDeleteCard} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
        <Loader isOpen={isLoader}/>
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
