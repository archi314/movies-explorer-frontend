import '../../src/components/Page/Page.css';

import React from "react";
import { useState } from "react";
import {Switch, Route, useLocation} from "react-router-dom";

import Header from './Header/Header';
import Main from "./Main/Main";

import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Footer from './Footer/Footer';

import Register from "./Register/Register";
import Login from './Login/Login'
import Profile from "./Profile/Profile";
import PageNotFound from "./PageNotFound/PageNotFound";

function App() {
  const [burgerItems, setBurgerItems] = useState(false);
  const openBurger = () => setBurgerItems(!burgerItems);
  const {pathname} = useLocation();

  return (
    <div className="page">
      <div className="page__content">
        <Switch>
          <Route exact path="/">
            <Header
              loggedIn={pathname === '/' ? false : true}
            />
            <Main/>
            < Footer/>
          </Route>
          <Route exact path="/movies">
            <Header
              loggedIn={pathname === '/' ? false : true}
              burgerItems={burgerItems}
              openBurger={openBurger}
            />
            <Movies/>
            <Footer/>
          </Route>
          <Route exact path="/saved-movies">
            <Header
              loggedIn={pathname === '/' ? false : true}
              burgerItems={burgerItems}
              openBurger={openBurger}
            />
              <SavedMovies/>
            <Footer/>
          </Route>
          <Route exact path="/signin">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Register/>
          </Route>
          <Route exact path="/profile">
            <Profile/>
          </Route>
          <Route exact path="/page-not-found">
            <PageNotFound/>
          </Route>
        </Switch>
      </div>
    </div>
    );
}

export default App;
