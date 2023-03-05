/*Объявления констант*/
/*Попапы*/
const popupProfile = document.querySelector('.popup-profile');
const popupPlace = document.querySelector('.popup-place');
const popupPhoto = document.querySelector('.popup-photo');
/*Форма попапа добавления карточки*/
const popupForm = popupPlace.querySelector('.popup__form');
/*Кнопка добавления карточи*/
const popupSubmit = popupPlace.querySelector('.popup__submit');
/*Кнопки открытия попапов*/
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
/*Кнопки закрытия попапов*/
const buttonCloseProfile = popupProfile.querySelector('.popup__close');
const buttonClosePlace = popupPlace.querySelector('.popup__close');
const buttonClosePhoto = popupPhoto.querySelector('.popup__close');
/*Добавление карточек начальное*/
const cardContainer = document.querySelector('.elements');
const userTemplate = document.querySelector('#templates').content;
/*Открытие карточек*/
const popupCardImage = popupPhoto.querySelector('.popup__card-image');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupDescription = popupPhoto.querySelector('.popup__description');
/*Редактирование информации о пользователе*/
const nameuserProfile = document.querySelector('.profile__name');
const jobuserProfile = document.querySelector('.profile__description');
const nameValue = popupProfile.querySelector('.popup__user-name');
const jobValue = popupProfile.querySelector('.popup__user-job');
/*Добавление карточки через попап*/
const namePlaceInput = popupPlace.querySelector('.popup__place-name');
const linkPlaceInput = popupPlace.querySelector('.popup__place-photo');
const myAccount = document.querySelector('.profile');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
}

export { myAccount, settings, popupProfile, popupPlace, popupPhoto, popupForm, buttonEdit, buttonAdd, popupSubmit, buttonCloseProfile, buttonClosePlace, buttonClosePhoto,
  cardContainer, userTemplate, namePlaceInput, linkPlaceInput, popupImage, popupDescription, nameuserProfile, jobuserProfile, nameValue, jobValue };
