import './pages/index.css';

import { enableValidation, disableSubmitButton, hideInputError } from './components/validate.js'
import { openPopup, closePopup } from './components/modal.js'
import { handleFormSubmitMesto, createCard } from './components/card.js'
import { myAccount, settings, popupProfile, popupPlace, popupPhoto, popupForm, popupSubmit, buttonEdit, buttonAdd, buttonCloseProfile,
  buttonClosePlace, buttonClosePhoto, nameuserProfile, jobuserProfile, nameValue, jobValue, cardContainer } from './components/constants.js'
import { getUserProfile, updateUserProfile, getCards } from './components/API.js'

Promise.all([getUserProfile(), getCards()])
  .then(([users, cards]) => {
    nameuserProfile.textContent = users.name;
    jobuserProfile.textContent = users.about;
    myAccount.id = users._id;
    cards.forEach((card) => {
      cardContainer.prepend(createCard(card.link, card.name, card.likes, card._id, card.owner_id))
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль, если запрос неуспешный
  });

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
  return updateUserProfile(nameValue.value, jobValue.value)
    .then((obj) => {
      nameuserProfile.textContent = obj.name;
      jobuserProfile.textContent = obj.about;
      closePopup(popupProfile);
    })
    .then(res => serverResponse(res));
}

/*Редактирование информации о пользователе*/
popupProfile.addEventListener('submit', handleFormSubmitUser);
