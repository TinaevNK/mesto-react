export default function Card(props) {

  function handleClick() {
    props.onCardClick(props.data);
  }

  return(
    <li className="element">
      <button type="button" className="element__delete-button" onClick={props.onDeleteClick}></button>
      <img src={props.data.link} alt={props.data.name} className="element__photo" onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__title">{props.data.name}</h2>
        <div className="element__like-container">
          <button type="button" className="element__like-button"></button>
          <span className="element__like-counter">{props.data.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
