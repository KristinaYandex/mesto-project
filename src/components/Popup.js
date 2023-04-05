export default class Popup {
  constructor(popupName) {
    this._popup = document.querySelector(popupName);
    this._closeButton = this._popup.querySelector('.popup__close')
  }

// Универсальная функция открытия всех popup
  open() {
    this._popup.classList.add('popup_opened');
    this._setOpenEventListeners();
  }

  // Универсальная функция закрытия всех popup по нажатию на esc, overlay, крестик
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleClickOverlay);
  }

//Функция закрытия по esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

//Функция закрытия по overlay
  _handleClickOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  };

//Функция закрытия попапа по иконке
  _setOpenEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleClickOverlay);
  }

//Функция закрытия на крестик
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {this.close()});
  }
}
