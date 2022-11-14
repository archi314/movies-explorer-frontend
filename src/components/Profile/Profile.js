import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <form className="profile__modal-window">
        <h3 className="profile__title">Привет, Виталий!</h3>
        <div className="profile__container">
          <p className="profile__paragraph">Имя</p>
          <div className="profile__area profile__area_name">
            <input className="profile__placeholder" placeholder="Виталий" />
          </div>
          <div className="profile__area profile__area_email">
            <input
              className="profile__placeholder"
              placeholder="pochta@yandex.ru"
            />
          </div>
          <p className="profile__paragraph">E-mail</p>
        </div>
        <button className="profile__button">Редактировать</button>
        <button className="profile__link" type="button">
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
