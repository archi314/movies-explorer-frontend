import "../MoviesCardList/MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import savedMovies from "../../utils/savedMovies";

function MoviesSavedCardList() {
  return (
    <section className="cards">
      <ul className="cards__list">
        {savedMovies.map((savedMovies) => (
          <MoviesCard key={savedMovies.id} movie={savedMovies} />
        ))}
      </ul>

      <div className="cards__button-container">
        <button className="cards__button" type="button" name="more">
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesSavedCardList;
