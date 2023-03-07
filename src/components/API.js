import { createCard } from './card.JS'

/*Функция проверки ответа от сервера на корректность*/
function serverResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: '9a34fda2-8e98-4dd6-868d-a04801378552',
    "Content-Type": 'application/json',
  },
};

/*Запрос информации о пользователе*/
function getUserProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => serverResponse(res));
}

/*Обновление информации о пользователе*/
function updateUserProfile(nameuserProfile, jobuserProfile) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify ({
      name: nameuserProfile,
      about: jobuserProfile
    })
  })
  .then(res => serverResponse(res));
}

/*Запрос карточек с сервера*/
function getCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards', {
    method: 'GET',
    headers: {
      authorization: '9a34fda2-8e98-4dd6-868d-a04801378552'
    }
  })
  .then(res => serverResponse(res));
}

/*Добавление новой карточки*/
function addNewCard(elementImgPlace, elementTitle) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards', {
    method: 'POST',
    headers: {
      authorization: '9a34fda2-8e98-4dd6-868d-a04801378552',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      name: elementImgPlace,
      link: elementTitle
    })
  })
  .then(res => serverResponse(res));
}

/*Удаление карточек с сервера*/
function deleteCards(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => serverResponse(res));
}

/*Постановка лайка*/
function putLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => serverResponse(res));
}

/*Удалить лайк*/
function deleteLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => serverResponse(res));
}

export { updateUserProfile, getUserProfile, getCards, addNewCard, deleteCards, putLike, deleteLike };
