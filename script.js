/*Объявления констант*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*Попапы*/
const popupProfile = document.querySelector('.popup__profile');
const popupPlace = document.querySelector('.popup__place');
const popupPhoto = document.querySelector('.popup__photo');
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

/*Функции открытия попапов*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

buttonEdit.addEventListener('click', function() {
  openPopup(popupProfile);
});

buttonAdd.addEventListener('click', function() {
  openPopup(popupPlace);
});

/*Функции закрытия попапов*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonCloseProfile.addEventListener('click', function() {
   closePopup(popupProfile);
});

popupProfile.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupProfile);
    }
});

buttonClosePlace.addEventListener('click', function() {
  closePopup(popupPlace);
});

buttonClosePhoto.addEventListener('click', function() {
  closePopup(popupPhoto);
});

/*
/*Функция добавления карточек*/
function addCard(name, link) {
  const userElement = userTemplate.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__title').textContent = name;
  userElement.querySelector('.element__img-place').src = link;
  userElement.querySelector('.element__img-place').alt = name;

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
  const elementImage = userElement.querySelector('.element__img-place');
    elementImage.addEventListener('click', function() {
    popupCardImage.classList.add('popup__card-image_opened');
    popupImage.src = link;
    popupImage.alt = name;
    popupDescription.textContent = name;
    openPopup(popupPhoto);
  });

  return userElement;
};

initialCards.forEach(function (item) {
  cardContainer.append(addCard(item.name, item.link));
});

/*Редактирование информации о пользователе*/
function handleFormSubmitUser(evt) {
  evt.preventDefault();

  nameuserProfile.textContent = nameValue.value;
  jobuserProfile.textContent =  jobValue.value;

  closePopup(popupProfile);
}

popupProfile.addEventListener('submit', handleFormSubmitUser);

/*Добавление карточки через попап*/
function handleFormSubmitMesto(evt) {
  evt.preventDefault();

  cardContainer.prepend(addCard(namePlaceInput.value, linkPlaceInput.value));

  closePopup(popupPlace);
}

popupPlace.addEventListener('submit', handleFormSubmitMesto);
