export default class FormValidator {
  constructor(config, form) {
      this._config = config;
      this._form = form;
      this._inputList = Array.from(this._form.querySelectorAll(this._config.inputName));
      this._buttonElement = this._form.querySelector(this._config.buttonName);
  }

//Скрывает элемент ошибки
  hideInputError(inputElement, errorElement) {
      this._hideInputElement(inputElement);
      this._hideErrorElement(errorElement);
  };

//Скрывает подчеркивание элемента
  _hideInputElement(inputElement) {
      inputElement.classList.remove(this._config.inputErrorClass);
  };

//Скрывает текст ошибки
  _hideErrorElement(errorElement) {
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = '';
  };

//Показывает элемент ошибки
  _showInputError(inputElement, errorMessage, errorElement) {
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.classList.add(this._config.errorClass);
      errorElement.textContent = errorMessage;
  };

//Проверка валидности
  _checkInputValidity(inputElement) {
      const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
      if (inputElement.validity.valid) {
          this.hideInputError(inputElement, errorElement);
      } else {
          this._showInputError(inputElement, inputElement.validationMessage, errorElement)
      }
  };

//Выкл submit
  disableButton() {
      this._buttonElement.classList.add(this._config.buttonDisabledClass);
      this._buttonElement.disabled = true;
  };

//Вкл submit
  enableButton() {
      this._buttonElement.classList.remove(this._config.buttonDisabledClass);
      this._buttonElement.disabled = false;
  };

//
  _hasInvalidInput() {
      return this._inputList.some(inputElement => {
          return !inputElement.validity.valid;
      });
  };

//Переключатель
  _toggleButtonState() {
      if (this._hasInvalidInput()) {
          this.disableButton();
      } else {
          this.enableButton();
      }
  };

//
  _setEventListeners() {
      this._inputList.forEach(inputElement => {
          inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
          });
      });
      this._toggleButtonState();
  }

  /*Функция очищения формы от ошибок, если пользователь введет некорректные данные и закроет попап, то ошибок не будет видно*/
  hideInputErrorForm() {
    this._inputList.forEach(inputElement => {
      const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
      this._hideErrorElement(errorElement);
      this.hideInputError(inputElement, errorElement);
      this._hideInputElement(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  };
}
