import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <form className="search-form__content">
        <div className="search-form__container">
          <input
            className="search-form__input"
            placeholder="Фильм"
            type="text"
            required
          />
          <button type="submit" className="search-form__button"></button>
        </div>
        <div className="search-form__toggle">
          <label className="search-form__checkbox-container">
            <input className="search-form__checkbox" type="checkbox" />
            <div className="search-form__slider" />
          </label>
          <p className="search-form__paragraph">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
