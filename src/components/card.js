import { popupPhoto, popupPlace, userTemplate, popupImage, popupDescription, cardContainer, namePlaceInput, linkPlaceInput } from './constants.js'
import { openPopup, closePopup } from './modal.js'
import { addNewCard, deleteCards, putLike, deleteLike } from './API.js'
import { myAccount } from '../index.js'
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
  const like = userElement.querySelector('.element__heart');
  elementHeartCounter.textContent = likes.length; /*передаем в счетчик лайков длину массива лайков*/
  likes.forEach(() => {
    if (likes._id === myAccount) {
      like.classList.add('element__heart_active');
    }
  })

  like.addEventListener('click', function(evt) {
    if (!evt.target.classList.contains('element__heart_active')) {
      putLike(id)
        .then((res) => {
          evt.target.classList.toggle('element__heart_active');
          elementHeartCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteLike(id)
        .then((res) => {
          evt.target.classList.remove('element__heart_active');
          elementHeartCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  /*Открытие карточек*/
  elementImgPlace.addEventListener('click', function() {
    popupImage.src = link;
    popupImage.alt = name;
    popupDescription.textContent = name;
    openPopup(popupPhoto);
  });
  /*Удаление карточек*/
  if (myAccount === owner) {
    cardDelete.addEventListener('click', (e) => {
      deleteCards(id)
        .then (() => {
          e.target.closest('.element').remove();
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль, если запрос неуспешный
        });
    });
  }
  return userElement;
};

/*Добавление карточки через попап*/
function handleFormSubmitMesto(evt) {
  evt.preventDefault();
  return addNewCard(namePlaceInput.value, linkPlaceInput.value)
    .then((res) => {
      closePopup(popupPlace);
      cardContainer.prepend(createCard(res.link, res.name, res.likes, res._id, res.owner_id));
      evt.target.reset();
    })
}

export { handleFormSubmitMesto, createCard };

/*if (myAccount._id !== owner._id) {
  cardDelete.classList.add('element__trash_inactive');
}

cardDelete.addEventListener('click', (e) => {
  deleteCards(id)
    .then (() => {
      e.target.closest('.element').remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль, если запрос неуспешный
    });
});*/
