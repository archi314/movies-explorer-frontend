import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__list">
        <li className="about-project__item">
          <h3 className="about-project-stage__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project-stage__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__item">
          <h3 className="about-project-stage__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project-stage__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__time">
        <li className="about-project__time-item about-project__time-item_green">
          <h3 className="about-project__time-title about-project__time-title_black-color">1 неделя</h3>
        </li>
        <li className="about-project__time-item about-project__time-item_grey">
          <h3 className="about-project__time-title">4 недели</h3>
        </li>
        <li className="about-project__time-item">
          <p className="about-project__time-profession">Back-end</p>
        </li>
        <li className="about-project__time-item">
          <p className="about-project__time-profession">Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;

