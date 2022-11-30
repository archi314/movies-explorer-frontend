import {useState} from 'react';

import "../ModalWindow/ModalWindow.css";
import headerLogo from "../../images/header_logo.svg";

import  useFormValidation   from '../../utils/useFormValidation'

import { Link } from "react-router-dom";

function Login({onLogin}) {

  const { values, handleChange, errors, isValid } = useFormValidation();
  const [submitError, setSubmitError] = useState('');

  const handleInputValue = (e) => {
    handleChange(e);
    setSubmitError('');
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onLogin(values.email, values.password, setSubmitError);
  }

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
        <form className="modal-window__content" name="modal-window-login" onSubmit={handleSubmitForm} noValidate>
          <div className="modal-window__input-list">
            <label className="modal-window__item">
              <p className="modal-window__label">E-mail</p>
              <input
                className="modal-window__input"
                type="email"
                placeholder="pochta@yandex.ru"
                name="email"
                value={values.email || ""}
                required
                onChange={handleInputValue}
              />
              <span className="modal-window__span modal-window__span_error">{errors.email}</span>
            </label>
            <label className="modal-window__item">
              <p className="modal-window__label">Пароль</p>
              <input
                className="modal-window__input"
                type="password"
                name="password"
                value={values.password || ""}
                onChange={handleInputValue}
                placeholder="password"
                required
              />
              <span className="modal-window__span modal-window__span_error">{errors.password || submitError}</span>
            </label>
          </div>
          <button className={`modal-window__button ${isValid ? "" : "modal-window__button_disabled"}`} type="submit" disabled={!isValid ? true : ''}>
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
