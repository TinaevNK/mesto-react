export default function ImagePopup(props) {
  return(
    <div id="popup-picture" className={`popup popup_opasity-high ${props.card.link && 'popup_opened'}`}>
      <figure className="popup__picture-container">
        <img className="popup__photo" alt="описание картинки" src={props.card.link}/>
        <button type="button" className="popup__close-button popup__close-button_general" onClick={props.onClose}></button>
        <figcaption className="popup__photo-name">{props.card.name}</figcaption>
      </figure>
    </div>
  )
}
