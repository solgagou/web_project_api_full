import React from 'react';
import PopupWithForm from './PopupWithForm'; 
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name || '');
  const [description, setDescription] = React.useState(currentUser.about || '');
  
  React.useEffect(() => {
    if (isOpen) {
        setName(currentUser.name || ''); 
        setDescription(currentUser.about || ''); 
    }
}, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  
  return(
    <PopupWithForm name="popup-profile" title="Editar perfil" buttonText="Guardar"
          isOpen={isOpen} 
          onClose={onClose}   
          onSubmit={handleSubmit}
          onUpdateUser={onUpdateUser}
        > 

          <input
            className="form form__input"
            type="text"
            id="input-name"
            required
            placeholder="Nombre"
            minLength="2"
            maxLength="40"
            name= "name"
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
          <span className="form__input-error input-name-error"></span>
          <input
            className="form form__input"
            type="text"
            id="input-job"
            required
            placeholder="Acerca de"
            minLength="2"
            maxLength="200"
            about= "job"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <span className="form__input-error input-job-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;