export default function PopupWithForm(props) {

  return(
    <div id={`popup-${props.name}`} className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form id={`popup-${props.name}__form`} name={`${props.name}-popup`} noValidate className="popup__form">
          {props.children}
          <button id={`popup-${props.name}__save-button`} type="submit" className="popup__save-button">
            {props.submitText}
          </button>
          <button type="button" className="popup__close-button popup__close-button_general" onClick={props.onClose}></button>
        </form>
      </div>
    </div>
  );
}
