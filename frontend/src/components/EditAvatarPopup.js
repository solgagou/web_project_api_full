import React from 'react';
import PopupWithForm from './PopupWithForm'; 

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = React.createRef('');
   
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
      }

return(
    <PopupWithForm
        name="profile-avatar-popup"
        title= "Cambiar foto de perfil"
        buttonText="Guardar"
        isOpen={isOpen} 
        onClose={onClose}   
        onSubmit={handleSubmit}
        onUpdateAvatar={onUpdateAvatar}    
    > 

    <input
    className="form form__input"
    type="url"
    id="input-profile-avatar"
    required
    placeholder="http://somewebsite.com/someimage.jpg"
    minLength="2"
    ref={avatarRef}
    name="avatar"
    />
    <span className="form__input-error input-profile-avatar-error"></span>
    </PopupWithForm>
    )
}

export default EditAvatarPopup;