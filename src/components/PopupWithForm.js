import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(popupSelector, {submit}) {
      super (popupSelector);
      this._submit = submit;
      this._form = this._popup.querySelector('.popup__form');
      this._submitButton = this._popup.querySelector('.popup__submit');
      this._inputList = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submit(this._getInputValues());
      });
    }

    close = () => {
      super.close();
      this._form.reset();
      // this._inputList.forEach((input) => {
      //   this._deleteErrors(input);
      // })
    }
     // Изменение текста
    setSubmitButtonText(content) {
      this._submitButton.textContent = content;
    }
    //Выбираем все инпуты и добавляем в объект значения из разметки
    setInputValues(getData) {
      this._inputList.forEach((item) => {
          item.value = getData[item.id];
      })
    }
}
