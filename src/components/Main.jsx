import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api.js';
import Card from './Card.jsx';
import { currentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDeleteClick}) {

  const currentUserData = useContext(currentUserContext); // подписываемся на контекст

  return (
    <main className="main page__main">
      <section aria-label="блок с профилем пользователя" className="profile main__profile" >
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUserData.avatar})` }}  onClick={onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUserData.name}</h1>
          <p className="profile__job">{currentUserData.about}</p>
          <button id="profile__edit-button" type="button" className="profile__edit-button" onClick={onEditProfile}></button>
        </div>
        <button id="profile__add-button" type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section aria-label="блок с фото-карточками" className="elements">
        {/* <ul className="elements__list">
          {cards.map(card => {
            return(
              <Card key={card._id} data={card} onCardClick={onCardClick} onDeleteClick={onDeleteClick} />
            );
          })}
        </ul> */}
      </section>
    </main>
  );
}
