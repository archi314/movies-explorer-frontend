import SearchForm from "../SearchForm/SearchForm";
import MoviesSavedCardList from "../MoviesSavedCardList/MoviesSavedCardList";

function SavedMovies() {
  return (
    <section>
      <SearchForm />
      <MoviesSavedCardList />
    </section>
  );
}

export default SavedMovies;
