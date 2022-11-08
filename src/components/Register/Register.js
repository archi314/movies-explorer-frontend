import "../ModalWindow/ModalWindow.css";
import headerLogo from "../../images/header_logo.svg";

import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="modal-window">
      <div className="modal-window__container">
        <Link to="/main-page" className="modal-window__link">
          <img
            className="modal-window__logo"
            src={headerLogo}
            alt="логотип"
          ></img>
        </Link>
        <h2 className="modal-window__title">Добро пожаловать!</h2>
        <form className="modal-window__content">
          <ul className="modal-window__input-list">
            <li className="modal-window__input-item">
              <p className="modal-window__label">Имя</p>
              <input
                className="modal-window__input"
                type="name"
                placeholder="Виталий"
                required
              />
            </li>
            <li className="modal-window__input-item">
              <p className="modal-window__label">E-mail</p>
              <input
                className="modal-window__input"
                type="email"
                placeholder="pochta@yandex.ru"
                required
              />
            </li>
            <li className="modal-window__input-item">
              <p className="modal-window__label">Пароль</p>
              <input
                className="modal-window__input"
                type="password"
                placeholder="password"
                required
              />
            </li>
          </ul>
          <button className="modal-window__button" type="submit">
            Зарегистрироваться
          </button>
          <p className="modal-window__paragraph">
            Уже зарегистрированы?
            <Link to="/signin" className="modal-window__link">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
