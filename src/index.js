import './pages/index.css';

import { enableValidation, disableSubmitButton, hideInputError } from './components/validate.js'
import { openPopup, closePopup } from './components/modal.js'
import { handleFormSubmitMesto } from './components/card.js'
import { settings, popupProfile, popupPlace, popupPhoto, popupForm, popupSubmit, buttonEdit, buttonAdd, buttonCloseProfile,
  buttonClosePlace, buttonClosePhoto, nameuserProfile, jobuserProfile, nameValue, jobValue } from './components/constants.js'


/*Вызов функции enableValidation*/
enableValidation(settings);

/*Функции открытия попапов*/
buttonEdit.addEventListener('click', function() {
  openPopup(popupProfile);
});

buttonAdd.addEventListener('click', function() {
  disableSubmitButton(settings, popupSubmit);
  hideInputError(popupPlace, settings);
  popupForm.reset();
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


popupPlace.addEventListener('mousedown', (evt) => {
if (evt.target.classList.contains('popup_opened')) {
  closePopup(popupPlace);
}
});


popupPhoto.addEventListener('mousedown', (evt) => {
if (evt.target.classList.contains('popup_opened')) {
  closePopup(popupPhoto);
}
});

/*Добавление карточки через попап*/
popupPlace.addEventListener('submit', handleFormSubmitMesto);

/*Редактирование информации о пользователе*/
function handleFormSubmitUser(evt) {
  evt.preventDefault();

  nameuserProfile.textContent = nameValue.value;
  jobuserProfile.textContent =  jobValue.value;

  closePopup(popupProfile);
}

/*Редактирование информации о пользователе*/
popupProfile.addEventListener('submit', handleFormSubmitUser);
