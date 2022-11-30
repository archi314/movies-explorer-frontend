class MainApi {
  constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
  }

  async _returnResult(result) {
      if (result.ok) {
          return result.json();
      }
      const json = await result.json();
      return Promise.reject(`${json.message || `Произошла ошибка: ${result.statusText}`}`);
  }

  register(name, email, password) {
      return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email, password}),
      }).then(this._returnResult);
  }

  login(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
      }).then(this._returnResult);
  }

  signout() {
      return fetch(`${this._baseUrl}/signout`, {
          method: 'GET',
          credentials: 'include',
          headers: this._headers,
      }).then(this._returnResult);
  }

  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          credentials: 'include',
          headers: this._headers,
      })
        .then(this._returnResult);
  }

  sendUserInfo({name, email}) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify({
              name: name,
              email: email,
          })
      })
      .then(this._returnResult);
  };

  getMovies() {
      return fetch(`${this._baseUrl}/movies`, {
          method: 'GET',
          credentials: 'include',
          headers: this._headers
      })
      .then(this._returnResult);
  }

  addMovie(data) {
      return fetch(`${this._baseUrl}/movies`, {
          method: 'POST',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify(data),
      })
      .then(this._returnResult);
  }

  deleteMovie(movieId) {
      return fetch(`${this._baseUrl}/movies/${movieId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: this._headers,
      })
      .then(this._returnResult);
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://artemst.nomoredomains.icu/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Credentials": true,
  },
});

export default mainApi;
