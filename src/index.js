import './pages/index.css';

import { enableValidation, disableSubmitButton /*hideInputError*/ } from './components/validate.js'
import { openPopup, closePopup, onClickByOverlay } from './components/modal.js'
import { handleFormSubmitMesto, createCard } from './components/card.js'
import { settings, popupProfile, popupPlace, popupPhoto, popupAvatar, buttonEdit, buttonAdd, buttonAvatar, popupForm, popupSubmitCard, buttonCloseProfile, popupSubmitUser, popupSubmitAvatar,
  buttonClosePlace, buttonClosePhoto, buttonCloseAvatar, nameuserProfile, jobuserProfile, avataruserProfile, nameValue, jobValue, avatarValue, cardContainer } from './components/constants.js'
import { getUserProfile, updateUserProfile, getCards, updateUserAvatar } from './components/api.js'

let myProfile;
Promise.all([getUserProfile(), getCards()])
  .then(([users, cards]) => {
    nameuserProfile.textContent = users.name;
    jobuserProfile.textContent = users.about;
    avataruserProfile.src = users.avatar;
    myProfile = users._id;
    cards.reverse().forEach((card) => {
      cardContainer.prepend(createCard(card.link, card.name, card.likes, card.owner._id, card._id))
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль, если запрос неуспешный
  });

/*Вызов функции enableValidation*/
enableValidation(settings);

/*Добавление карточки через попап*/
popupPlace.addEventListener('submit', handleFormSubmitMesto);

/*Редактирование информации о пользователе*/
function handleFormSubmitUser() {
  popupSubmitUser.textContent = "Сохранение...";
  return updateUserProfile(nameValue.value, jobValue.value)
    .then((res) => {
      nameuserProfile.textContent = res.name;
      jobuserProfile.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(popupProfile);
      popupSubmitUser.textContent = "Сохранить";
    });
}

/*Редактирование информации о пользователе*/
popupProfile.addEventListener('submit', handleFormSubmitUser);

/*Редактирование аватарки*/
function handleFormSubmitAvatar() {
  popupSubmitAvatar.textContent = "Сохранение...";
  return updateUserAvatar(avatarValue.value)
    .then((res) => {
      avataruserProfile.src = res.avatar;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupSubmitAvatar.textContent = "Сохранить";
    });
}

/*Редактирование аватарки*/
popupAvatar.addEventListener('submit', handleFormSubmitAvatar);

export { myProfile };

/*Функции открытия попапов*/
buttonEdit.addEventListener('click', function() {
  openPopup(popupProfile);
  nameValue.value = nameuserProfile.textContent;
  jobValue.value = jobuserProfile.textContent;
  /*hideInputError(popupProfile, settings);*/
});

buttonAdd.addEventListener('click', function() {
  openPopup(popupPlace);
  disableSubmitButton(settings, popupSubmitAvatar);
  popupForm.reset();
  /*hideInputError(popupPlace, settings);*/
});

buttonAvatar.addEventListener('click', function() {
  openPopup(popupAvatar);
  avatarValue.value = avatarValue.src;
  disableSubmitButton(settings, popupSubmitAvatar);
  /*hideInputError(popupAvatar, settings);*/
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

buttonCloseAvatar.addEventListener('click', function() {
  closePopup(popupAvatar);
 });

/*Закрытие по клику на оверлей*/
 popupProfile.addEventListener('mousedown', onClickByOverlay);

 popupPlace.addEventListener('mousedown', onClickByOverlay);

 popupPhoto.addEventListener('mousedown', onClickByOverlay);

 popupAvatar.addEventListener('mousedown', onClickByOverlay);
