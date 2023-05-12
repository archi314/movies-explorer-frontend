import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie }) {
  const { pathname } = useLocation();

  return (
    <li className="card">
      <img
          className="card__image"
          src={`${movie.image}`}
          alt={movie.title}
      ></img>
      <div className="card__content">
        <div className="card__paragraph-container">
          <h3 className="card__title">{movie.title}</h3>
          <p className="card__duration"> {movie.duration}</p>
        </div>
        {pathname === "/saved-movies" ? (
          <button
            type="button"
            className="card__button card__button_remove-icon"
          />
        ) : (
          <button
            type="button"
            className={`card__button card__heart-button_active`}
          />
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
