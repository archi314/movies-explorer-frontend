import "./BurgerMenu.css";
import { Link } from "react-router-dom";
import moviesAccount from "../../images/icon_account.svg";

function BurgerMenu(props) {
  return (
    <nav
      className={`burger-menu ${props.burgerItems ? "burger-menu_active" : ""}`}
    >
      <ul className="burger-menu__list">
        <li>
          <Link to="/" className="burger-menu__link">
            Главная
          </Link>
        </li>
        <li>
          <Link to="/movies" className="burger-menu__link">
            Фильмы
          </Link>
        </li>
        <li>
          <Link to="/saved-movies" className="burger-menu__link">
            Сохранённые фильмы
          </Link>
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
