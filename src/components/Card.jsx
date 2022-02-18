export default function Card({ data, onDeleteClick, onCardClick }) {

  function handleClick() {
    onCardClick(data);
  }

  return(
    <li className="element">
      <button type="button" className="element__delete-button" onClick={onDeleteClick}></button>
      <img src={data.link} alt={data.name} className="element__photo" onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__title">{data.name}</h2>
        <div className="element__like-container">
          <button type="button" className="element__like-button"></button>
          <span className="element__like-counter">{data.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
