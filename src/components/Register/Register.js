import {useState} from 'react';

import "../ModalWindow/ModalWindow.css";
import headerLogo from "../../images/header_logo.svg";

import useFormValidation from '../../utils/useFormValidation'

import { Link } from "react-router-dom";

function Register({onRegister}) {

  const { values, handleChange, errors, isValid } = useFormValidation();
  const [submitError, setSubmitError] = useState('');
  const [isSubmitLocked, setSubmitLocked] = useState(false);

  const handleInputValue = (e) => {
    handleChange(e);
    setSubmitError('');
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setSubmitLocked(true);
    onRegister(values.name, values.email, values.password,  error => {
      setSubmitError(error);
      setSubmitLocked(false);
    });
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
        <h2 className="modal-window__title">Добро пожаловать!</h2>
        <form className="modal-window__content" onSubmit={handleSubmitForm} noValidate>
          <ul className="modal-window__input-list">
            <li className="modal-window__input-item">
              <p className="modal-window__label">Имя</p>
              <input
                className="modal-window__input"
                type="name"
                name="name"
                value={values.name || ""}
                onChange={handleInputValue}
                minLength="2"
                maxLength="30"
                pattern="^[A-Za-zА-Яа-я-\s]+$"
                placeholder="Виталий"
                required
              />
              <span className='modal-window__span modal-window__span_error'>{errors.name}</span>
            </li>
            <li className="modal-window__input-item">
              <p className="modal-window__label">E-mail</p>
              <input
                className="modal-window__input"
                type="email"
                name="email"
                value={values.email || ""}
                onChange={handleInputValue}
                placeholder="pochta@yandex.ru"
                pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                required
              />
              <span className="modal-window__span modal-window__span_error">{errors.email}</span>
            </li>
            <li className="modal-window__input-item">
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
            </li>
          </ul>
          <button className={`modal-window__button ${isSubmitLocked || !isValid ? "modal-window__button_disabled" : ""}`} type="submit" disabled={isSubmitLocked || !isValid ? true : ''}>
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
