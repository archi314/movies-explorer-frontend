import React, {useContext, useEffect, useState} from 'react';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import MoviesApi from '../../utils/MoviesApi';
import MainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

import useWindowResize from "../../utils/useWindowResize";

function Movies ({onlyFavouriteMovies}) {
  const [isReady, setReady] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [windowWidth] = useWindowResize([0]);

  const [movies, setMovies] = useState([]);
  const [favouritesCount, setFavouritesCount] = useState(0);
  const [moviesOnePage, setMoviesOnePage] = useState(12);
  const [moviesPerPage, setMoviesPerPage] = useState(moviesOnePage);
  const [searchString, setSearchString] = useState('');
  const [hideShowMore, setHideShowMore] = useState(false);
  const [onlyShortMovies, setOnlyShortMovies] = useState(false);

  const handleShowMoreMovies = () => {
    setMoviesPerPage(moviesPerPage + moviesOnePage);
  }

  const handleChangeSearchString = (e) => {
    e.preventDefault();
    setSearchString(e.target.querySelector(".search-form__input").value.toLowerCase());
    return false;
  }

  const handleMoviesShort = (e) => {
    setOnlyShortMovies(e.target.checked);
  }

  const changeFavouritesCount = (changeCount) => {
    setFavouritesCount(favouritesCount + changeCount);
  }

  useEffect(() => {
    if (windowWidth > 768) {
      setMoviesOnePage(12);
    } else if (windowWidth > 480) {
      setMoviesOnePage(8);
    } else {
      setMoviesOnePage(5);
    }
    setMoviesPerPage(moviesOnePage);
  }, [windowWidth, moviesOnePage]);

  const moviesToRender = React.useMemo(function () {
    let moviesFilter = movies.filter((movie) => {
      return movie.nameEN.toLowerCase().includes(searchString) || movie.nameRU.toLowerCase().includes(searchString)
    })
    if (onlyFavouriteMovies){
      moviesFilter=moviesFilter.filter((movie) => {
        return movie.favourite === true;
      })
    }
    if (onlyShortMovies){
      moviesFilter=moviesFilter.filter((movie) => {
        return movie.duration<=40
      })
    }
    setHideShowMore(moviesFilter.length===0 || moviesFilter.length<=moviesPerPage);
    return moviesFilter.slice(0, moviesPerPage);
  }, [moviesPerPage, movies, searchString, onlyShortMovies, onlyFavouriteMovies]);


  useEffect(() => {
    if (!isReady) {
      setLoading(true);
    }
    let handler = favourites => {
      MoviesApi.getMovies()
        .then(data => {
        data = data.map(movie => {
          movie.favourite = favourites.findIndex(favourite => {return movie.id === favourite.movieId}) > -1;
          return movie;
        });
        setMovies(data);
        setFavouritesCount(favourites.length);
        if (!isReady) {
          setLoading(false);
        }
        setReady(true);
      })
    }
    MainApi.getMovies().then(handler).catch(() => {
      handler([]);
    });
  }, [isReady, favouritesCount])


    return (
        <section>
            <SearchForm
              handleChangeSearchString={handleChangeSearchString}
              handleMoviesShort={handleMoviesShort}
            />
            {isLoading ? <Preloader /> : <MoviesCardList
              movies={moviesToRender}
              handleShowMoreMovies={handleShowMoreMovies}
              hideShowMore={hideShowMore}
              onlyFavouriteMovies={onlyFavouriteMovies}
              changeFavouritesCount={changeFavouritesCount}
            />}
        </section>
    );
}

export default Movies;
