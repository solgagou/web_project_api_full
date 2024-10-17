import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logo from '../images/logo_around.png'
import headerLine from '../images/line.jpg'


function Header({ handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  let sessionState;
  if (location.pathname === '/signin') {
      sessionState = (
        <button 
        className="header__register-link" 
        onClick={() => navigate('/signup')}
      >Regístrate</button>
      );
  } else if (location.pathname === '/signup') {
      sessionState = (
         <button
         className="header__login-link"
         onClick={() => navigate('/signin')}
      >Iniciar sesión</button>
      );
  } else if (location.pathname === '/users/me') {
      sessionState = (
         <div className="header__session-state">
          <p className="header__user-email">{currentUser?.email}</p> 
          <button
          className="logout__button"
          onClick={handleLogout} 
        >Cerrar sesión</button>
        </div>
      );                
  }

  return (
  <header className="header">
    <img src={logo} className="header__logo" alt="Around logo" />
    {sessionState}
    <img src={headerLine} className="header__line" alt="a line" />
  </header>
  );

}

export default Header;