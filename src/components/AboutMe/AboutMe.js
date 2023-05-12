import "./AboutMe.css";
import avatar from "../../images/about-me_avatar.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="about-me__student">Студент</h3>
      <div className="about-me__profile">
        <div className="about-me__info">
          <h3 className="about-me__title">Артем</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 27 лет</p>
          <p className="about-me__description">
            Я родился и живу в Липецке, закончил факультет международных
            отношений. Есть огромное желание стать Фронтенд-разработчиком и
            делать красивые и функциональные веб приложения.
          </p>
          <a
            className="about-me__github-link"
            href="https://github.com/archi314"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={avatar} alt="avatar" className="about-me__avatar" />
      </div>
    </section>
  );
}

export default AboutMe;
