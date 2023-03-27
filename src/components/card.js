/*Функция добавления карточек*/
export default class Card {
  constructor({link, name, likes, owner, _id, myProfile, handleCardClick, handleTrashCard, handleLikeClick}, templateSelector) {
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._owner = owner._id;
    this._id = _id;
    this._handleCardClick = handleCardClick;
    this._handleTrashCard = handleTrashCard;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
    this._myProfile = myProfile;
  }

  _getElement() {
    const userElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return userElement;
  }

  generate() {
    this._element = this._getElement();
    this._cardDelete = this._element.querySelector('.element__trash'); /*Кнопка удаления карточек*/
    this._mylike = this._element.querySelector('.element__heart'); /*Лайки карточек*/
    this._elementHeartCounter = this._element.querySelector('.element__heart-counter'); /Счётчик лайков*/
    this._elementImgPlace = this._element.querySelector('.element__img-place');
    this._elementTitle= this._element.querySelector('.element__title');
    this._elementTitle.textContent = this._name;
    this._elementImgPlace.src = this._link;
    this._elementImgPlace.alt = this._name;
    this._elementHeartCounter.textContent = this._likes.length;/*передаем в счетчик лайков длину массива лайков*/
    this._setlike();
    this._deleteCard();
    this._setEventListeners();
    return this._element;
  }

   /*Лайки карточек*/
  _setlike() {
    this._likes.forEach((user) => {
      if (user._id === this._myProfile) {
        this._mylike.classList.add('element__heart_active');
      }
    })
  }

  _toggleLike(res) {
    this._elementHeartCounter.textContent = res.likes.length;
    evt.target.classList.toggle('element__heart_active');
  }

  _removeLike(res) {
    this._elementHeartCounter.textContent = res.likes.length;
    evt.target.classList.remove('element__heart_active');
  }

  /*Удаление карточек*/
  _deleteCard() {
    if (this._owner !== this._myProfile) {
      this._cardDelete.classList.add('element__trash_inactive');
    }
  }

  _setEventListeners() {
    this._elementImgPlace.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    });
    this._mylike.addEventListener('click', () => {
      this._handleLikeClick()
    });
    this._cardDelete.addEventListener('click', () => {
      this._handleTrashCard(this._element)
    });
  }
}
