export class FormValidator {
  constructor(formTypeSelector, validationSettings) {
    this._formSelector = validationSettings.formSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;

    this._formTypeSelector = formTypeSelector;
  }


  enableValidation() {
    this._currentForm = document.querySelector(`.${this._formTypeSelector}`);
    this._setEventListeners();
  }

  _setEventListeners() {
    this._currentForm.addEventListener('submit', (evt) => {
      evt.preventDefault(true);
    })

    this._inputList = Array.from(this._currentForm.querySelectorAll(`${this._inputSelector}`));
    this._buttonElement = this._currentForm.querySelector(`${this._submitButtonSelector}`);

    this._inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    })
    this._toggleButtonState();
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  _checkInputValidity(inputElement) {
    this._isValid = inputElement.validity.valid;
    if (!this._isValid) {
      this._errorMessage = inputElement.validationMessage;
      this._showInputError(this._errorMessage, inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(errorMessage, inputElement) {
    this._errorElement = this._currentForm.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = errorMessage;

    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);


  }

  _hideInputError(inputElement) {
    this._errorElement = this._currentForm.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = '';

    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    this._hasNotValidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (this._hasNotValidInput) {
      this._buttonElement.setAttribute('disabled', true)
    } else if (!this._hasNotValidInput) {
      this._buttonElement.removeAttribute('disabled')
    }
  }
}