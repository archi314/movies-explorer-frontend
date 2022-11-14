import { Link } from "react-router-dom";
import headerLogo from "../../images/header_logo.svg";

function NavAuth(props) {
  return (
    <nav
      className={`header__signed-out ${
        props.loggedIn ? "" : "header__signed-out_active"
      }`}
    >
      <Link to="/" className="header__link">
        <img
          className="header__logo header__logo_signed-out"
          src={headerLogo}
          alt="логотип"
        />
      </Link>
      <ul className="header__container header__container_signed-out">
        <li>
          <Link to="/signup" className="header__link header__link_signed-out">
            Регистрация
          </Link>
        </li>
        <li>
          <button
            className="header__login-button"
            type="button"
            onClick={props.onClick}
          >
            <Link
              to="/signin"
              className="header__profile-link header__profile-link_black"
            >
              Войти
            </Link>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavAuth;
