import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { setToken } from '../utils/token';
import * as auth from '../utils/auth.js';
import InfoToolTip from './InfoToolTip.js';
import cross from '../images/Redcross.svg';

const Login = ({ handleLogin }) => {
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);
    const history = useHistory();

    function handleInfoToolTip() {
        setInfoToolTipOpen(!isInfoToolTipOpen)
    }

    function closeInfoToolTip() {
        setInfoToolTipOpen(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, username } = data;

        if (!password || !username) {
            return;
        }

        auth.authorize(password, username)
            .then((data) => {
                console.log(data)
                if (!data) {
                    setMessage('Что-то пошло не так! Попробуйте еще раз.')
                    handleInfoToolTip()
                }
                else {
                    setToken(data.token);
                    setData({ password: '', username: '' });
                    setMessage('');
                    handleLogin(data.token);
                    history.push('/');
                }
            })
            .catch(err => { console.log(err); handleInfoToolTip() });
    }

    return (
        <div onSubmit={handleSubmit} className="login">

            <p className="login__welcome">
                Вход
            </p>
            <form className="login__form">
                <input className="login__input" id="username" required name="username" type="text" value={data.username} onChange={handleChange} placeholder="Email" />
                <input className="login__input" id="password" required name="password" type="password" value={data.password} onChange={handleChange} placeholder="Пароль" />
                <div className="login__button-container">
                    <button type="submit" className="login__link">Войти</button>
                </div>
            </form>
            <div className="login__signup">
                <p>Ещё не зарегистрированы?</p>
                <Link to="/sign-up" className="signup__link">Зарегистрироваться</Link>
            </div>
            <InfoToolTip title={message} image={cross} isOpen={isInfoToolTipOpen} onClose={closeInfoToolTip} ></InfoToolTip>
        </div>
    )
}

export default Login;
