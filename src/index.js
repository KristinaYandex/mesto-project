import './pages/index.css';

import { enableValidation, disableSubmitButton } from './components/validate.js'
import { openPopup, closePopup } from './components/Modal.js'
import Card from './components/Card.js'
import PopupWithImage from './components/PopupWithImage.js'
import Section from './components/Section.js'
import { settings, popupProfile, popupPlace, popupAvatar, popups, buttonEdit, buttonAdd, buttonAvatar, popupFormPlace, popupFormProfile, popupFormAvatar, popupSubmitCard, popupSubmitUser,
  popupSubmitAvatar, nameuserProfile, jobuserProfile, avataruserProfile, nameValue, jobValue, avatarValue, cardContainer, userTemplate, popupCardImage } from './components/constants.js'
import Api from './components/API.js'

const api = new Api({
  url: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: '9a34fda2-8e98-4dd6-868d-a04801378552',
    'Content-Type': 'application/json'
  }
});

const ImageCard = new PopupWithImage(popupCardImage)
ImageCard.setEventListeners();

const profileUserInfo = new UserInfo({
  selectorName: nameuserProfile,
  selectorAbout: jobuserProfile,
  selectorAvatar: avataruserProfile
})

let myProfile;
Promise.all([api.getUserProfile(), api.getCards()])
  .then(([users, cards]) => {
    profileUserInfo.setUserInfo({
      name: users.name,
      about: users.about,
      avatar: users.avatar
    }, myProfile = users._id);
    const newSection = new Section ({
      data: cards,
      renderer: (item) => {
        const cardElement = newcard.generate();
        return cardElement;
      },
    }, cardContainer)
    newSection.renderItems(cards)
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль, если запрос неуспешный
  });

/*Вызов функции enableValidation*/
enableValidation(settings);

/*Добавление карточки через попап*/
const handleFormSubmitMesto = new PopupWithForm(evt, {
  submit: (res) => {
    popupSubmitCard.textContent = "Сохранение...";
    evt.preventDefault();
    api.addNewCard(res)
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
})

/*Добавление карточки через попап*/
handleFormSubmitMesto.setEventListeners()

const handleFormSubmitUser = new PopupWithForm({
  submit: (res) => {
    popupSubmitUser.textContent = "Сохранение...";
    api.updateUserProfile(res)
    .then((res) => {
      closePopup(popupProfile);
      profileUserInfo.setUserInfo(res.name, res.about)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupSubmitUser.textContent = "Сохранить";
    });
  }
})

/*Редактирование информации о пользователе*/
handleFormSubmitUser.setEventListeners()

/*Редактирование аватарки*/
const handleFormSubmitAvatar = new PopupWithForm(evt, {
  submit: (res) => {
    popupSubmitAvatar.textContent = "Сохранение...";
    evt.preventDefault();
    api.updateUserAvatar(res)
    .then((res) => {
      profileUserInfo.setUserInfo({
        avatar: res.avatar
      });
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupSubmitAvatar.textContent = "Сохранить";
    });
  }
})

/*Редактирование аватарки*/
handleFormSubmitAvatar.setEventListeners()

export { myProfile };

/*Функции открытия попапов*/
buttonEdit.addEventListener('click', function() {
  openPopup(popupProfile);
  popupFormProfile.reset();
  nameValue.value = nameuserProfile.textContent;
  jobValue.value = jobuserProfile.textContent;
});

buttonAdd.addEventListener('click', function() {
  openPopup(popupPlace);
  disableSubmitButton(settings, popupSubmitCard);
  popupFormPlace.reset();
});

buttonAvatar.addEventListener('click', function() {
  openPopup(popupAvatar);
  avatarValue.value = avatarValue.src;
  disableSubmitButton(settings, popupSubmitAvatar);
  popupFormAvatar.reset();
});

/*Обработчики нажатия на крестик и на оверлей, закрытие*/
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closePopup(evt.currentTarget);
    }
  });
});

function handleLikeClick(evt, id, api) {
  if (!evt.target.classList.contains('element__heart_active')) {
    api.putLike(id)
      .then((res) => {
        card._toggleLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.deleteLike(id)
      .then((res) => {
        card._toggleLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleTrashCard(card) {
  api.deleteCards(card._id)
  .then (() => {
    card.deleteCards;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль, если запрос неуспешный
  });
}

const newcard = new Card(link, name, likes, owner, _id, myProfile, userTemplate, {
  handleLikeClick: () => handleLikeClick(evt, _id, api),
  handleTrashCard: () => handleTrashCard(cardElement),
  handleCardClick: () => {
    ImageCard.openPopup(link, name);
  }
})
