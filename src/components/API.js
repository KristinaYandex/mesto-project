export default class Api {
  constructor(data) {
      this._config = data.apiConfig;
      this._ways = data.ways;
  }

//Функция ответа
  _parseResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(new Error(`Ошибка - ${res.status}`));
  }

//Функция получения данных
  _getData(way, method, id = '') {
      return fetch(`${this._config.url}${way}${id}`, {
          method: method,
          headers: this._config.headers
      })
          .then(res =>this._parseResponse(res));
  };

//Функция создания
  _createData(way, formInfo, method) {
      return fetch(`${this._config.url}${way}`, {
          method: method,
          headers: this._config.headers,
          body: JSON.stringify(formInfo)
      })
          .then(res =>this._parseResponse(res));
  };

  getUser() {
      return this._getData(this._ways.profile, 'GET');
  }

  getCards() {
      return this._getData(this._ways.cards, 'GET');
  }

  deleteCard(id) {
      return this._getData(this._ways.cardsDelete, 'DELETE', id);
  }

  changeProfile(data) {
      return this._createData(this._ways.profile, data, 'PATCH');
  }

  createCard(data) {
      return this._createData(this._ways.cards, data, 'POST');
  }

  createAvatar(data) {
      return this._createData(this._ways.avatar, data, 'PATCH');
  }

  deleteLike(id) {
      return this._getData(this._ways.cardsLikes, 'DELETE', id);
  }

  addLike(id) {
      return this._getData(this._ways.cardsLikes, 'PUT', id);
  }
}




