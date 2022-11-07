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
          <Route path="/main-page">
            <Header
              loggedIn={pathname === '/main-page' ? false : true}
            />
            <Main/>
            < Footer/>
          </Route>
          <Route path="/movies">
            <Header
              loggedIn={pathname === '/main-page' ? false : true}
              burgerItems={burgerItems}
              openBurger={openBurger}
            />
            <Movies/>
            <Footer/>
          </Route>
          <Route path="/saved-movies">
            <Header
              loggedIn={pathname === '/main-page' ? false : true}
              burgerItems={burgerItems}
              openBurger={openBurger}
            />
              <SavedMovies/>
            <Footer/>
          </Route>
          <Route path="/signin">
            <Login/>
          </Route>
          <Route path="/signup">
            <Register/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/not-found">
            <PageNotFound/>
          </Route>
        </Switch>
      </div>
    </div>
    );
}

export default App;
