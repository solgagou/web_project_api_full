import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import * as auth from "../utils/auth.js";

const Register = ({ onRegisterClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        auth.register(email, password)
            .then(() => {
                    setError("");
                    //console.log("Llamando a onRegisterClick con true");
                    onRegisterClick(true); 
                    navigate("/signin");
            })
            .catch(err => {
                setError("Error al registrarse: " + err.message);
                //console.log("Llamando a onRegisterClick con false");
                onRegisterClick(false);
            });
    };

    return (
        <>
            <div className="register">
                
                <main className="register__main">
                    <h1 className="register__title">Regístrate</h1>
                    <form className="register__form" onSubmit={handleSubmit}>
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
                            minLength="20"
                            maxLength="64"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                        <span className="form__input-error input-job-error">{error}</span>
                        <div className="register__footer">
                            <button className="register__button" type="submit">Regístrate</button>
                            <Link to="login" className="footer__login-link"> ¿Ya eres miembro? Inicia sesión aquí</Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
};

export default Register;