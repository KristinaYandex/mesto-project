/*Функции закрытия попапа по клавише Esc*/
function closeEsc(evt) {
  if (evt.key == 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

/*Функция открытия попапов*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
}

/*Функция закрытия попапов*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closeEsc);
}

export { openPopup, closePopup };
