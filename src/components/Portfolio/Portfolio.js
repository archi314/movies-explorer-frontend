import './Portfolio.css';

function Portfolio (){
    return (
        <section className="portfolio">
            <h4 className="portfolio__title">Портфолио</h4>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a className="portfolio__item-link"
                       href="https://archi314.github.io/how-to-learn/"
                       target="_blank"
                       rel="noreferrer">
                        <p className="portfolio__name-of-work">Статичный сайт</p>
                        <div className="portfolio__icon">↗</div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__item-link"
                       href="https://archi314.github.io/russian-travel/"
                       target="_blank"
                       rel="noreferrer">
                        <p className="portfolio__name-of-work">Адаптивный сайт</p>
                        <div className="portfolio__icon">↗
                        </div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__item-link"
                       href="https://artemstukalov.nomoredomains.icu"
                       target="_blank"
                       rel="noreferrer">
                        <p className="portfolio__name-of-work">Одностраничное приложение</p>
                        <div className="portfolio__icon">↗</div>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
