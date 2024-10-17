import React from 'react';
import PopupWithForm from './PopupWithForm'; 

function AddPlacePopup({isOpen, onClose, onAddPlaceSubmit}) {
  const placeRef = React.createRef('');

  function handleSubmit(e) {
    e.preventDefault();
     onAddPlaceSubmit({
      name: placeRef.current.form[0].value,  
      link: placeRef.current.value  
    });
  }


return(
<PopupWithForm
          name="addcard-form"
          title="Nuevo lugar"
          isOpen={isOpen}
          onClose={onClose}
          buttonText="Crear"
          onSubmit={handleSubmit} 
      > 
          
          <input
            className="form form__input"
            type="text"
            id="input-title"
            required
            placeholder="Titulo"
            minLength="2"
            maxLength="40"
            defaultValue=""
            name= "name" />
           <span className="input-title-error form__input-error"></span>
          
          <input
            className="form form__input"
            type="url"
            id="input-url"
            required
            placeholder="Enlace a la imagen"
            minLength="2"
            defaultValue=""
            name= "link"
            ref={placeRef} />
            <span className="input-url-error form__input-error"></span>
      </PopupWithForm>  
)
}

export default AddPlacePopup;