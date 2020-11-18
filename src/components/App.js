import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import { getToken } from '../utils/token';

import Header from './Header.js';
import Mesto from './Mesto.js';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register.js';
import Login from './Login.js';

import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';
import { UserDataContext } from '../contexts/UserDataContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({email: ''});
  const history = useHistory();

  const handleLogin = () => {
    tokenCheck();
  }

  const tokenCheck = () => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth.getContent(jwt).then((res) => {
      if (res) {
        const userData = {
          email: res.data.email
        }
        setLoggedIn(true);
        setUserData(userData);
        history.push('/')
      }
    });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    api.getUserInfo().then(
      (res) => {
        const info = res;
        setCurrentUser(info)
      }).catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    api.getCardList().then(
      (res) => {
        const items = res
        setCards(items)
      }).catch((err) => console.log(err));
  }, [])

  return (
    <UserDataContext.Provider value={userData}>
      <CurrentUserContext.Provider value={currentUser}>
        <CardContext.Provider value={cards}>
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Mesto} />
            <Route path="/sign-up">
              <div className="page">
                <Header userEmail={``} buttonLink={`/sign-in`} buttonText={`Войти`} />
                <Register />
              </div>
            </Route>
            <Route path="/sign-in">
              <div className="page">
                <Header userEmail={``} buttonLink={`/sign-up`} buttonText={`Регистрация`} />
                <Login handleLogin={handleLogin} />
              </div>
            </Route>
            <Route exact path="/">
              <Mesto />
            </Route>
          </Switch>
        </CardContext.Provider>
      </CurrentUserContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;
