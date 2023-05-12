import "../BurgerMenu/BurgerMenu.css";

import "./NavigationMenu.css";
import { Link } from "react-router-dom";

function NavigationMenu() {
  return (
      <ul className="navigation-menu__list">
        <li>
          <Link to="/" className="navigation-menu__link navigation-menu__link_invisible">
            Главная
          </Link>
        </li>
        <li>
          <Link to="/movies" className="navigation-menu__link">
            Фильмы
          </Link>
        </li>
        <li>
          <Link to="/saved-movies" className="navigation-menu__link">
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
  );
}

export default NavigationMenu;
