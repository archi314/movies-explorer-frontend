import './PageNotFound.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <section className="not-found">
            <div className="not-found__container">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__paragraph">Страница не найдена</p>
            </div>
            <Link to="/" className="not-found__link">Назад</Link>
        </section>
    );
};

export default PageNotFound;
