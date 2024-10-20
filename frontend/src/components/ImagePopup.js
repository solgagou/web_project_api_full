import React, { useEffect, useRef } from 'react';
import closeIcon from '../images/close_icon.png';

function ImagePopup({ name, link, isOpen, onClose }) {
  const popupRef = useRef(); 

 useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const closeOnClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', closeOnEscape);
      document.addEventListener('mousedown', closeOnClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('mousedown', closeOnClickOutside);
    };
  }, [isOpen, onClose]);
  
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
    <div class="popup__content" ref={popupRef}>
      <img
        className={"popup__close-button"}
        src={closeIcon}
        onClick={onClose} 
        id="close-image-button"
        alt="a close button"
      />
      <img className="popup__image" 
      src={link} 
      alt="Vista grande de una imagen seleccionada" />
      <h2 class="popup__title">{name}</h2>
    </div>
  </div>
    )
}

export default ImagePopup;