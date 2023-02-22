/*Объявления констант*/
/*Попапы*/
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupPhoto = document.querySelector('.popup_photo');
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

document.addEventListener('keydown', (evt) => {
  if (evt.key == 'Escape') {
    closePopup(popupProfile);
  }
});

buttonClosePlace.addEventListener('click', function() {
  closePopup(popupPlace);
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

buttonClosePhoto.addEventListener('click', function() {
  closePopup(popupPhoto);
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

initialCards.forEach(function (item) {
  cardContainer.append(createCard(item.name, item.link));
});

/*Редактирование информации о пользователе*/
function handleFormSubmitUser(evt) {
  evt.preventDefault();

  nameuserProfile.textContent = nameValue.value;
  jobuserProfile.textContent =  jobValue.value;

  closePopup(popupProfile);
  evt.target.reset();
}

popupProfile.addEventListener('submit', handleFormSubmitUser);

/*Добавление карточки через попап*/
function handleFormSubmitMesto(evt) {
  evt.preventDefault();

  cardContainer.prepend(createCard(namePlaceInput.value, linkPlaceInput.value));

  closePopup(popupPlace);
  evt.target.reset();
}

popupPlace.addEventListener('submit', handleFormSubmitMesto);


const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
    setEventListeners(formElement);
});
}

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.classList.remove('popup__submit_inactive');
  }
}
