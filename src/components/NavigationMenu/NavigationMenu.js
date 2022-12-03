import "../BurgerMenu/BurgerMenu.css";

import "./NavigationMenu.css";
import { NavLink } from "react-router-dom";

function NavigationMenu() {
  return (
      <ul className="navigation-menu__list">
        <li>
          <NavLink to="/" className="navigation-menu__link navigation-menu__link_invisible">
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className="navigation-menu__link">
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink to="/saved-movies" className="navigation-menu__link">
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
  );
}

export default NavigationMenu;
