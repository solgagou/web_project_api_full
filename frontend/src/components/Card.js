import React from 'react';
import trashIcon from '../images/trash_icon.png';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ _id, name, link, likes, card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`);
   
    function handleClick() {
      onCardClick(card);  
    } 

    function handleLikeClick() {
      onCardLike(card);
    }

    function handleDeleteClick() {
 
      onCardDelete(card);
    }

    return(
        <div className="card" key={_id} card={card}>
          <div
            className="card__image" 
            style={{ backgroundImage: `url(${link})` }}
            onClick={handleClick}
            />
          <img
            className={cardDeleteButtonClassName}
            src={trashIcon}
            onClick={handleDeleteClick}
            id="delete-button"
            alt="an image of a trash can"
          />
          <div className="card__info">
            <p className="card__title">{name}</p>
            <div className="card-like-content">
              <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
              </button>
              <span className= "card__like-number">{likes.length}</span>
            </div>
          </div>
        </div>
        )
    }




export default Card;