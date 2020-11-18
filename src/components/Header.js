import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';


function Header({ userEmail, buttonLink, handleClick, buttonText }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место. Россия" />
            <div className="header__container">
                <p className="header__email">{userEmail}</p>
                <Link to={buttonLink} className="header__button" onClick={handleClick}>{buttonText}</Link>
            </div>
        </header>
    );
}

export default Header;