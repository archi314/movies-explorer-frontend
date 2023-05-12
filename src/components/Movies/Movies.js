import React, { useEffect, useState, useMemo } from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import MoviesApi from '../../utils/MoviesApi';
import MainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

import useWindowResize from "../../utils/useWindowResize";
import {littleSizeScreen, mediumSizeScreen} from "../../utils/constants";

function Movies ({onlyFavouriteMovies}) {
  const [isReady, setReady] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [windowWidth] = useWindowResize([0]);

  const [movies, setMovies] = useState([]);
  const [moviesFirstPage, setMoviesFirstPage] = useState(12);
  const [moviesNextPage, setMoviesNextPage] = useState(3);
  const [moviesPerPage, setMoviesPerPage] = useState(moviesFirstPage);
  const [searchString, setSearchString] = useState(typeof localStorage.searchString === 'undefined' ? '' : localStorage.searchString);
  const [onlyShortMovies, setOnlyShortMovies] = useState(localStorage.onlyShortMovies === 'true');
  const [searchStringFavourites, setSearchStringFavourites] = useState('');
  const [onlyShortMoviesFavourites, setOnlyShortMoviesFavourites] = useState(false);
  const [hideShowMore, setHideShowMore] = useState(false);

  const searchStringFinal = onlyFavouriteMovies ? searchStringFavourites : searchString;
  const onlyShortMoviesFinal = onlyFavouriteMovies ? onlyShortMoviesFavourites : onlyShortMovies;

  const handleShowMoreMovies = () => {
    setMoviesPerPage(moviesPerPage + moviesNextPage);
  }

  const handleChangeSearchString = (e) => {
    e.preventDefault();
    const inputString = e.target.querySelector(".search-form__input").value.toLowerCase();
    if (onlyFavouriteMovies) {
      setSearchStringFavourites(inputString);
      return false;
    }
    localStorage.searchString = inputString;
    localStorage.removeItem('resultMovies');
    setSearchString(inputString);
    return false;
  }

  const handleMoviesShort = (e) => {
    const shortMovies = e.target.checked;
    if (onlyFavouriteMovies) {
      setOnlyShortMoviesFavourites(shortMovies);
      return;
    }
    localStorage.onlyShortMovies = shortMovies;
    localStorage.removeItem('resultMovies');
    setOnlyShortMovies(shortMovies);
  }

  const changeFavourites = (movieId, favourite) => {
    function updateFavourites(moviesArray) {
      return moviesArray.map(movie => {
        if (movie.id === movieId) {
          movie.favourite = favourite;
        }
        return movie;
      });
    }
    setMovies(updateFavourites(movies));
    if (localStorage.resultMovies) {
      try {
        const moviesFilter = JSON.parse(localStorage.resultMovies);
        if (typeof moviesFilter === 'object' && moviesFilter.constructor.name === 'Array' && moviesFilter.length) {
          localStorage.resultMovies = JSON.stringify(updateFavourites(moviesFilter));
        }
      } catch (e) {
        console.log("Ошибка восстановления результатов запроса: " + e);
      }
    }
  }

  useEffect(() => {
    if (onlyFavouriteMovies) {
      setSearchStringFavourites('');
      setOnlyShortMoviesFavourites(false);
    }
  }, [onlyFavouriteMovies]);

  useEffect(() => {
    if (windowWidth > mediumSizeScreen) {
      setMoviesFirstPage(12);
      setMoviesNextPage(3);
    } else if (windowWidth > littleSizeScreen) {
      setMoviesFirstPage(8);
      setMoviesNextPage(2);
    } else {
      setMoviesFirstPage(5);
      setMoviesNextPage(2);
    }
    setMoviesPerPage(moviesFirstPage);
  }, [windowWidth, moviesFirstPage]);

  const moviesToRender = useMemo(function () {
    let moviesFilter = [];
    if (onlyFavouriteMovies){
      moviesFilter = movies.filter((movie) => {
        return movie.favourite === true;
      });
    } else if (localStorage.resultMovies) {
      try {
        moviesFilter = JSON.parse(localStorage.resultMovies);
      } catch (e) {
        console.log("Ошибка восстановления результатов запроса: " + e);
      }
    }
    if (!onlyFavouriteMovies && (typeof moviesFilter !== 'object' || moviesFilter.constructor.name !== 'Array' || moviesFilter.length === 0)) {
      localStorage.removeItem('resultMovies');
      moviesFilter = movies;
    }
    if (onlyFavouriteMovies || !localStorage.resultMovies) {
      moviesFilter = moviesFilter.filter((movie) => {
        return movie.nameEN.toLowerCase().includes(searchStringFinal) || movie.nameRU.toLowerCase().includes(searchStringFinal)
      });
      if (onlyShortMoviesFinal){
        moviesFilter = moviesFilter.filter((movie) => {
          return movie.duration <= 40
        });
      }
      if (!onlyFavouriteMovies) {
        localStorage.resultMovies = moviesFilter.length ? JSON.stringify(moviesFilter) : '';
      }
    }
    setHideShowMore(moviesFilter.length===0 || moviesFilter.length<=moviesPerPage);
    return moviesFilter.slice(0, moviesPerPage);
  }, [moviesPerPage, movies, searchStringFinal, onlyShortMoviesFinal, onlyFavouriteMovies]);


  useEffect(() => {
    if (!isReady) {
      if (!onlyFavouriteMovies && localStorage.resultMovies) {
        setReady(true);
        return;
      }
      setLoading(true);
    }
    let handler = async favourites => {
      let data = [];
      if (localStorage.allMovies) {
        try {
          data = JSON.parse(localStorage.allMovies);
        } catch (e) {
          console.log(e);
        }
      }
      if (typeof data !== 'object' || data.constructor.name !== 'Array' || data.length === 0) {
        localStorage.removeItem('allMovies');
        data = await MoviesApi.getMovies();
        localStorage.allMovies = data.length ? JSON.stringify(data) : '';
      }
      data = data.map(movie => {
        movie.favourite = favourites.findIndex(favourite => {return movie.id === favourite.movieId}) > -1;
        return movie;
      });
      setMovies(data);
      if (!isReady) {
        setLoading(false);
      }
      setReady(true);
    }
    if (!movies.length) {
      MainApi.getMovies().then(handler).catch(() => {
        handler([]);
      });
    }
  }, [isReady, onlyFavouriteMovies, movies.length]);


    return (
        <section>
            <SearchForm
              searchString={searchStringFinal}
              onlyShortMovies={onlyShortMoviesFinal}
              handleChangeSearchString={handleChangeSearchString}
              handleMoviesShort={handleMoviesShort}
              onlyFavouriteMovies={onlyFavouriteMovies}
            />
            {isLoading ? <Preloader /> : <MoviesCardList
              movies={moviesToRender}
              handleShowMoreMovies={handleShowMoreMovies}
              hideShowMore={hideShowMore}
              onlyFavouriteMovies={onlyFavouriteMovies}
              changeFavourites={changeFavourites}
            />}
        </section>
    );
}

export default Movies;
