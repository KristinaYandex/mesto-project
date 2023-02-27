/*Функция открытия попапов*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/*Функция закрытия попапов*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export { openPopup, closePopup };
