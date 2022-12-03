import "./BurgerMenu.css";
import { Link, NavLink } from "react-router-dom";
import moviesAccount from "../../images/icon_account.svg";

function BurgerMenu(props) {
  return (
    <nav
      className={`burger-menu ${props.burgerItems ? "burger-menu_active" : ""}`}
    >
      <ul className="burger-menu__list">
        <li>
          <NavLink to="/" className="burger-menu__link">
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className="burger-menu__link">
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink to="/saved-movies" className="burger-menu__link">
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <button
        className="burger-menu__profile-button"
        type="button"
        onClick={props.onClick}
      >
        <Link to="/profile" className="burger-menu__profile-link">
          Аккаунт
        </Link>
        <div className="burger-menu__logo-container">
          <img
            className="burger-menu__logo"
            src={moviesAccount}
            alt="логотип"
          />
        </div>
      </button>
    </nav>
  );
}

export default BurgerMenu;
