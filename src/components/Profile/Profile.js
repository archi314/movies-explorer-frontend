import "./Profile.css";

import { useContext, useState, useEffect } from "react";
import  useFormValidation   from '../../utils/useFormValidation'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function Profile({onUpdateProfileData, onProfileExit}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = useFormValidation();
  const [checkUser, setCheckUser] = useState(false);
  const [nameError, setNameError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitString, setSubmitString] = useState('Редактировать');

  useEffect(() => {
    values.name = values.name || currentUser.name;
    values.email = values.email || currentUser.email;

    if (checkUser && values.name === currentUser.name && values.email === currentUser.email) {
      setNameError('Имя совпадает с предыдущим');
      setSubmitError('Email совпадает с предыдущим');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleInputValue = (e) => {
    handleChange(e);
    setNameError('');
    setSubmitError('');
    setCheckUser(true);
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    onUpdateProfileData({
      name: values.name,
      email: values.email,
    }, () => {
      setCheckUser(false);
      setSubmitString('Сохранено');
      setTimeout(() => {
        setSubmitString('Редактировать');
      }, 2000);
    }, setSubmitError);
  }

  const buttonDisabled = submitError.length > 0 ? true : !isValid;

  return (
    <section className="profile">
      <form className="profile__modal-window" onSubmit={handleSubmitForm}>
        <h3 className="profile__title">Привет, {currentUser?.name}!</h3>
        <div className="profile__container">
          <label className="profile__area profile__area_name">
            <p className="profile__paragraph">Имя</p>
            <input
              className="profile__input"
              type="name"
              name="name"
              pattern="^[A-Za-zА-Яа-я-\s]+$"
              required
              onChange={handleInputValue}
              defaultValue={currentUser?.name}
              formNoValidate
            />

          </label>
          <span className='profile__span profile__span_error'>{errors.name || nameError}</span>
          <label className="profile__area profile__area_email">
            <p className="profile__paragraph">E-mail</p>
            <input
              className="profile__input"
              type="email"
              name="email"
              pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
              required
              defaultValue={currentUser?.email}
              onChange={handleInputValue}
              formNoValidate
            />
          </label>
          <div className="profile__area">
          <span className='profile__span profile__span_error'>{errors.email || submitError}</span>
          </div>
        </div>
        <button className={`profile__button ${buttonDisabled ? "profile__button_disabled" : ""}`} type="submit" disabled={buttonDisabled ? true : ''}>{submitString}</button>
        <button className="profile__link" type="button" onClick={onProfileExit}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
