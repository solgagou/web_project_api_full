import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as auth from "../utils/auth.js";

const Login = ({ handleLoginClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
      
   
    try {
      const data = await auth.login(email, password); 
      if (data.token) {
          localStorage.setItem('jwt', data.token);

          setEmail('');
          setPassword('');

          await handleLoginClick(); 
      } else {
          console.error('No se recibió el token en la respuesta');
      }
  } catch (err) {
      console.error('Error al iniciar sesión:', err.message || err);
      alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
  }
};

   return (
        <>
        <div className= "login">
          <h1 className="login__title">Inicia sesión</h1>
          <form className="login__form" onSubmit={handleSubmit}>
              <input
                className="form form__input"
                type="email"
                id="input-email"
                required
                placeholder="Correo electrónico"
                minLength="5"
                maxLength="50"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <span className="form__input-error input-name-error"></span>
              <input
                className="form form__input"
                 type="password"
                 id="input-password"
                 required
                 placeholder="Contraseña"
                 minLength="8"
                 maxLength="30"
                 name="password"
                 value={password}
                 onChange={handleChange}
              />
               <span className="form__input-error input-job-error"></span>
            <div className="login__footer">
                 <button className="login__button" type="submit">Inicia sesión</button>
                 <button className="footer__register-link" type="button" onClick={() => navigate('/signup')}> ¿Aún no eres miembro? Regístrate aquí</button>
               </div>
            </form>
            </div> 
        </>
      );
    }
  
  
  export default Login;