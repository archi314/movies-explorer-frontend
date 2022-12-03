import '../../src/components/Page/Page.css';

import React from "react";
import { useState, useEffect } from "react";
import {Switch, Route, useHistory, useLocation} from "react-router-dom";

import Header from './Header/Header';
import Main from "./Main/Main";

import Movies from "./Movies/Movies";
import Footer from './Footer/Footer';

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Register from "./Register/Register";
import Login from './Login/Login'
import Profile from "./Profile/Profile";
import PageNotFound from "./PageNotFound/PageNotFound";
import MainApi from "../utils/MainApi";
import { Redirect } from 'react-router-dom';


function App() {
  const [burgerItems, setBurgerItems] = useState(false);
  const openBurger = () => setBurgerItems(!burgerItems);
  const {pathname} = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt') ? true : false);
  const history = useHistory();

  const protectedLoginPages = ['/movies', '/saved-movies', '/profile'];
  const protectedGuestPages = ['/signin', '/signup'];

  useEffect(() => {
    function signOut() {
      MainApi.signout().then(() => {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('allMovies');
        localStorage.removeItem('resultMovies');
        localStorage.removeItem('searchString');
        localStorage.removeItem('onlyShortMovies');
      }).catch((err) =>  {
        console.log(err);
      });
    }
    if (!localStorage.jwt) {
      signOut();
      return;
    }
    MainApi
      .getUserInfo()
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch((err) => {
        signOut();
        console.log(err);
      });
  }, [loggedIn, pathname]);

  /** Регистрация нового пользователя */

  const handleRegister = (name, email, password, onError = () => {}) => {
    return MainApi
      .register(name, email, password)
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
        onError(err);
        history.push("/signup");
      });
  };

  /** Авторизация пользователя */

  const handleLogin = ( email, password, onError = () => {} ) => {
    return MainApi
      .login(email, password)
      .then((res) => {
        setLoggedIn(true);
        localStorage.jwt = res.token;
        MainApi.setToken(res.token);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
        onError(err);
      });
  };

  function signOut(onError = () => {}) {
    return MainApi.signout()
    .then((res) => {
      setLoggedIn(false);
      localStorage.removeItem('jwt');
      localStorage.removeItem('allMovies');
      localStorage.removeItem('resultMovies');
      localStorage.removeItem('searchString');
      localStorage.removeItem('onlyShortMovies');
      history.push("/signin");
    })
    .catch((err) =>  {
      console.log(err);
      onError(err);
    });
  };

  function updateProfile(data, onSuccess = () => {}, onError = () => {}) {
    MainApi.sendUserInfo(data).then(user => {
      setCurrentUser(user);
      onSuccess();
    })
    .catch((err) =>  {
      console.log(err);
      onError(err);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__content">
        <Switch>
          <Route exact path="/">
            <Header
              loggedIn={loggedIn}
            />
            <main>
              <Main/>
            </main>
            < Footer/>
          </Route>
          {!(protectedLoginPages.includes(pathname) || protectedGuestPages.includes(pathname)) ?
          <Route exact path="*">
            <main>
              <PageNotFound/>
            </main>
          </Route> : null}
        </Switch>
        {(protectedGuestPages.includes(pathname) && loggedIn) ? <Redirect to="/"/> :
        <Switch>
          <Route exact path="/signin">
            <main>
              <Login
                onLogin={handleLogin}
              />
            </main>
          </Route>
          <Route exact path="/signup">
            <main>
              <Register
                onRegister={handleRegister}
              />
            </main>
          </Route>
        </Switch>}
          {(!protectedLoginPages.includes(pathname) || loggedIn) ?
        <Switch>
          <Route exact path="/movies">
            <Header
              loggedIn={loggedIn}
              burgerItems={burgerItems}
              openBurger={openBurger}
            />
            <main>
              <Movies
                onlyFavouriteMovies={false}
              />
            </main>
            <Footer/>
          </Route>
          <Route exact path="/saved-movies">
            <Header
              loggedIn={loggedIn}
              burgerItems={burgerItems}
              openBurger={openBurger}
            />
            <main>
              <Movies
                onlyFavouriteMovies={true}
              />
            </main>
            <Footer/>
          </Route>
          <Route exact path="/profile">
            <Header
              loggedIn={loggedIn}
              burgerItems={burgerItems}
              openBurger={openBurger}
            />
            <main>
              <Profile
                onUpdateProfileData={updateProfile}
                onProfileExit={signOut}
              />
            </main>
          </Route>
        </Switch> : <Redirect to="/"/>}

      </div>
    </div>
    </CurrentUserContext.Provider>
    );
}

export default App;
