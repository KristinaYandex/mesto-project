import './pages/index.css';

import * as constants from './components/constants.js';

import Api from './components/API.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';

const getApi = new Api(constants);
const userApi = getApi.getUser();
const cardsApi = getApi.getCards();

//Профиль
const profileUserInfo = new UserInfo(constants.selectors);

//Постановка лайка
const handleLikeClick = (card, id, cardChange) => {
  if (card.dataset.isLiked === 'true') {
      getApi.deleteLike(id)
          .then((res) => {
            cardChange.deleteLike(res);
          })
          .catch(err => {console.log(err)});
  } else {
      getApi.addLike(id)
          .then((res) => {
            cardChange.addLike(res);
          })
          .catch(err => {console.log(err)});
  }
}

//Удаление карточки
const handleDelete = (id, cardChange) => {
  getApi.deleteCard(id). then(() => {cardChange.deleteCard()});

}

//Попап с развернутой картинкой
const popupWithImage = new PopupWithImage(constants.popups.image);
popupWithImage.setEventListeners();

//Внедряем карточку
const newCard = new Section({
  renderer: (item, userId) => {
      const cardChange = new Card(item, {
          handleCardClick: (name, link) => {popupWithImage.open(name, link)},
      }, {
          handleLikeClick: (card, id) => {handleLikeClick(card, id, cardChange)}
          }, {
          handleDelete: (id) => {handleDelete(id, cardChange)}
          }, userId, constants.templateSelector);
      return cardChange.generate();
  }
}, constants.cardContainer);

//Получение данных с сервера
Promise.all([userApi, cardsApi])
    .then(([user, cards]) => {
      profileUserInfo.setUserInfo(user);
      newCard.renderItems(cards, user._id);
    })
    .catch(err => {console.log(err)});

// Вызываем функцию из валидации
const formInfo = new FormValidator(constants.validationConfig, constants.formInfo);
const formCard = new FormValidator(constants.validationConfig, constants.formCard);
const formAvatar = new FormValidator(constants.validationConfig, constants.formAvatar);
const forms = [formInfo, formCard, formAvatar];
forms.forEach(form => form.enableValidation());

const resetValidation = ((input, formClass, form) => {
  const errorElement = form.querySelector(`#error-${input.id}`);
  formClass.hideInputError(input, errorElement);
})

//Аватарка
const avatarPopup = new PopupWithForm(constants.popups.avatar, {
  submit: (data) => {
      avatarPopup.setSubmitButtonText('Сохранение...');
      getApi.createAvatar(data)
      .then((data) => {
          profileUserInfo.setUserAvatar(data);
          avatarPopup.close();
      })
      .catch(err => {console.log(err)})
      .finally(() => {
          avatarPopup.setSubmitButtonText('Сохранить');
      });
  }
  }, {
  deleteErrors: (input) => {resetValidation(input, formAvatar, constants.formAvatar)}
});
avatarPopup.setEventListeners();

//Открытие аватарки
constants.buttons.avatar.addEventListener('click', () => {
  avatarPopup.open();
  formAvatar.disableButton();
});


//Редактирования профиля
const profilePopup = new PopupWithForm(constants.popups.profile, {
  submit: (data) => {
      profilePopup.setSubmitButtonText('Сохранение...');
      getApi.changeProfile(data)
      .then((data) => {
          profileUserInfo.setUserInfo(data);
          profilePopup.close();
      })
      .catch(err => {console.log(err)})
      .finally(() => {
          profilePopup.setSubmitButtonText('Сохранить');
      });
  }
  }, {
  deleteErrors: (input) => {resetValidation(input, formInfo, constants.formInfo)}
});
profilePopup.setEventListeners();


//Открытие профиля
constants.buttons.profile.addEventListener('click', () => {
  profilePopup.open();
  profilePopup.setInputValues(profileUserInfo.getUserInfo());
  formInfo.enableButton();
});

//Сохранение карточки
const cardAddPopup = new PopupWithForm(constants.popups.card, {
  submit: (data) => {
      cardAddPopup.setSubmitButtonText('Создание...');
      getApi.createCard(data)
      .then((data) => {
          newCard.renderItem(data, data.owner._id);
          cardAddPopup.close();
      })
      .catch(err => {console.log(err)})
      .finally(() => {
          cardAddPopup.setSubmitButtonText('Создать');
      });
  }
  }, {
  deleteErrors: (input) => {resetValidation(input, formCard, constants.formCard)}
});
cardAddPopup.setEventListeners();

//Открытие карточки
constants.buttons.card.addEventListener('click', () => {
  cardAddPopup.open();
  formCard.disableButton();
});
