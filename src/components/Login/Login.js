import "../ModalWindow/ModalWindow.css";
import headerLogo from "../../images/header_logo.svg";

import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="modal-window">
      <div className="modal-window__container">
        <Link to="/" className="modal-window__link">
          <img
            className="modal-window__logo"
            src={headerLogo}
            alt="логотип"
          ></img>
        </Link>
        <h2 className="modal-window__title">Рады видеть!</h2>
        <form className="modal-window__content" name="modal-window-login">
          <div className="modal-window__input-list">
            <label className="modal-window__item">
              <p className="modal-window__label">E-mail</p>
              <input
                className="modal-window__input"
                type="email"
                placeholder="pochta@yandex.ru"
                required
              />
            </label>
            <label className="modal-window__item">
              <p className="modal-window__label">Пароль</p>
              <input
                className="modal-window__input"
                type="password"
                placeholder="password"
                required
              />
            </label>
          </div>
          <button className="modal-window__button" type="submit">
            Войти
          </button>
          <p className="modal-window__paragraph">
            Ещё не зарегистрированы?
            <Link to="/signup" className="modal-window__link">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
