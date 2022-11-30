class MoviesApi {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
      return fetch(`${this._url}/beatfilm-movies`, {
          method: 'GET',
          headers: this._headers,
      }).then(this._checkResponse);
  }
}

export default new MoviesApi('https://api.nomoreparties.co');
