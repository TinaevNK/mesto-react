import React from 'react';
import avatar from '../images/avatar.png';
import api from '../utils/api.js';
import Card from './Card.js';

export default function Main(props) {

  const [userName, setUserName] = React.useState('Имя пользователя');
  const [userDescription, setUserDescription] = React.useState('О пользователе');
  const [userAvatar, setUserAvatar] = React.useState(avatar);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.renderUserAndCards()
      .then(([user, data]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(data);
      })
      .catch((err) => {console.log(err)})
  }, []);

  return (
    <main className="main page__main">
      <section aria-label="блок с профилем пользователя" className="profile main__profile" >
        <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}  onClick={props.onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__job">{userDescription}</p>
          <button id="profile__edit-button" type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
        </div>
        <button id="profile__add-button" type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section aria-label="блок с фото-карточками" className="elements">
        <ul className="elements__list">
          {cards.map(card => {
            return(
              <Card key={card._id} data={card} onCardClick={props.onCardClick} onDeleteClick={props.onDeleteClick} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
