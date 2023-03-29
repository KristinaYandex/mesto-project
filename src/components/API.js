export default class Api {
  constructor(options) {
    this._url = options.baseUrl,
    this._headers = options.headers
  }

  /*Функция проверки ответа от сервера на корректность*/
  serverResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  /*Запрос информации о пользователе*/
  getUserProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this.serverResponse(res));
  }
  /*Обновление информации о пользователе*/
  updateUserProfile(nameuserProfile, jobuserProfile) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: nameuserProfile,
        about: jobuserProfile
      })
    })
    .then(res => this.serverResponse(res));
  }
  /*Обновление аватара*/
  updateUserAvatar(avataruserProfile) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: avataruserProfile
      })
    })
    .then(res => this.serverResponse(res));
  }
  /*Запрос карточек с сервера*/
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => this.serverResponse(res));
  }
  /*Добавление новой карточки*/
  addNewCard(elementImgPlace, elementTitle) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
        name: elementImgPlace,
        link: elementTitle
      })
    })
    .then(res => this.serverResponse(res));
  }
  /*Удаление карточек с сервера*/
  deleteCards(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this.serverResponse(res));
  }
  /*Постановка лайка*/
  putLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this.serverResponse(res));
  }
  /*Удалить лайк*/
  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this.serverResponse(res));
  }
}
