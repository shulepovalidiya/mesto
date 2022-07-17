export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

export class FormValidator {
    constructor(validationSettings, formElement) {
        this._formSelector = validationSettings.formSelector;
        this._inputSelector = validationSettings.inputSelector;
        this._submitButtonSelector = validationSettings.submitButtonSelector;
        this._inactiveButtonClass = validationSettings.inactiveButtonClass;
        this._inputErrorClass = validationSettings.inputErrorClass;
        this._errorClass = validationSettings.errorClass;
        this._formElement = formElement;
    }

    getFormElementsAndToggleButton(form) {
        const inputList = Array.from(form.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            this._hideInputError(form, inputElement);
        });
        const buttonElement = form.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    };

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement)
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState(inputList, button) {
        if (this._hasInvalidInput(inputList)) {
            button.classList.add(this._inactiveButtonClass);
            button.setAttribute('disabled', true)
        } else {
            button.classList.remove(this._inactiveButtonClass);
            button.removeAttribute('disabled', true)
        }
    };

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.elements);
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((form) => {
            this._setEventListeners(form);
        });
    };
}

