import React, {useEffect, useState} from 'react';

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies, handleShowMoreMovies, hideShowMore, onlyFavouriteMovies, changeFavouritesCount}) {
  return (
    <section className="cards">

      {movies.length>0? <ul className="cards__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            name={movie.nameRU}
            link={`https://api.nomoreparties.co${movie.image.url}`}
            duration={movie.duration}
            saved={onlyFavouriteMovies}
            changeFavouritesCount={changeFavouritesCount}
          />
        ))}
      </ul>: <p className='cards__not-found'>Ничего не найдено</p>}

      {hideShowMore? null : <div className="cards__button-container" onClick={handleShowMoreMovies}>
        <button className="cards__button" type="button" name="following">
          Ещё
        </button>
      </div>}
    </section>
  );
}

export default MoviesCardList;
