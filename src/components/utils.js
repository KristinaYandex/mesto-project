import { popupPlace, popupProfile, cardContainer, namePlaceInput, linkPlaceInput, nameuserProfile, jobuserProfile, nameValue, jobValue } from './constants.js'
import { createCard } from './card.js'
import { closePopup } from './modal.js'

/*Функции, которые используются в работе сразу нескольких других функций*/

/*Добавление карточки через попап*/
function handleFormSubmitMesto(evt) {
  evt.preventDefault();

  cardContainer.prepend(createCard(namePlaceInput.value, linkPlaceInput.value));

  closePopup(popupPlace);
  evt.target.reset();
}

/*Редактирование информации о пользователе*/
function handleFormSubmitUser(evt) {
  evt.preventDefault();

  nameuserProfile.textContent = nameValue.value;
  jobuserProfile.textContent =  jobValue.value;

  closePopup(popupProfile);
  evt.target.reset();
}

export { handleFormSubmitMesto, handleFormSubmitUser };
