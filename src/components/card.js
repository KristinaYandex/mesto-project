import { popupPhoto, popupPlace, userTemplate, popupImage, popupDescription, cardContainer, namePlaceInput, linkPlaceInput, popupSubmitCard } from './constants.js'
import { openPopup, closePopup } from './modal.js'
import { addNewCard, deleteCards, putLike, deleteLike } from './api.js'
import { myProfile } from '../index.js'

/*Функция добавления карточек*/
function createCard(link, name, likes, owner, id) {
  const userElement = userTemplate.querySelector('.element').cloneNode(true);
  const cardDelete = userElement.querySelector('.element__trash'); /*Кнопка удаления карточек*/
  const elementHeartCounter = userElement.querySelector('.element__heart-counter'); /Счётчик лайков*/
  const elementImgPlace = userElement.querySelector('.element__img-place');
  const elementTitle = userElement.querySelector('.element__title');
  elementTitle.textContent = name;
  elementImgPlace.src = link;
  elementImgPlace.alt = name;
  /*Лайки карточек*/
  const mylike = userElement.querySelector('.element__heart');
  elementHeartCounter.textContent = likes.length; /*передаем в счетчик лайков длину массива лайков*/

  mylike.addEventListener('click', function(evt) {
    if (!evt.target.classList.contains('element__heart_active')) {
      putLike(id)
        .then((res) => {
          elementHeartCounter.textContent = res.likes.length;
          evt.target.classList.toggle('element__heart_active');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteLike(id)
        .then((res) => {
          elementHeartCounter.textContent = res.likes.length;
          evt.target.classList.remove('element__heart_active');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  likes.forEach((user) => {
    if (user._id === myProfile) {
      mylike.classList.add('element__heart_active');
    }
  })

  /*Открытие карточек*/
  elementImgPlace.addEventListener('click', function() {
    popupImage.src = link;
    popupImage.alt = name;
    popupDescription.textContent = name;
    openPopup(popupPhoto);
  });

  if (owner !== myProfile) {
    cardDelete.classList.add('element__trash_inactive');
  }

  /*Удаление карточек*/
  cardDelete.addEventListener('click', (e) => {
    deleteCards(id)
      .then (() => {
        e.target.closest('.element').remove();
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль, если запрос неуспешный
      });
  });
  return userElement;
};

/*Добавление карточки через попап*/
function handleFormSubmitMesto(evt) {
  popupSubmitCard.textContent = "Сохранение...";
  evt.preventDefault();
  return addNewCard(namePlaceInput.value, linkPlaceInput.value)
    .then((res) => {
      closePopup(popupPlace);
      cardContainer.prepend(createCard(res.link, res.name, res.likes, res.owner._id, res._id));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupSubmitCard.textContent = "Сохранить";
    });
}

export { handleFormSubmitMesto, createCard };
