import './pages/index.css';

import { enableValidation } from './components/validate.js'
import { openPopup, closePopup } from './components/modal.js'
import { handleFormSubmitMesto, handleFormSubmitUser } from './components/utils.js'
import { settings, popupProfile, popupPlace, popupPhoto, buttonEdit, buttonAdd, buttonCloseProfile, buttonClosePlace, buttonClosePhoto } from './components/constants.js'

/*Вызов функции enableValidation*/
enableValidation(settings);

/*Функции открытия попапов*/
buttonEdit.addEventListener('click', function() {
  openPopup(popupProfile);
});

buttonAdd.addEventListener('click', function() {
  openPopup(popupPlace);
});

/*Функции закрытия попапов*/
buttonCloseProfile.addEventListener('click', function() {
  closePopup(popupProfile);
});

buttonClosePlace.addEventListener('click', function() {
 closePopup(popupPlace);
});

buttonClosePhoto.addEventListener('click', function() {
 closePopup(popupPhoto);
});

popupProfile.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popupProfile);
  }
});

document.addEventListener('keydown', (evt) => {
if (evt.key == 'Escape') {
  closePopup(popupProfile);
}
});

popupPlace.addEventListener('mousedown', (evt) => {
if (evt.target.classList.contains('popup_opened')) {
  closePopup(popupPlace);
}
});

document.addEventListener('keydown', (evt) => {
if (evt.key == 'Escape') {
  closePopup(popupPlace);
}
});

popupPhoto.addEventListener('mousedown', (evt) => {
if (evt.target.classList.contains('popup_opened')) {
  closePopup(popupPhoto);
}
});

document.addEventListener('keydown', (evt) => {
if (evt.key == 'Escape') {
  closePopup(popupPhoto);
}
});

/*Редактирование информации о пользователе*/
popupProfile.addEventListener('submit', handleFormSubmitUser);

/*Добавление карточки через попап*/
popupPlace.addEventListener('submit', handleFormSubmitMesto);
