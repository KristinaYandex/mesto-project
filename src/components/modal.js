/*Функции закрытия попапа по клавише Esc*/
function closeEsc(evt) {
  if (evt.key == 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
/*Закрытие по клику на оверлей*/
function onClickByOverlay (evt) {
  if (evt.target.classList.contains('popup_opened')) {
  closePopup(evt.target);
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
  document.removeEventListener('keydown', closeEsc);
}

export { openPopup, closePopup, onClickByOverlay };
