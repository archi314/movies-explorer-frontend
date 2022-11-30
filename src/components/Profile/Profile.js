import "./Profile.css";

import { useContext, useState, useEffect } from "react";
import  useFormValidation   from '../../utils/useFormValidation'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function Profile({onUpdateProfileData, onProfileExit}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = useFormValidation();
  const [submitError, setSubmitError] = useState('');

  const handleInputValue = (e) => {
    handleChange(e);
    setSubmitError('');
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    onUpdateProfileData({
      name: values.name || currentUser.name,
      email: values.email || currentUser.email,
    }, setSubmitError);
  }

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
              placeholder={currentUser?.name}
              onChange={handleInputValue}
            />

          </label>
          <span className='profile__span profile__span_error'>{errors.name}</span>
          <label className="profile__area profile__area_email">
            <p className="profile__paragraph">E-mail</p>
            <input
              className="profile__input"
              type="email"
              name="email"
              placeholder={currentUser?.email}
              onChange={handleInputValue}
            />
          </label>
          <div className="profile__area">
          <span className='profile__span profile__span_error'>{errors.email || submitError}</span>
          </div>
        </div>
        <button className="profile__button" type="submit">Редактировать</button>
        <button className="profile__link" type="button" onClick={onProfileExit}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
