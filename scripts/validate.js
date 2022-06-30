const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

const getFormElementsAndToggleButton = (form) => {
    const inputList = Array.from(form.querySelectorAll(validationSettings.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(form, inputElement);
    });
    const buttonElement = form.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationSettings.errorClass);
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement)
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, button) => {
    if (hasInvalidInput(inputList)) {
        button.classList.add(validationSettings.inactiveButtonClass);
        button.setAttribute('disabled', true)
    } else {
        button.classList.remove(validationSettings.inactiveButtonClass);
        button.removeAttribute('disabled', true)
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.elements);
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((form) => {
        setEventListeners(form);
    });
};


enableValidation(validationSettings);

