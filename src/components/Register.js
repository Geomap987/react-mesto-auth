import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InfoToolTip from './InfoToolTip.js';
import check from '../images/Blackcheck.svg';
import * as auth from '../utils/auth.js';

const Register = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const history = useHistory();
  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);



  function handleInfoToolTip() {
    setInfoToolTipOpen(!isInfoToolTipOpen)
  }

  function closeInfoToolTipPush() {
    setInfoToolTipOpen(false);
    history.push('/sign-in');
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
    const { email, password } = data;
    auth.register(password, email).then((res) => {
      console.log(res.status)
      if (res.status !== 400) {
        handleInfoToolTip();

      } else {
        setMessage('Что-то пошло не так!');
      }
    })
  }


  return (
    <div className="register">

      <p className="register__welcome">
        Регистрация
        </p>
      <p className="register__error">
        {message}
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <input className="register__input" id="email" name="email" type="email" value={data.email} onChange={handleChange} placeholder="Email" />
        <input className="register__input" id="password" name="password" type="password" value={data.password} onChange={handleChange} placeholder="Пароль" />
        <div className="register__button-container">
          <button type="submit" className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">Войти</Link>
      </div>
      <InfoToolTip title={'Вы успешно зарегистрировались!'} image={check} isOpen={isInfoToolTipOpen} onClose={closeInfoToolTipPush}></InfoToolTip>
    </div>
  )
}

export default Register;
