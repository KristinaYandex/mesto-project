export default class Card {
  constructor({name, link, _id, likes, owner}, {handleCardClick}, {handleLikeClick}, {handleDelete}, userId, template) {
      this._name = name;
      this._link = link;
      this._id = _id;
      this._likes = likes;
      this._owner = owner;
      this._handleCardClick = handleCardClick;    //открытие попапа с картинкой
      this._handleLikeClick = handleLikeClick;    //нажатие на лайк
      this._handleDelete = handleDelete;  //нажатие на корзину
      this._userId = userId;
      this._template = template;
  }

  //Метод извлекает шаблон из разметки из DOM
  _getElement() {
      return document
          .querySelector(this._template)
          .content
          .querySelector('.element')
          .cloneNode(true);
  }

  // Метод добавит данные в разметку
  generate() {
      this._card = this._getElement();
      this._cardImage = this._card.querySelector('.element__img-place');
      this._cardText = this._card.querySelector('.element__title');
      this._cardLike = this._card.querySelector('.element__heart');
      this._buttonLike = this._card.querySelector('.element__heart-counter');
      this._cardRemove = this._card.querySelector('.element__trash');
      this._isLiked();

      //Функция удаления корзины
      if (this._userId !== this._owner._id) {
          this._cardRemove.remove();
      }

      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardText.textContent = this._name;
      this._card.dataset.id = this._id;
      this._buttonLike.textContent = this._likes.length;


      this.setEventListeners();


      return this._card;
  }

  //Слушатели событий
  setEventListeners() {
      this._cardLike.addEventListener('click', () => {
          this._handleLikeClick(this._card, this._id);
      });

      //Удаление карточки
      if (this._cardRemove) {
        this._cardRemove.addEventListener("click", () => {
          this._handleDelete(this._id);

        });
      }

      // При клике на карточку открыть картинку во всплывающем окне
      this._cardImage.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link);
      });
  }

  // Проверяем поставлен ли лайк
  _isLiked() {
      if (this._likes.some(like => like._id === this._userId)) {
          this._cardLike.classList.add('element__heart_active');
          this._card.dataset.isLiked = 'true';
      } else {
          this._card.dataset.isLiked = 'false';
      }
  }

  deleteLike(res) {
      this._cardLike.classList.remove('element__heart_active');
      this._buttonLike.textContent = res.likes.length;
      this._card.dataset.isLiked = 'false';
  }
  addLike(res) {
      this._cardLike.classList.add('element__heart_active');
      this._buttonLike.textContent = res.likes.length;
      this._card.dataset.isLiked = 'true';
  }
  deleteCard() {
    this._card.remove();
  }
}




