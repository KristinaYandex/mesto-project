/*Объявления констант*/
/*Попапы*/
const popupProfile = document.querySelector('.popup-profile');
const popupPlace = document.querySelector('.popup-place');
const popupPhoto = document.querySelector('.popup-photo');
const popupAvatar = document.querySelector('.popup-avatar');
/*Форма попапа добавления карточки*/
const popupForm = popupPlace.querySelector('.popup__form');
/*Кнопка добавления карточи*/
const popupSubmitUser = popupProfile.querySelector('.popup__submit');
const popupSubmitCard = popupPlace.querySelector('.popup__submit');
const popupSubmitAvatar = popupAvatar.querySelector('.popup__submit');
/*Кнопки открытия попапов*/
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonAvatar = document.querySelector('.profile__avatar-button');
/*Кнопки закрытия попапов*/
const buttonCloseProfile = popupProfile.querySelector('.popup__close');
const buttonClosePlace = popupPlace.querySelector('.popup__close');
const buttonClosePhoto = popupPhoto.querySelector('.popup__close');
const buttonCloseAvatar = popupAvatar.querySelector('.popup__close');
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
const avataruserProfile = document.querySelector('.profile__avatar');
const nameValue = popupProfile.querySelector('.popup__user-name');
const jobValue = popupProfile.querySelector('.popup__user-job');
const avatarValue = popupAvatar.querySelector('.popup__user-avatar');
/*Добавление карточки через попап*/
const namePlaceInput = popupPlace.querySelector('.popup__place-name');
const linkPlaceInput = popupPlace.querySelector('.popup__place-photo');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
}

export { settings, popupProfile, popupPlace, popupPhoto, popupAvatar, popupForm, buttonEdit, buttonAdd, buttonAvatar, popupSubmitCard,
  buttonCloseProfile, buttonClosePlace, buttonClosePhoto, popupSubmitAvatar, popupSubmitUser, buttonCloseAvatar, cardContainer,
  userTemplate, namePlaceInput, linkPlaceInput, popupImage, popupDescription, nameuserProfile, jobuserProfile, avataruserProfile,
  nameValue, jobValue, avatarValue };
