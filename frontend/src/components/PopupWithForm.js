import React, { useEffect, useRef } from 'react';
import closeIcon from '../images/close_icon.png';

function PopupWithForm(props) {
    const popupRef = useRef();

    useEffect(() => {
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                props.onClose();
            }
        };

        const closeOnClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                props.onClose();
            }
        };

        if (props.isOpen) {
            document.addEventListener('keydown', closeOnEscape);
            document.addEventListener('mousedown', closeOnClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', closeOnEscape);
            document.removeEventListener('mousedown', closeOnClickOutside);
        };
    }, [props.isOpen, props.onClose]);

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container" ref={popupRef}>
                <form className="form popup__form" id={`${props.name}-form`} onSubmit={props.onSubmit}>
                    <img
                        src={closeIcon}
                        className="form form_close-button"
                        id={`close-${props.name}-form`}
                        alt="Cerrar"
                        onClick={props.onClose}
                    />
                    <h2 className="form form__title">{props.title}</h2>
                    {props.children}
                    <button
                        className={`form form__submit-button ${props.isDisabled ? 'form__submit-button_disabled' : ''}`}
                        type="submit"
                        disabled={props.isDisabled}
                    >
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;