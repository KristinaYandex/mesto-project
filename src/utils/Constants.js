export const formInfo = document.querySelector('#edit-profile');
export const formCard = document.querySelector('#add-card');
export const formAvatar = document.querySelector('#avatar-edit');
export const cardContainer = '.elements';
export const template = '#templates';

//Кнопки
export const buttons = {
    profile: document.querySelector('.profile__edit-button'),
    card: document.querySelector('.profile__add-button'),
    avatar: document.querySelector('.profile__avatar-button'),
    delete: document.querySelector('.element__trash')
}
//Попапы
export const popups = {
    profile: '.popup-profile',
    card: '.popup-place',
    avatar: '.popup-avatar',
    image: '.popup-photo'
}

//Селекторы
export const userProfile = {
  profileName: '.profile__name',
  profileAbout: '.profile__description',
  profileAvatar: '.profile__avatar'
}

//Пути
export const ways = {
    profile: '/users/me',
    cards: '/cards',
    cardsDelete: '/cards/',
    cardsLikes: '/cards/likes/',
    avatar: '/users/me/avatar'
}

//Информация с сервера
export const apiConfig = {
  url: 'https://nomoreparties.co/v1/plus-cohort-20',
    headers: {
        authorization: '9a34fda2-8e98-4dd6-868d-a04801378552',
        'Content-Type': 'application/json'
    }
}
//Формы и поля валидации
export const validationConfig = {
    formName: '.popup__form',
    inputName: '.popup__input',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_active',
    buttonName: '.popup__submit',
    buttonDisabledClass: 'popup__submit_inactive'
}




