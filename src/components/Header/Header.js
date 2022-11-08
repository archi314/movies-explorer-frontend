import "./Header.css";
import { Link } from "react-router-dom";
import headerLogo from "../../images/header_logo.svg";
import NavAuth from "../NavAuth/NavAuth";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header(props) {
  return (
    <header className="header">
      <div
        className={`header__authorization ${
          props.loggedIn ? "header__authorization_active" : ""
        }`}
      >
        <div className="header__container">
          <Link to="/" className="header__link">
            <img
              className="header__logo header__logo_signed-out"
              src={headerLogo}
              alt="логотип"
            />
          </Link>
          <BurgerMenu
            burgerItems={props.burgerItems}
            onClick={props.openBurger}
          />
        </div>
        <button
          className={`header__burger ${
            props.burgerItems ? "header__burger_active" : ""
          }`}
          onClick={props.openBurger}
        >
          <span
            className={`${props.burgerItems ? "header__burger_active" : ""}`}
          ></span>
        </button>
      </div>
      <NavAuth loggedIn={props.loggedIn} onClick={props.openBurger} />
    </header>
  );
}

export default Header;
