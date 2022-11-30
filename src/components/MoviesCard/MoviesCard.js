import React, {useState} from 'react';

import "./MoviesCard.css";
import MainApi from "../../utils/MainApi";

function MoviesCard({ movie, name, duration, link, saved, changeFavouritesCount }) {

  const [isFavourite, setFavourite] = useState(movie.favourite);

  let durationTime = Math.floor(duration / 60);
  durationTime = (durationTime ? `${durationTime} ч ` : '') + `${duration % 60} м`;

  function handlerTrailerClick(e) {
    window.open(movie.trailerLink).focus();
  }

  const toggleButton = function(){
    if (saved || isFavourite) {
      MainApi.deleteMovie(movie.id).then(res => {
        setFavourite(false);
        changeFavouritesCount(-1);
      });
    } else {
      MainApi.addMovie({
        movieId: movie.id,
        country: movie.country,
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
        trailerLink: movie.trailerLink,
        year: movie.year,
        image: link,
        thumbnail: link
      }).then(res => {
        setFavourite(true);
        changeFavouritesCount(1);
      });
    }
  }

  return (!saved || isFavourite) ? (
    <li className="card">
      <img
          className="card__image"
          src={link}
          alt={name}
          onClick={handlerTrailerClick}
      ></img>
      <div className="card__content">
        <div className="card__paragraph-container" onMouseDown={handlerTrailerClick}>
          <h3 className="card__title">{name}</h3>
          <p className="card__duration"> {durationTime}</p>
        </div>

      {!saved ? <button className={`card__button ${isFavourite ? `card__heart-button_active` : `card__heart-button_inactive`}`} onClick={toggleButton} type="button"></button> : null}
      { saved ? <button className="card__button card__button_remove-icon" onClick={toggleButton} type="button"></button> : null}

      </div>
    </li>
  ) : null;
}

export default MoviesCard;
