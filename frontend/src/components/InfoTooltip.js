import React from "react";
import closeIcon from '../images/close_icon.png';
import checkIcon from '../images/check.png';
import crossImage from '../images/red_cross_icon.png';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  //console.log("InfoTooltip - isOpen:", isOpen); 
return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__register-content">
      <img
        className="popup__close-button"
        src={closeIcon}
        onClick={onClose} 
        id="close-image-button"
        alt="a close button"
      />
      <p className="popup__register-message">
        {isSuccess ? "¡Correcto! Ya estás registrado." : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
      </p>
      <img className="popup__register-check" 
      src={isSuccess ? checkIcon : crossImage}
      alt={isSuccess ? "check icon" : "error icon"}
      />
    </div>
  </div>
    )
}

export default InfoTooltip; 





 
