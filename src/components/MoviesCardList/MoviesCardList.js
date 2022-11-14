import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import movies from "../../utils/movies";

function MoviesCardList() {
  return (
    <section className="cards">
      <ul className="cards__list">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </ul>

      <div className="cards__button-container">
        <button className="cards__button" type="button" name="following">
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
