import { initialCards, popupPhoto, popupPlace, userTemplate, popupImage, popupDescription, cardContainer, namePlaceInput, linkPlaceInput } from './constants.js'
import { openPopup, closePopup } from './modal.js'

/*Функция добавления карточек*/
function createCard(name, link) {
  const userElement = userTemplate.querySelector('.element').cloneNode(true);
  const elementImgPlace = userElement.querySelector('.element__img-place');
  userElement.querySelector('.element__title').textContent = name;
  elementImgPlace.src = link;
  elementImgPlace.alt = name;

/*Лайки карточек*/
  const likes = userElement.querySelector('.element__heart');
  likes.addEventListener('click', function() {
    likes.classList.toggle('element__heart_active');
  });

/*Удаление карточек*/
  const cardDelete = userElement.querySelector('.element__trash');
  cardDelete.addEventListener('click', function() {
    const part = cardDelete.closest('.element');
    part.remove();
  });

/*Открытие карточек*/
  elementImgPlace.addEventListener('click', function() {
    popupImage.src = link;
    popupImage.alt = name;
    popupDescription.textContent = name;
    openPopup(popupPhoto);
  });

  return userElement;
};

/*Добавление карточки через попап*/
function handleFormSubmitMesto(evt) {
  evt.preventDefault();

  cardContainer.prepend(createCard(namePlaceInput.value, linkPlaceInput.value));

  closePopup(popupPlace);
  evt.target.reset();
}

initialCards.forEach(function (item) {
  cardContainer.append(createCard(item.name, item.link));
});

export { handleFormSubmitMesto };
