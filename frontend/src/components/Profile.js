import editIcon from '../images/avatar_edit_icon.png';
import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Profile(props) {
  const { currentUser } = React.useContext(CurrentUserContext);
  
  
return (
<main className="profile">
  <div className="profile__header">
    <div className="profile__photo">
      <img
      src={currentUser.avatar} 
      alt="Jack Cousteau with a red hat"
      className="profile__photo profile__avatar"
      />
      <img src={editIcon} className="profile__avatar-edit-icon" alt= "an edit icon" onClick={props.onEditAvatarClick} />
    </div>
    <div className="profile__data">
      <h1 className="profile__name">{currentUser.name}</h1>
      <button className="profile__edit-button" type="submit" onClick={props.onEditProfileClick}></button>
      <p className="profile__job">{currentUser.about}</p>
    </div>
    <button className="profile__add-button" type="submit" onClick={props.onAddPlaceClick}></button>
  </div>
  <div className="cards">
      {props.cards.map((card) => (
        <Card 
        key={card._id} 
        name={card.name} 
        link={card.link} 
        likes={card.likes}
        card={card} 
        onCardClick={props.onCardClick} 
        onCardLike={props.onCardLike}
        onCardDelete ={props.onCardDelete}
        />        
    ))}
    </div> 
</main>

 );
}

export default Profile;
