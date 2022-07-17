export const cardImage = document.querySelector('.popup__image');
export const popupFullSizePicture = document.querySelector('.popup_picture-view');
export const popupFullSizePictureCloseButton = document.querySelector('.popup__picture-close-button');

export function hidePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        popupList.forEach((popup) => {
            if (!popup.classList.contains('popup_hidden')) {
                hidePopup(popup);
            }
        });
    }
}

import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import { FormValidator, validationSettings } from "./FormValidator.js";


const editProfileOpenButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = document.querySelector('.popup__edit-close-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = document.querySelector('.popup__form_type_edit');
const editProfileFormUsername = document.querySelector('#name-field');
const editProfileFormUserBio = document.querySelector('#bio-field');
const profileUsername = document.querySelector('.profile__username')
const profileBio = document.querySelector('.profile__bio')

const addNewCardOpenButton = document.querySelector('.profile__add-button');
const addNewCardCloseButton = document.querySelector('.popup__add-card-close-button');
const addNewCardPopup = document.querySelector('.popup_type_add-card');
const addNewCardForm = document.querySelector('.popup__form_type_add-card');

const popupList = document.querySelectorAll('.popup');

const showPopup = (popup) => {
    popup.classList.remove('popup_hidden');
    document.addEventListener('keydown', hidePopupByEscape);
};

const hidePopup = (popup) => {
    popup.classList.add('popup_hidden');
    document.removeEventListener('keydown', hidePopupByEscape);
};

const hidePopupByOverlayClick = (popup) => {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            hidePopup(popup);
        };
    });
};

const hidePopupByCloseButton = (popup) => {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup__close-button')) {
            hidePopup(popup);
        };
    });
};

popupList.forEach((popup) => {
    hidePopupByOverlayClick(popup);
    hidePopupByCloseButton(popup);
});

editProfileOpenButton.addEventListener('click', function () {
    showPopup(editProfilePopup);
    editProfileFormUsername.setAttribute('value', profileUsername.textContent);
    editProfileFormUserBio.setAttribute('value', profileBio.textContent);
    editProfileForm.reset();
    const formToValidate = new FormValidator(validationSettings, editProfileForm);
    formToValidate.enableValidation();
    editProfileForm.reset();
    formToValidate.getFormElementsAndToggleButton(editProfileForm);
    
});

addNewCardOpenButton.addEventListener('click', function () {
    showPopup(addNewCardPopup);
    addNewCardForm.reset();
    const formToValidate = new FormValidator(validationSettings, addNewCardForm);
    formToValidate.enableValidation();
    editProfileForm.reset();
    formToValidate.getFormElementsAndToggleButton(addNewCardForm);
});

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileUsername.textContent = editProfileFormUsername.value;
    profileBio.textContent = editProfileFormUserBio.value;
    hidePopup(editProfilePopup);
};

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

const placesCardTemplate = document.querySelector('.places-template').content;
const placesCardsContainer = document.querySelector('.places__cards');

initialCards.forEach((item) => {
    const newCard = new Card(item, '.places-template');
    const newCardElement = newCard.generateCard();
    document.querySelector('.places__cards').append(newCardElement);
});

function addCardToContainer(evt) {
    evt.preventDefault();
    const inputCardName = document.querySelector('#place-name-field').value;
    const inputCardPictureLink = document.querySelector('#picture-link-field').value;
    const cardData = {
        name: inputCardName,
        link: inputCardPictureLink,
    }
    const newCard = new Card(cardData, '.places-template');
    const newCardElement = newCard.generateCard();
    placesCardsContainer.prepend(newCardElement);
    hidePopup(addNewCardPopup);
};

addNewCardForm.addEventListener('submit', addCardToContainer);



