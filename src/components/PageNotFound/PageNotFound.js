import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <section className="not-found">
            <div className="not-found__container">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__paragraph">Страница не найдена</p>
            </div>
            <span onClick={() => {window.history.back()}} className="not-found__link">Назад</span>
        </section>
    );
};

export default PageNotFound;
